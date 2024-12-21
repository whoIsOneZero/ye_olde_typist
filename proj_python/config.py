from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    """
    Performs validation to see if all these env variables have been set
    """

    gemini_api_key: str

    class Config:
        env_file = ".env"

settings = Settings()