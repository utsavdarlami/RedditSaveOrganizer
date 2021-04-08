from flask import Flask, jsonify, render_template
# import praw
from reddit import fetchAllSave
import json
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/fetch")
def runFetch():
    responseOfFetching = fetchAllSave()
    return jsonify(responseOfFetching)

@app.route("/allsaves", methods=['GET'])
def allSave():
    with open("mysaves.json", "r") as read_file:
        allsaves = json.load(read_file)
    return jsonify(allsaves)

@app.route("/search/<subreddit>")
def search(subreddit):
    post={}
    with open("mysaves.json", "r") as read_file:
        allsaves = json.load(read_file)
    for save in allsaves:
        sub=allsaves[save]['subreddit']
        if subreddit.lower() in sub.lower():
            post[save]=allsaves[save]
    if len(post)==0:
        # emptySearch = {"id":404,"msg":"Error No Such Sub."}
        return jsonify(post)
    else:
        return jsonify(post)

if __name__ == "__main__":
    app.run(host="localhost",port=5000,debug=True)
