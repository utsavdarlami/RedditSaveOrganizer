from pymongo import MongoClient


def mongo_connect(mongo_hostname="mongo"):
    port = "27017"
    MONGO_USERNAME = "admin"
    MONGO_PASSWORD = "admin"
    MONGO_HOSTNAME = mongo_hostname
    mongo_link = f"mongodb://{MONGO_USERNAME}:{MONGO_PASSWORD}@{MONGO_HOSTNAME}:{port}/"
    return MongoClient(mongo_link)
