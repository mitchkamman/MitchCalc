from flask import Flask
from flask_restful import Api, Resource, reqparse

app = Flask(__name__)
api = Api(app)

log = [{
       "item": "5+2=7",
       }]

class Log(Resource):
    def get(self, calc):
        return log, 200
    def post(self, calc):
        global log
        val = {
            "item": calc
        }
        if(len(log) == 10):
            log.pop(10)

        log = [val] + log

        return log, 200

api.add_resource(Log, "/log/<string:calc>")

app.run(debug=True)
