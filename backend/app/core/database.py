from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.server_api import ServerApi

MONGODB_URL = "mongodb+srv://freshmart_user:eASMfdl5SXeGqOfx@hack.8syianl.mongodb.net/FreshMart?retryWrites=true&w=majority&appName=hack"
DATABASE_NAME = "FreshMart"

client = None
database = None

async def connect_to_mongo():
    global client, database
    client = AsyncIOMotorClient(MONGODB_URL, server_api=ServerApi('1'))
    database = client[DATABASE_NAME]
    print("Connected to MongoDB")

async def close_mongo_connection():
    global client
    if client:
        client.close()
        print("Closed MongoDB connection")

def get_database():
    return database
