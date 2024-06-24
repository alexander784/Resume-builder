from flask_restx import Namespace, fields, Resource
from models import Resume, User
from flask import request, make_response, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from marshmallow_schema import ResumeSchema
from models import db
from datetime import datetime

resume_ns = Namespace("resume", description="A Namespace for resume operations")

resume_model = resume_ns.model(
    "Resume",
    {
        "name": fields.String(required=True, description="Name of the user"),
        "profile": fields.String(required=True, description="Profile summary"),
        "experience": fields.String(required=True, description="Experience details"),
        "education": fields.String(required=True, description="Education details"),
        "skills": fields.String(required=True, description="Skills of the user"),
        "certificates": fields.String(required=True, description="Certificates obtained"),
        "projects": fields.String(required=True, description="Projects worked on"),
        "languages": fields.String(required=True, description="Languages spoken"),
        "created_at": fields.Integer(description="Creation timestamp")
    }
)

@resume_ns.route('/resume')
class ResumeResource(Resource):
    @resume_ns.expect(resume_model)
    @jwt_required()
    def post(self):
        try:
            data = request.get_json()
            name = data.get("name")
            profile = data.get("profile")
            experience = data.get("experience")
            education = data.get("education")
            skills = data.get("skills")
            certificates = data.get("certificates")
            projects = data.get("projects")
            languages = data.get("languages")
            created_at = datetime.utcnow()

            user_identity = get_jwt_identity()
            user = User.query.filter_by(username=user_identity).first()

            if not user:
                return jsonify({"message": "User not found"}), 404

            new_resume = Resume(
                name=name,
                profile=profile,
                experience=experience,
                education=education,
                skills=skills,
                certificates=certificates,
                projects=projects,
                languages=languages,
                created_at=created_at,
                user_id=user.id 
            )
            
            db.session.add(new_resume)
            db.session.commit()

            resume_schema = ResumeSchema()
            response = resume_schema.dump(new_resume)

            return make_response(jsonify({
                "message": "Resume created successfully",
                "resume": response
            }), 201)
        except Exception as e:
            return make_response(jsonify({"error": str(e)}), 500)
        


##Retrive all resumes
    @jwt_required()
    def get(self):
        user_identity = get_jwt_identity()
        user = User.query.filter_by(username=user_identity).first()

        if not user:
            return jsonify({"message": "User not found"}), 404
        
        resumes = Resume.query.all()
        resume_schema = ResumeSchema(many=True)
        response = resume_schema.dump(resumes)
        


        return make_response(jsonify({
            "resumes": response
        }), 200)
    
# Delete a resume
@resume_ns.route('/resume/<int:id>')
class ResumeDetailResource(Resource):
    @jwt_required()
    def delete(self, id):
        try:
            user_identity = get_jwt_identity()
            user = User.query.filter_by(username=user_identity).first()

            if not user:
                return make_response(jsonify({"message":"User not found"})), 404
            
            resume = Resume.query.filter_by(id=id, user_id=user.id).first()

            if not resume:
                return make_response(jsonify({"message":"Resume not found or authorised "})), 494
            

            db.session.delete(resume)
            db.session.commit()

            make_response(jsonify({"message":"Resume deleted susccessfully"}), 200)

        except Exception as e:
            return make_response(jsonify({"error":str(e)}), 500)
        




