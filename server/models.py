from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import json
from werkzeug.security import check_password_hash,generate_password_hash



db=SQLAlchemy()


class User(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    _password_hash = db.Column(db.String(20), nullable=False)

    resume = db.relationship('Resume', backref='user_resumes', lazy=True)

    # resumes = db.relationship('Resumes', backref='user_resumes', lazy=True)

    def verify_password(self,password):
        return check_password_hash(self._password_hash, password)
    def set_password(self,password):
        self.password = generate_password_hash(password)
    def check_password(self, password):
        return check_password_hash(self.password, password)



class Resume(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    name = db.Column(db.String(120), nullable=False)
    profile = db.Column(db.Text, nullable=False)
    experience = db.Column(db.Text, nullable=False)
    education = db.Column(db.Text, nullable=False)
    skills = db.Column(db.Text, nullable=False)
    certificates = db.Column(db.Text, nullable=False)
    projects = db.Column(db.Text, nullable=False)
    languages = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship('User',backref='user_resume')

    @property
    def experience_list(self):
        return json.loads(self.experience)
    
    @experience_list.setter
    def experience_list(self,value):
        self.experience = json.dumps(value)

    @property
    def education_list(self):
        return json.loads(self.education)
    
    @education_list.setter
    def education_list(self, value):
        self.education = json.dumps(value)


