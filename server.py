from flask import Flask, request, jsonify, send_from_directory
import json
import os

app = Flask(__name__, static_url_path='', static_folder='.')

# Database file
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

# Serve static files
@app.route('/')
def serve_index():
    return send_from_directory('.', 'index.html')

@app.route('/dashboard')
def serve_dashboard():
    return send_from_directory('.', 'dashboard.html')

@app.route('/<path:path>')
def serve_static(path):
    if os.path.exists(path):
        return send_from_directory('.', path)
    return send_from_directory('.', 'index.html')

if __name__ == '__main__':
    if not os.path.exists(USERS_FILE):
        save_users({})
    print("Server starting. Files will be served from:", os.getcwd())
    app.run(host='0.0.0.0', port=5000, debug=True) 