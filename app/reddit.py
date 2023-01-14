import argparse
import time

import praw
from db import mongo_connect
from loguru import logger
from praw.models.reddit.comment import Comment
from praw.models.reddit.submission import Submission


def get_single_save(save):
    """Form single save post detail using the save obj."""
    singlePostDetail = {}
    singlePostDetail["id"] = save.id

    titleOfPost = "None"
    singlePostDetail["type"] = "None"

    if isinstance(save, Submission):
        titleOfPost = save.title  # The title of the submission
        singlePostDetail["url"] = save.url
        singlePostDetail["type"] = "Post"

    if isinstance(save, Comment):
        titleOfPost = "A Comment"
        singlePostDetail["type"] = "Comment"

    subredditInstance = save.subreddit
    # storing in dictionary
    singlePostDetail["title"] = titleOfPost
    singlePostDetail["link"] = save.permalink  # A permalink for the submission
    singlePostDetail["subreddit"] = subredditInstance.display_name

    # singlePostDetail['date'] = save.created
    # nsfw post
    singlePostDetail["nsfw"] = save.over_18
    # adding category for later
    singlePostDetail["category"] = "uncategorized"

    return singlePostDetail


def fetchAllSave(limit=None, mongo_hostname="mongo"):
    """Fetch Saves from the account."""
    try:
        reddit = praw.Reddit("mysavebot", user_agent="Organizing my Saves")
        my = reddit.user.me()

        start_time = time.time()
        mysaveObj = my.saved(limit=limit)
        checkpoint_time = time.time()
        logger.info(f"Time to fetch saves is {checkpoint_time - start_time} sec")

        # getting collection from mongodb
        conn = mongo_connect(mongo_hostname)
        redditsave_db = conn["redditsave"]
        collection_name = "all_saves"
        try:
            redditsave_db.drop_collection(collection_name)
        except Exception as ecom:
            logger.info(ecom)
        save_collection = redditsave_db[collection_name]

        start_time = time.time()
        for save in mysaveObj:
            cleaned_save = get_single_save(save)
            try:
                save_collection.insert_one(cleaned_save)
            except Exception as ecom:
                logger.info(ecom)
                pass
        end_time = time.time()
        logger.info(f"Time to write to db is {end_time - start_time} sec")

    except Exception as e:

        print(e)
        return "failure"


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "limit", type=int, default=None, help="Number of posts to fetch"
    )
    args = parser.parse_args()
    limit = args.limit  # LIMIT in the posts to fetch from the api
    fetchAllSave(limit=limit, mongo_hostname="localhost")
