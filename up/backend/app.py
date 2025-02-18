import os
import json
import bcrypt
from flask import Flask, request, jsonify, session
from flask_cors import CORS

app = Flask(__name__)
app.secret_key = 'your_secret_key'
CORS(app, supports_credentials=True)

# Ensure `users.json` exists
users_file = "users.json"
if not os.path.exists(users_file):
    with open(users_file, "w") as file:
        json.dump({}, file)  # Create an empty JSON file
    print("✅ Created users.json")

# Load users from `users.json`
try:
    with open(users_file, "r") as file:
        users_db = json.load(file)
    print("✅ Loaded users.json successfully")
except Exception as e:
    print(f"❌ Error loading users.json: {e}")
    users_db = {}


# Function to save users to `users.json`
def save_users():
    try:
        with open("users.json", "w") as file:
            json.dump(users_db, file, indent=4)
            file.flush()
            os.fsync(file.fileno())
        print("✅ Users saved successfully!")
    except Exception as e:
        print(f"❌ Error saving users: {e}")



# **Register Route**
@app.route('/RegisterPage', methods=['POST'])
def RegisterPage():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    c_no = data.get('c_no')
    location = data.get('location')
    password = data.get('password')

    if not email or not password:
        return jsonify({"message": "Email and password are required"}), 400

    if email in users_db:
        return jsonify({"message": "Email already registered"}), 400

    # Hash the password before storing
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    users_db[email] = {
        'name': name,
        'email': email,
        'c_no': c_no,
        'location': location,
        'password': hashed_password  # Store hashed password
    }

    save_users()  # Save to `users.json`
    
    print("🔍 Updated User Database:", users_db)

    return jsonify({"message": "Registration successful!"}), 201


# **Login Route**
@app.route('/LoginPage', methods=['POST'])
def LoginPage():
    data = request.json
    print("🔹 Incoming Login Data:", data)

    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"message": "Email and password are required"}), 400

    user = users_db.get(email)
    
    if not user:
        print("❌ User not found in database")
        print("📂 Current users in database:", users_db)
        return jsonify({"message": "Invalid email or password"}), 401

    # Compare hashed password
    if not bcrypt.checkpw(password.encode('utf-8'), user['password'].encode('utf-8')):
        print("❌ Incorrect password")
        return jsonify({"message": "Invalid email or password"}), 401

    session.permanent = True
    session['email'] = email

    print("✅ Login Successful for:", email)
    return jsonify({"message": "Login successful!", "user": user}), 200


# **Get User Route**
@app.route('/user', methods=['GET'])
def get_user():
    email = session.get('email')
    if not email or email not in users_db:
        return jsonify({"message": "User not logged in"}), 401

    return jsonify({"user": users_db[email]})


# **Logout Route**
@app.route('/LogoutPage', methods=['GET'])
def LogoutPage():
    session.clear()  # Only clears the session, not the users.json file
    return jsonify({"message": "Logout successful!"}), 200



# **Run Flask App**
if __name__ == '__main__':
    app.run(debug=True)
