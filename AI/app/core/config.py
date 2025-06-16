from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # PROJECT_NAME: str
    # API_VERSION: str
    MYSQL_URL: str
    MONGO_URL:str

    class Config:
        env_file = ".env"
        env_file_encoding = 'utf-8'

settings = Settings()
