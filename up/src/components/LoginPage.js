import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../styles/LoginPage.css'; // Import CSS file

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(null);

    const navigate = useNavigate(); // React Router navigation hook

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const requestData = { email, password };
        console.log("🔹 Sending data:", requestData);  // Debugging
    
        try {
            const response = await fetch("http://localhost:5000/LoginPage", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestData),
                credentials: "include", // ✅ Allow cookies (important for session)
            });
        
            const data = await response.json();
            console.log("🔹 Received response:", data);  // Debugging
    
            if (response.ok) {
                setMessage("✅ Login Successful!");
                setIsSuccess(true);
                
                // Store user info in localStorage
                localStorage.setItem("user", JSON.stringify(data.user));
                
                // Redirect to profile page after 2 seconds
                setTimeout(() => navigate("/profile"), 2000);
            } else {
                setMessage("❌ " + (data.message || "Invalid login credentials."));
                setIsSuccess(false);
            }
        } catch (error) {
            console.error("⚠️ Network or Server Error:", error);
            setMessage("⚠️ Server error. Please try again later.");
            setIsSuccess(false);
        }
    };
    
    return (
        <div className="login-container">
            <h1>Login</h1>

            {message && (
                <p className={`message ${isSuccess ? "success" : "error"}`}>
                    {message}
                </p>
            )}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>

            <p>
                <Link to="/register">Don't have an account? Register here.</Link>
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

export default LoginPage;
