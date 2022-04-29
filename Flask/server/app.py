import random
import string
from flask import Flask, redirect, request, jsonify, session
from flask_bcrypt import Bcrypt
from flask_session import Session
from email_handler import EmailHandler
from config import ApplicationConfig
from models import db, User, PDF, UserPDF
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)
app.config.from_object(ApplicationConfig)

bcrypt = Bcrypt(app)
server_session = Session(app)
db.init_app(app)

with app.app_context():
    db.create_all()

@app.route("/@me")
def get_current_user():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401
    
    user = User.query.filter_by(id=user_id).first()
    return jsonify({
        "id": user.id,
        "email": user.email
    }) 

@app.route("/register", methods=["POST"])
def register_user():
    email = request.form["email"]
    password = request.form["password"]

    user_exists = User.query.filter_by(email=email).first() is not None

    if user_exists:
        return "User already exists"
    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    
    session["user_id"] = new_user.id

    return redirect("http://localhost:3000/LoginUI")

@app.route("/login", methods=["POST"])
def login_user():
    email = request.form["email"]
    password = request.form["password"]

    user = User.query.filter_by(email=email).first()

    if user is None:
        return jsonify({"error": "Unauthorized"}), 401

    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Unauthorized"}), 401
    
    session["user_id"] = user.id

    return redirect("http://localhost:3000/AdminUI")

@app.route("/save-pdf", methods=["POST"])
def save_pdf():
    file = request.files["pdf"]
    file_path = "./public/pdfs/" + gen_pdf_name() + ".pdf"
    
    pdf = PDF(link=file_path)
    db.session.add(pdf)
    counselor = User.query.filter_by(email="digsigsup@gmail.com").first()
    user_pdf = UserPDF(user_id=counselor.id, pdf_id=pdf.id)
    db.session.add(user_pdf)
    db.session.commit()

    file.save(file_path)
    return redirect("http://localhost:3000/")

@app.route("/get-pdfs", methods=["POST"])
def get_pdfs():
    user_id = request.json["user_id"]

    user_pdfs = UserPDF.query.filter_by(user_id=user_id).all()
    pdf_list = []
    for record in user_pdfs:
        pdf_list.append(PDF.query.filter_by(id=record.pdf_id).first().link)
    return jsonify(pdf_list)



@app.route("/logout", methods=["POST"])
def logout_user():
    session.pop("user_id")
    return "200"

@app.route("/send-email", methods=["POST"])
def send_email():
    sendToEmail = request.form["email"]
    docID = request.form["doc_id"]
    studName = request.form["stud_name"]
    handler = EmailHandler()
    handler.send_email(sendToEmail, f"Document {docID}", f"Hello, {sendToEmail}! \n\nYou were sent a document from {studName} with Document ID {docID}. Refer to the attachments for the document.\n\nPlease return to DigSig to sign the document.\n\nHave a great day!")
    return redirect("http://localhost:3000/AdminUI")
    
def gen_pdf_name():
    letters = string.ascii_lowercase
    return ''.join(random.choice(letters) for i in range(10))

if __name__ == "__main__":
    app.run(debug=True)