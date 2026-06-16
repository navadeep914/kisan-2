import hmac
import hashlib
import base64
import json
import time
import secrets
from app.core.config import settings

def hash_password(password: str) -> str:
    """Hash password using PBKDF2 with SHA256 (Django-style, secure, no external dependencies)."""
    salt = secrets.token_hex(16)
    # 100,000 iterations is a good standard
    iterations = 100000
    dk = hashlib.pbkdf2_hmac('sha256', password.encode(), salt.encode(), iterations)
    dk_hex = dk.hex()
    return f"pbkdf2_sha256${iterations}${salt}${dk_hex}"

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a password against its hash."""
    try:
        parts = hashed_password.split('$')
        if len(parts) != 4 or parts[0] != 'pbkdf2_sha256':
            return False
        iterations = int(parts[1])
        salt = parts[2]
        hash_val = parts[3]
        
        dk = hashlib.pbkdf2_hmac('sha256', plain_password.encode(), salt.encode(), iterations)
        return hmac.compare_digest(dk.hex(), hash_val)
    except Exception:
        return False

def create_token(data: dict, expires_in: int = 86400) -> str:
    """Create a secure cryptographically signed session token (HMAC-SHA256)."""
    payload = {
        "exp": time.time() + expires_in,
        "data": data
    }
    payload_str = json.dumps(payload)
    payload_b64 = base64.urlsafe_b64encode(payload_str.encode()).decode()
    signature = hmac.new(settings.secret_key.encode(), payload_b64.encode(), hashlib.sha256).hexdigest()
    return f"{payload_b64}.{signature}"

def decode_token(token: str) -> dict:
    """Decode and verify the signature of the session token."""
    try:
        parts = token.split(".")
        if len(parts) != 2:
            return None
        payload_b64, signature = parts
        
        # Verify HMAC signature
        expected_sig = hmac.new(settings.secret_key.encode(), payload_b64.encode(), hashlib.sha256).hexdigest()
        if not hmac.compare_digest(signature, expected_sig):
            return None
            
        # Decode and check expiration
        payload_str = base64.urlsafe_b64decode(payload_b64.encode()).decode()
        payload = json.loads(payload_str)
        if time.time() > payload["exp"]:
            return None # Token expired
            
        return payload["data"]
    except Exception:
        return None
