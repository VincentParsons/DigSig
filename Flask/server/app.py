from flask import Flask, redirect, request, jsonify, session
from flask_bcrypt import Bcrypt
from flask_cors import CORS, cross_origin
from flask_session import Session
from email_handler import EmailHandler
from config import ApplicationConfig
from models import db, User

app = Flask(__name__)
app.config.from_object(ApplicationConfig)

bcrypt = Bcrypt(app)
CORS(app, supports_credentials=True)
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
        return redirect("http://localhost:3000/LoginUI")

    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    
    session["user_id"] = new_user.id

    return jsonify({
        "id": new_user.id,
        "email": new_user.email
    })

@app.route("/login", methods=["POST"])
def login_user():
    email = request.json["email"]
    password = request.json["password"]

    user = User.query.filter_by(email=email).first()

    if user is None:
        return jsonify({"error": "Unauthorized"}), 401

    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Unauthorized"}), 401
    
    session["user_id"] = user.id

    return jsonify({
        "id": user.id,
        "email": user.email
    })

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
    

if __name__ == "__main__":
    app.run(debug=True)