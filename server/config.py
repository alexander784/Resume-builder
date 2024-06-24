from flask import Flask
from flask_migrate import Migrate
import os
from os import environ
from flask_marshmallow import Marshmallow
from models import db
from flask_jwt_extended import JWTManager


app = Flask(__name__)
jwt = JWTManager(app)


app.secret_key = environ.get("SECRET_KEY")
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('SQLALCHEMY_DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = environ.get("JWT_SECRET_KEY")
app.config['SQLALCHEMY_ECHO'] = environ.get("SQLALCHEMY_ECHO")


db.init_app(app)
ma = Marshmallow(app)
migrate = Migrate(app,db)


