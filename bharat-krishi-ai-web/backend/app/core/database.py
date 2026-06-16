from motor.motor_asyncio import AsyncIOMotorClient
from app.core.config import settings
import logging

logger = logging.getLogger(__name__)

MONGO_URL = settings.mongo_url
if not MONGO_URL:
    MONGO_URL = "mongodb://localhost:27017"

# We mask the credentials in logs
log_url = MONGO_URL.split("@")[-1] if "@" in MONGO_URL else MONGO_URL
logger.info(f"📁 Database: Initializing MongoDB client connecting to: {log_url}")

# Initial lazy client setup
client = AsyncIOMotorClient(MONGO_URL, serverSelectionTimeoutMS=3000)
db = client["bharat_krishi_ai"]

async def verify_and_init_db():
    global client, db
    try:
        logger.info("📁 Database: Pinging primary MongoDB server...")
        await db.command("ping")
        logger.info("✅ Database: Successfully connected to primary MongoDB server!")
    except Exception as e:
        logger.error(f"❌ Database: Connection failed to primary MongoDB ({e}). Falling back to local MongoDB on localhost:27017.")
        client = AsyncIOMotorClient("mongodb://localhost:27017", serverSelectionTimeoutMS=2000)
        db = client["bharat_krishi_ai"]

def get_db():
    return db

