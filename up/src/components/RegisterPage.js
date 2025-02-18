import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/RegisterPage.css';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [c_no, setCNo] = useState('');
    const [location, setLocation] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const requestData = { name, email, c_no, location, password };

        try {
            const response = await fetch("http://localhost:5000/RegisterPage", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestData),
            });

            const data = await response.json();
            console.log("📤 Sent Registration Data:", requestData);
            console.log("📩 Received Response:", data);

            if (response.ok) {
                setMessage("✅ Registration Successful!");
                setIsSuccess(true);

                // Redirect to login page after 2 seconds
                setTimeout(() => navigate('/login', { state: { message: 'Registration Successful! Please log in.' } }), 2000);
            } else {
                setMessage("❌ " + data.message);
                setIsSuccess(false);
            }
        } catch (error) {
            console.error("⚠️ Error:", error);
            setMessage("⚠️ Server error. Try again later.");
        }
    };

    return (
        <div className="register-container">
            <h1>Register</h1>

            {message && (
                <p className={`message ${isSuccess ? "success" : "error"}`}>
                    {message}
                </p>
            )}

            <form onSubmit={handleSubmit} className="register-form">
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="c_no">Contact No:</label>
                    <input type="text" id="c_no" value={c_no} onChange={(e) => setCNo(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="location">Location:</label>
                    <input type="text" id="location" value={location} onChange={(e) => setLocation(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit" className="register-button">Register</button>
            </form>
            <p className="login-link">
                <Link to="/login">Already have an account? Log in here.</Link>
            </p>

            <style>{`
                .message {
                    font-size: 16px;
                    margin-top: 10px;
                    padding: 10px;
                    text-align: center;
                    border-radius: 5px;
                }
                .success {
                    background-color: #d4edda;
                    color: #155724;
                    border: 1px solid #c3e6cb;
                }
                .error {
                    background-color: #f8d7da;
                    color: #721c24;
                    border: 1px solid #f5c6cb;
                }
            `}</style>
        </div>
    );
};

export default RegisterPage;
