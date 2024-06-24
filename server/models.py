from flask_sqlalchemy import SQLAlchemy
from datetime import datetime



db=SQLAlchemy()


class User(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    _password_hash = db.Column(db.String(20), nullable=False)

    resume = db.relationship('Resume', backref='user_resumes', lazy=True)

    # resumes = db.relationship('Resumes', backref='user_resumes', lazy=True)



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

