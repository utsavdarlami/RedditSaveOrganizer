# from loguru import logger
from pymongo import MongoClient


def mongo_connect(mongo_hostname="mongo"):
    port = "27017"
    MONGO_USERNAME = "admin123"
    MONGO_PASSWORD = "password123"
    MONGO_HOSTNAME = "mongodb"
    mongo_link = f"mongodb://{MONGO_USERNAME}:{MONGO_PASSWORD}@{MONGO_HOSTNAME}:{port}/"
    # logger.info(mongo_link)
    return MongoClient(mongo_link)