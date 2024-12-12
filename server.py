from flask import Flask, request, jsonify, redirect, url_for, render_template
from flask_login import UserMixin
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_wtf.csrf import CSRFProtect
from notesummarizer import summarize_notes
from summarizer import Summarizer
from flask_jwt_extended import create_access_token

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'

model = Summarizer()

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

        # If username and password are provided, check if it's a login or registration
        if 'login' in data:  # If login field exists in data
            username = data['username']
            password = data['password']
            
            # Check if the user exists
            user = User.query.filter_by(username=username).first()
            
            if user and bcrypt.check_password_hash(user.password, password):
                # If login is successful, return an access token or success message
                access_token = "your_access_token_here"  # Replace with actual token generation if needed
                return jsonify({"msg": "Login successful", "access_token": access_token}), 200
            else:
                return jsonify({"msg": "Invalid credentials"}), 401

        # Otherwise, it's a registration request (already handled by your current code)
        else:
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

    # If it's a GET request, just render the homepage
    return render_template('index.html')

@app.route('/notes-page', methods=['GET', 'POST'])
def note_page():
    if request.method == 'POST':
        # If a POST request is made, handle summarization
        data = request.get_json()
        notes = data.get('notes', '')
        ratio = data.get('ratio', 0.2)  # Default ratio is 0.2
        
        if not notes:
            return jsonify({'error': 'No notes provided'}), 400
        
        if not (0.0 < ratio <= 1.0):
            return jsonify({'error': 'Invalid ratio. Must be between 0 and 1'}), 400
        
        # Generate the summary using the model
        summary = model(notes, ratio)
        print("The summary: ", summary)
        return jsonify({'summary': summary})
    
    # If it's a GET request, just serve the notes page
    return render_template('notes-page.html')

# Login endpoint
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data['username']).first()

    if user and bcrypt.check_password_hash(user.password, data['password']):
        access_token = create_access_token(identity=user.id)
        return jsonify({"msg": "Login successful", "access_token": access_token}), 200
    else:
        return jsonify({"msg": "Invalid credentials"}), 401

# Protected route to get the current user
@app.route('/api/profile', methods=['GET'])
def profile():
    #current_user_id = get_jwt_identity()
    #user = User.query.get(current_user_id)
    #return jsonify({"username": user.username}), 200
    pass

# Route to display the user homepage after successful registration
@app.route('/user_homepage', methods=['GET', 'POST'])
def user_homepage():
    return render_template('user_homepage.html')

@app.route('/past-notes', methods=['GET', 'POST'])
def past_notes():
    return render_template('past-notes.html')

@app.route('/settings')
def settings():
    return render_template('settings.html')

if __name__ == "__main__":
    app.run(debug=True, host='127.0.0.1', port=5000)
