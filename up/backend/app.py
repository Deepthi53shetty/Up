import mysql.connector
import bcrypt
from flask import Flask, request, jsonify, session
from flask_cors import CORS

app = Flask(__name__)
app.secret_key = 'your_secret_key'
CORS(app, supports_credentials=True)

# MySQL Database Configuration
db_config = {
    "host": 'localhost',
    "user": 'root',
    "password": '',
    "database": 'strike'  # Ensure this matches your actual database name
}

# **Function to Connect to MySQL**
def get_db_connection():
    return mysql.connector.connect(**db_config)

# **Register Route**
@app.route('/RegisterPage', methods=['POST'])
def RegisterPage():
    data = request.get_json()
    print("Received data:", data)  # Debugging line

    if not data:
        return jsonify({"error": "No data received"}), 400

    # Ensure all required fields are present
    required_fields = ['name', 'email', 'c_no', 'location', 'password']
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Missing field: {field}"}), 400

    name = data['name']
    email = data['email']
    c_no = data['c_no']
    location = data['location']
    password = data['password']

    # Hash the password securely
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        # Insert user data into MySQL
        cursor.execute(
            "INSERT INTO users (name, email, c_no, location, password) VALUES (%s, %s, %s, %s, %s)",
            (name, email, c_no, location, hashed_password)
        )
        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({"message": "User registered successfully"}), 201

    except mysql.connector.Error as err:
        return jsonify({"error": f"Database error: {err}"}), 500

# **Login Route**
@app.route('/LoginPage', methods=['POST'])
def LoginPage():
    data = request.get_json()
    
    if not data or 'email' not in data or 'password' not in data:
        return jsonify({"message": "Missing email or password"}), 400

    email = data['email']
    password = data['password']

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
    user = cursor.fetchone()

    cursor.close()
    conn.close()

    if not user:
        return jsonify({"message": "Invalid email or password"}), 401

    # Verify password
    if not bcrypt.checkpw(password.encode('utf-8'), user['password'].encode('utf-8')):
        return jsonify({"message": "Invalid email or password"}), 401

    # ✅ Store user email in session
    session['email'] = user['email']

    return jsonify({"message": "Login successful", "user": user}), 200

# **Get User Route**
@app.route('/user', methods=['GET'])
def get_user():
    # ✅ Check session for user email
    email = session.get('email')
    if not email:
        return jsonify({"message": "User not logged in"}), 401

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    
    cursor.execute("SELECT name, email, c_no, location FROM users WHERE email = %s", (email,))
    user = cursor.fetchone()
    cursor.close()
    conn.close()

    if not user:
        return jsonify({"message": "User not found"}), 404

    return jsonify({"user": user}), 200


# **Logout Route**
@app.route('/LogoutPage', methods=['GET'])
def LogoutPage():
    session.clear()
    return jsonify({"message": "You have been logged out successfully!"}), 200


if __name__ == '__main__':
    app.run(debug=True)

