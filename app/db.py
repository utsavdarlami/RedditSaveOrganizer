from pymongo import MongoClient

def mongo_connect():
    port = "27017"
    MONGO_USERNAME = "admin"
    MONGO_PASSWORD = "admin"
    MONGO_HOSTNAME = "mongo"
    mongo_link = f'mongodb://{MONGO_USERNAME}:{MONGO_PASSWORD}@{MONGO_HOSTNAME}:{port}/'
    # mongo_link = f'mongodb://{host_name}:{port}/'
    # print(mongo_link)
    return MongoClient(mongo_link)
