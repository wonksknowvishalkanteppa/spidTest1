from flask import Flask, request, jsonify, render_template, redirect
from flask_cors import CORS


app = Flask(__name__)
app.debug = True
# CORS(app)


@app.route("/", methods=["GET", "POST"])
def spid():
    if request.method == "GET":
        return render_template("speedtest.html")
    else:
        # data=request.files['files']
        data = request.get_json()

        # print(data)
        # print("req")

        del data
        return {}


if __name__ == "__main__":
    app.jinja_env.cache = {}
    app.run()
