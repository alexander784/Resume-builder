
from marshmallow import fields
from config import ma
from models import User



class UserSchema(ma.schema):
    class Meta:
        model = User
    id = fields.Int(dump_only=True)
    username = fields.Str(required=True, unique=True)
    email = fields.Email(required=True, unique=True)
    _password_hash = fields.Str(required=True)

user_schema = UserSchema()
users_schema = UserSchema(many=True)


    