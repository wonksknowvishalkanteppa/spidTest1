from flask import Flask, request, jsonify, render_template, redirect, json
from flask_cors import CORS
import sys
import datetime
import speedtest

app = Flask(__name__)
app.debug = True
# CORS(app)


@app.route("/", methods=["GET", "POST"])
def spid():
    if request.method == "GET":
        return render_template("speedtest.html")
    else:
        # data=request.files['files']
        start=datetime.datetime.now()
        data = request.get_json()
        end=datetime.datetime.now()

        duration=end-start
        time=duration.total_seconds()
        
        # print(data)
        # print("req")
        # x=request.environ.get("HTTP_X_REAL_IP",request.remote_addr)
        # print(x)
        # # print(request.environ)

        # print(request.environ.get("HTTP_X_FORWARDED_FOR"))

        # source=request.environ.get("HTTP_X_FORWARDED_FOR")
        # speedtest.SOURCE = source
        # s=speedtest.Speedtest()

        # s._source_address=source
        # print(s.upload())
        # print(s._source_address)
        del data
        return {"success": True,"time":time}


@app.route("/getip")
def getip():
    return request.remote_addr


if __name__ == "__main__":
    # app.jinja_env.cache = {}
    app.run(threaded=True)
