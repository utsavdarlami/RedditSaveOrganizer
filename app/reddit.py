import praw
from praw.models.reddit.submission import Submission
from praw.models.reddit.comment import Comment
from db import mongo_connect

LIMIT = None  # LIMIT in the posts to fetch from the api


def fetchAllSave():

    global LIMIT

    try:

        reddit = praw.Reddit('mysavebot', user_agent='Organizing my Saves')
        # print(reddit.config.username)
        my = reddit.user.me()

        mysaveObj = my.saved(limit=LIMIT)
        # j = 0

        # getting collection from mongodb
        conn = mongo_connect()
        redditsave_db = conn["redditsave"]
        save_collection = redditsave_db["all_saves"]

        # allSaves = {}

        for id, save in enumerate(mysaveObj):

            singlePostDetail = {}

            try:
                # print(dir(save))
                singlePostDetail['id'] = save.id
                # if post
                if isinstance(save, Submission):
                    titleOfPost = save.title    # The title of the submission
                    singlePostDetail['url'] = save.url
                    singlePostDetail['type'] = "Post"
                # if comment
                elif isinstance(save, Comment):
                    titleOfPost = "A Comment"
                    singlePostDetail['type'] = "Comment"
                else:
                    titleOfPost = "None"
                    singlePostDetail['type'] = "None"
                # print(save.comment_type)

                linkOfPost = save.permalink    # A permalink for the submission
                # Provides an instance of Subreddit
                subredditInstance = save.subreddit
                # Name of the subreddit
                subredditOfPost = subredditInstance.display_name
                # storing in dictionary
                singlePostDetail['title'] = titleOfPost
                # singlePostDetail['content']=OfPost
                singlePostDetail['link'] = linkOfPost
                singlePostDetail['subreddit'] = subredditOfPost

                # singlePostDetail['date'] = save.created
                # nsfw post
                if save.over_18:
                    singlePostDetail['nsfw'] = True
                else:
                    singlePostDetail['nsfw'] = False

                # adding category for later
                singlePostDetail['category'] = "uncategorized"

                query = {'id': singlePostDetail['id']}

                save_collection.update_one(query,
                                           {"$set": singlePostDetail},
                                           upsert=True)

                # allSaves[id] = singlePostDetail

            except Exception as ecom:
                print(ecom)
                pass
                # break

        return("success")

    except Exception as e:

        print(e)
        return('failure')


if __name__ == "__main__":
    fetchAllSave()
