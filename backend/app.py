from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv
from passlib.hash import pbkdf2_sha256
from jose import jwt
import os
import datetime

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# MongoDB setup
MONGO_URI = os.getenv('MONGO_URI', 'mongodb://localhost:27017/')
client = MongoClient(MONGO_URI)
db = client['cryptotech']
users_collection = db['users']

# JWT Configuration
JWT_SECRET = os.getenv('JWT_SECRET', 'your-secret-key')
JWT_ALGORITHM = 'HS256'

def create_token(user_id):
    payload = {
        'user_id': str(user_id),
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1)
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    
    # Validate required fields
    required_fields = ['email', 'password', 'firstName', 'lastName']
    if not all(field in data for field in required_fields):
        return jsonify({'error': 'Missing required fields'}), 400
    
    # Check if user already exists
    if users_collection.find_one({'email': data['email']}):
        return jsonify({'error': 'Email already registered'}), 400
    
    # Hash password
    hashed_password = pbkdf2_sha256.hash(data['password'])
    
    # Create user document
    user = {
        'email': data['email'],
        'password': hashed_password,
        'firstName': data['firstName'],
        'lastName': data['lastName'],
        'created_at': datetime.datetime.utcnow(),
        'subscription': None,
        'api_keys': [],
        'trading_history': []
    }
    
    # Insert user
    result = users_collection.insert_one(user)
    
    # Create token
    token = create_token(result.inserted_id)
    
    return jsonify({
        'token': token,
        'user': {
            'email': user['email'],
            'firstName': user['firstName'],
            'lastName': user['lastName']
        }
    })

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    
    # Validate required fields
    if not all(field in data for field in ['email', 'password']):
        return jsonify({'error': 'Missing email or password'}), 400
    
    # Find user
    user = users_collection.find_one({'email': data['email']})
    if not user:
        return jsonify({'error': 'Invalid email or password'}), 401
    
    # Verify password
    if not pbkdf2_sha256.verify(data['password'], user['password']):
        return jsonify({'error': 'Invalid email or password'}), 401
    
    # Create token
    token = create_token(user['_id'])
    
    return jsonify({
        'token': token,
        'user': {
            'email': user['email'],
            'firstName': user['firstName'],
            'lastName': user['lastName']
        }
    })

@app.route('/api/user/profile', methods=['GET'])
def get_profile():
    # Get token from header
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return jsonify({'error': 'No token provided'}), 401
    
    try:
        # Verify token
        token = auth_header.split(' ')[1]
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        user_id = payload['user_id']
        
        # Get user
        user = users_collection.find_one({'_id': user_id})
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        return jsonify({
            'email': user['email'],
            'firstName': user['firstName'],
            'lastName': user['lastName'],
            'subscription': user['subscription'],
            'trading_history': user['trading_history']
        })
        
    except Exception as e:
        return jsonify({'error': 'Invalid token'}), 401

@app.route('/api/user/subscription', methods=['POST'])
def update_subscription():
    # Get token from header
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return jsonify({'error': 'No token provided'}), 401
    
    try:
        # Verify token
        token = auth_header.split(' ')[1]
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        user_id = payload['user_id']
        
        # Update subscription
        data = request.json
        users_collection.update_one(
            {'_id': user_id},
            {'$set': {'subscription': data['subscription']}}
        )
        
        return jsonify({'message': 'Subscription updated successfully'})
        
    except Exception as e:
        return jsonify({'error': 'Invalid token'}), 401

if __name__ == '__main__':
    app.run(debug=True) 