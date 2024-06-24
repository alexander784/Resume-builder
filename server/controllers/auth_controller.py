from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity
from flask_restx import Namespace, fields,Resource
from flask import request, jsonify, make_response
from werkzeug.security import generate_password_hash
from models import db, User
from marshmallow_schema import user_schema



auth_ns = Namespace('auth', description="A Namespace for authentication")


signup_model = auth_ns.model(
    'SignUp',
    {
        "username": fields.String(),
        "email": fields.String(),
        "password":fields.String(),
        "confirm_password":fields.String()
    }
)

login_model = auth_ns.model(
    'Login',
    {
        "username": fields.String(),
        "password": fields.String()
    }
)


@auth_ns.route('/signup')
class Signup(Resource):
    @auth_ns.expect(signup_model)
    def post(self):
        try:
            data = request.json  
            password = data.get('password')
            confirm_password = data.get('confirm_password')

            if password == confirm_password:
                if isinstance(password, bytes):
                    password = password.decode('utf-8')
                
                new_user = User(
                    username=data.get('username'),
                    email=data.get('email'),
                    _password_hash=generate_password_hash(password)
                )
                db.session.add(new_user)
                db.session.commit()

                return make_response(jsonify(user_schema.dump(new_user)), 201)
            
            return make_response(jsonify({"error": "Passwords must match"}))
        except ValueError as e:
            return make_response(jsonify({"error": str(e)}))



