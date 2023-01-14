import asyncio
import json
import os

from async_reddit import fetchAllSave
from bson.json_util import ObjectId
from db import mongo_connect
from flask import Flask, jsonify, render_template
from flask_cors import CORS


class MyEncoder(json.JSONEncoder):
    """
    to make ObjectId serializable in the json retun
    """

    def default(self, obj):
        if isinstance(obj, ObjectId):
            return str(obj)
        return super(MyEncoder, self).default(obj)


conn = mongo_connect()
redditsave_db = conn["redditsave"]
save_collection = redditsave_db["all_saves"]

app = Flask(__name__)
app.json_encoder = MyEncoder  ## assingin the encoder

CORS(app)


@app.route("/")
def index():
    return "Hello from flask"


@app.route("/fetch")
async def runFetch():
    responseOfFetching = await fetchAllSave()
    return jsonify(responseOfFetching)


@app.route("/allsaves", methods=["GET"])
def allSave():
    """Show all saves."""
    # getting collection from mongodb
    allsaves_list = list(save_collection.find())
    return jsonify(allsaves_list)


@app.route("/search/<subreddit>")
def search(subreddit):
    """
    Search through the saves.

    Currently supports search through
    - [x] subreddit

    TODOs
    -------
    TODO: Search through title
    """
    posts_cursor = save_collection.find(
        {"subreddit": {"$regex": subreddit, "$options": "i"}}
    )

    posts_list = list(posts_cursor)

    if len(posts_list) == 0:
        emptySearch = {"id": 404, "msg": "Error No Such Sub."}
        return jsonify(emptySearch)
    else:
        return jsonify(posts_list)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=os.environ.get("DEBUG") == "1")
