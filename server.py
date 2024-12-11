import os
from flask import Flask, request, jsonify, redirect, url_for, render_template
from flask_login import UserMixin
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_wtf.csrf import CSRFProtect
from notesummarizer import app

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)

# Create a User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(150), nullable=False)

# Create the database
with app.app_context():
    db.create_all()

@app.route('/', methods=['GET', 'POST'])
def home():
    if request.method == 'POST':
        data = request.get_json()

        # Check if the username already exists
        if User.query.filter_by(username=data['username']).first():
            return jsonify({"msg": "Username already exists!"}), 400

        # Hash the password
        hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')

        # Create new user and save to the database
        new_user = User(username=data['username'], password=hashed_password)
        db.session.add(new_user)
        db.session.commit()

        return jsonify({"msg": "User registered successfully."}), 200

    return render_template('index.html')


# Login endpoint
@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data['username']).first()

    #if user and bcrypt.check_password_hash(user.password, data['password']):
        #access_token = create_access_token(identity=user.id)
        #return jsonify({"msg": "Login successful", "access_token": access_token}), 200
    #else:
        #return jsonify({"msg": "Invalid credentials"}), 401

# Protected route to get the current user
@app.route('/api/profile', methods=['GET'])
def profile():
    #current_user_id = get_jwt_identity()
    #user = User.query.get(current_user_id)
    #return jsonify({"username": user.username}), 200
    pass

# Logout endpoint
@app.route('/api/logout', methods=['POST'])
def logout():
    return jsonify({"msg": "Logged out successfully!"}), 200

# Route to display the user homepage after successful registration
@app.route('/user_homepage', methods=['GET', 'POST'])
def user_homepage():
    return render_template('user_homepage.html')

@app.route('/notes-page', methods=['GET', 'POST'])
def notes_page():
    return render_template('notes-page.html')

@app.route('/past-notes', methods=['GET', 'POST'])
def past_notes():
    return render_template('past-notes.html')

@app.route('/settings')
def settings():
    return render_template('settings.html')

if __name__ == "__main__":
    app.run(debug=True, host='127.0.0.1', port=5000)
