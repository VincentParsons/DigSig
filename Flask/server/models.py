from os import link
from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4

db = SQLAlchemy()


def get_uuid():
    return uuid4().hex


class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.String(32), primary_key=True,
                   unique=True, default=get_uuid)
    email = db.Column(db.String(345), unique=True)
    password = db.Column(db.Text, nullable=False)


class PDF(db.Model):
    __tablename__ = "pdfs"
    id = db.Column(db.String(32), primary_key=True,
                   unique=True, default=get_uuid)
    link = db.Column(db.Text, nullable=True, unique=True)


class UserPDF(db.Model):
    __tablename__ = "user_pdfs"
    id = db.Column(db.String(32), primary_key=True,
                   unique=True, default=get_uuid)
    user_id = db.Column(db.String(32), db.ForeignKey(
        "users.id"), nullable=False)
    pdf_id = db.Column(db.String(32), db.ForeignKey("pdfs.id"), nullable=False)

