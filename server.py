from flask import Flask, request, jsonify, redirect, url_for, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from summarizer import Summarizer

# Initialize app and extensions
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'your_secret_key'

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# Create a User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(150), nullable=False)

# Initialize the Summarizer model
summarizer_model = Summarizer()

# Create the database
with app.app_context():
    db.create_all()

# Register endpoint
@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    
    if User.query.filter_by(username=data['username']).first():
        return jsonify({"msg": "Username already exists!"}), 400
    
    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    new_user = User(username=data['username'], password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    
    # Redirect to user homepage after successful registration
    return redirect(url_for('user_homepage', username=data['username']))

# Login endpoint
@app.route('/api/login', methods=['POST'])
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
@jwt_required()
def profile():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    return jsonify({"username": user.username}), 200

# Logout endpoint
@app.route('/api/logout', methods=['POST'])
@jwt_required()
def logout():
    return jsonify({"msg": "Logged out successfully!"}), 200

# Summarization endpoint
@app.route('/api/summarize', methods=['POST'])
@jwt_required()  # Require authentication via JWT
def summarize_notes():
    data = request.get_json()
    notes = data.get('notes', '')
    ratio = data.get('ratio', 0.2)  # Default ratio is 20%

    if not notes:
        return jsonify({'error': 'No notes provided'}), 400

    if not (0.0 < ratio <= 1.0):
        return jsonify({'error': 'Invalid ratio. Must be between 0 and 1'}), 400

    # Generate the summary using the Summarizer model
    summary = summarizer_model(notes, ratio)
    
    return jsonify({'summary': summary})

# Route to display the user homepage after successful registration
@app.route('/userHomepage')
def user_homepage():
    return render_template('userHomepage.html')

if __name__ == "__main__":
    app.run(debug=True)
