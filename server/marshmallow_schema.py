from marshmallow import fields
from models import User,Resume
from config import ma




class UserSchema(ma.Schema):
    class Meta:
        model = User
    id = fields.Int(dump_only=True)
    username = fields.Str(required=True, unique=True)
    email = fields.Email(required=True, unique=True)
    _password_hash = fields.Str(required=True)

user_schema = UserSchema()
users_schema = UserSchema(many=True)


class ResumeSchema(ma.Schema):
    class Meta:
        model = Resume

    id = fields.Integer(dump_only=True)
    name = fields.Str(required=True)
    profile = fields.Str(required=True)
    experience = fields.Str(required=True)
    education = fields.Str(required=True)
    skills = fields.Str(required=True)
    certificates = fields.Str(required=True)
    projects = fields.Str(required=True)
    languages = fields.Str(required=True)
    created_at = fields.DateTime(dump_only=True)


Resume_schema = ResumeSchema()
Resume_schema = ResumeSchema(many=True)





    