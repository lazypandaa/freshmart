from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.server_api import ServerApi
import os

client = None
database = None

async def connect_to_mongo():
    global client, database
    mongodb_url = os.getenv("MONGODB_URL")
    if not mongodb_url:
        raise RuntimeError("MONGODB_URL environment variable is not set")
    
    client = AsyncIOMotorClient(mongodb_url, server_api=ServerApi('1'))
    database = client["FreshMart"]
    print("Connected to MongoDB")

async def close_mongo_connection():
    global client
    if client:
        client.close()
        print("Closed MongoDB connection")

def get_database():
    return database
