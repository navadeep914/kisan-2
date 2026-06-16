from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    database_url: str = "postgresql://user:password@localhost:5432/bharat_krishi_ai"
    mongo_url: str = "mongodb+srv://username:password@cluster.mongodb.net"
    secret_key: str   = "secret"
    debug: bool       = True
    openai_api_key: str = "your_openai_key_here"
    weather_api_key: str = "your_weather_api_key_here"

    class Config:
        env_file = ".env"
        extra = "ignore"

settings = Settings()
