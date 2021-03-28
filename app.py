from flask import Flask, request, jsonify, render_template, redirect
from flask_cors import CORS


app = Flask(__name__)
app.debug = True
CORS(app)


@app.route("/", methods=["GET", "POST"])
def spid():
    if request.method == "GET":
        return render_template("test.html")
    else:
        
        return {"success": True}

# @app.route("/",methods=["GET","POST"])
# def test():

#     file=request.files['data']
#     print(file)
#     del file
#     return {"success":True}


if __name__ == "__main__":
    app.jinja_env.cache = {}
    app.run()
