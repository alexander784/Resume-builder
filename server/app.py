from config import app
from flask_restx import Api
from controllers.auth_controller import auth_ns



api = Api(app)


api.add_namespace(auth_ns, path="/auth")



if __name__ == "__main__":
    app.run(port=5000, debug=True)