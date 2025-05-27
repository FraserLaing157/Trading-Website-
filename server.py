from flask import Flask, request, jsonify
from flask_cors import CORS
import bcrypt
import json
import os

app = Flask(__name__)
# Update CORS configuration to allow requests from localhost:8000
CORS(app, resources={
    r"/api/*": {
        "origins": ["http://localhost:8000", "http://127.0.0.1:8000"],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization", "Accept"],
        "supports_credentials": True
    }
})
app.debug = True  # Enable debug mode

# In a real application, you would use a proper database
# For this demo, we'll use a JSON file
USERS_FILE = 'users.json'

def load_users():
    try:
        if os.path.exists(USERS_FILE):
            with open(USERS_FILE, 'r') as f:
                return json.load(f)
        return {}
    except Exception as e:
        print(f"Error loading users: {str(e)}")
        return {}

def save_users(users):
    try:
        with open(USERS_FILE, 'w') as f:
            json.dump(users, f, indent=4)
    except Exception as e:
        print(f"Error saving users: {str(e)}")

@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    name = data.get('name')

    if not all([email, password, name]):
        return jsonify({'error': 'Missing required fields'}), 400

    users = load_users()
    
    if email in users:
        return jsonify({'error': 'Email already registered'}), 400

    # Hash the password
    hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    
    # Initialize user data
    user_data = {
        'password': hashed.decode('utf-8'),
        'name': name,
        'token_balance': 0,
        'payment_methods': [],
        'trading_history': []
    }
    
    users[email] = user_data
    save_users(users)
    
    # Return user data without password
    return jsonify({
        'email': email,
        'name': name,
        'token_balance': 0,
        'payment_methods': [],
        'trading_history': []
    })

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not all([email, password]):
        return jsonify({'error': 'Missing required fields'}), 400

    users = load_users()
    
    if email not in users:
        return jsonify({'error': 'Invalid email or password'}), 401

    user = users[email]
    if bcrypt.checkpw(password.encode('utf-8'), user['password'].encode('utf-8')):
        # Return user data without password
        return jsonify({
            'email': email,
            'name': user['name'],
            'token_balance': user.get('token_balance', 0),
            'payment_methods': user.get('payment_methods', []),
            'trading_history': user.get('trading_history', [])
        })
    
    return jsonify({'error': 'Invalid email or password'}), 401

@app.route('/api/get_user_data', methods=['GET'])
def get_user_data():
    email = request.args.get('email')
    
    if not email:
        return jsonify({'error': 'Email is required'}), 400
    
    users = load_users()
    
    if email not in users:
        return jsonify({'error': 'User not found'}), 404

    user = users[email]
    
    # Return user data without password
    return jsonify({
        'email': email,
        'name': user['name'],
        'token_balance': user.get('token_balance', 0),
        'payment_methods': user.get('payment_methods', []),
        'trading_history': user.get('trading_history', [])
    })

@app.route('/api/add_payment_method', methods=['POST'])
def add_payment_method():
    data = request.get_json()
    email = data.get('email')
    payment_method = data.get('payment_method')

    if not all([email, payment_method]):
        return jsonify({'error': 'Missing required fields'}), 400

    users = load_users()
    
    if email not in users:
        return jsonify({'error': 'User not found'}), 404

    if 'payment_methods' not in users[email]:
        users[email]['payment_methods'] = []
    
    users[email]['payment_methods'].append(payment_method)
    save_users(users)
    
    return jsonify({
        'payment_methods': users[email]['payment_methods']
    })

@app.route('/api/update_tokens', methods=['POST'])
def update_tokens():
    data = request.get_json()
    email = data.get('email')
    amount = data.get('amount')

    if not all([email, amount]):
        return jsonify({'error': 'Missing required fields'}), 400

    users = load_users()
    
    if email not in users:
        return jsonify({'error': 'User not found'}), 404

    users[email]['token_balance'] = users[email].get('token_balance', 0) + amount
    save_users(users)
    
    return jsonify({
        'token_balance': users[email]['token_balance']
    })

@app.route('/api/purchase_package', methods=['POST'])
def purchase_package():
    print("Received purchase_package request") # Debug log
    try:
        data = request.get_json()
        print("Request data:", data) # Debug log
        
        email = data.get('email')
        package_type = data.get('package_type')
        price = data.get('price')
        candles = data.get('candles')

        if not all([email, package_type, price, candles]):
            print("Missing required fields") # Debug log
            return jsonify({'error': 'Missing required fields'}), 400

        users = load_users()
        print("Loaded users:", users) # Debug log
        
        if email not in users:
            print(f"User not found: {email}") # Debug log
            return jsonify({'error': 'User not found'}), 404

        # Update user's subscription and features
        users[email]['subscription'] = package_type
        users[email]['candles_limit'] = candles
        users[email]['subscription_price'] = price

        # Add a record to trading history
        if 'trading_history' not in users[email]:
            users[email]['trading_history'] = []
        
        users[email]['trading_history'].append({
            'date': '2024-03-14',
            'strategy': f'Subscribed to {package_type.capitalize()} Package',
            'tokens': candles,
            'status': 'Completed'
        })

        save_users(users)
        print(f"Successfully updated user {email} with package {package_type}") # Debug log
        
        return jsonify({
            'message': f'Successfully subscribed to {package_type} package',
            'subscription': package_type,
            'candles_limit': candles
        })
    except Exception as e:
        print(f"Error in purchase_package: {str(e)}") # Debug log
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    # Ensure the users.json file exists
    if not os.path.exists(USERS_FILE):
        save_users({})
    app.run(host='0.0.0.0', port=5000, debug=True) 