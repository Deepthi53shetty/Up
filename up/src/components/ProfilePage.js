/*import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ProfilePage.css';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Get user from localStorage
        const storedUser = localStorage.getItem("user");

        if (!storedUser) {
            setMessage("⚠️ User not logged in. Redirecting to login...");
            setTimeout(() => navigate("/login"), 2000);
            return;
        }

        const userData = JSON.parse(storedUser);
        setUser(userData);
    }, [navigate]);

    return (
        <div className="profile-container">
            <h1>Profile</h1>

            {message && <p className="message">{message}</p>}

            {user ? (
                <div className="user-info">
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Contact No:</strong> {user.c_no}</p>
                    <p><strong>Location:</strong> {user.location}</p>
                </div>
            ) : (
                <p>Loading user data...</p>
            )}
            
            <button onClick={() => {
                localStorage.removeItem("user");  // ✅ Clears only the logged-in user
                fetch("http://localhost:5000/LogoutPage")  // ✅ Calls backend logout route
                    .then(() => {
                        window.location.href = "/"; // ✅ Redirects to Homepage
                    })
                    .catch((err) => console.error("Logout failed:", err));
            }}> Logout</button>



            <style>{`
                .profile-container {
                    padding: 20px;
                    max-width: 400px;
                    margin: auto;
                    text-align: center;
                }
                .message {
                    color: red;
                    font-weight: bold;
                }
                .user-info p {
                    font-size: 18px;
                }
            `}</style>
        </div>
    );
};

export default ProfilePage;*/

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/ProfilePage.css';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch user details from localStorage (or API)
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            navigate("/login"); // Redirect to login if no user is found
        }
    }, []);

    const handleLogout = async () => {
        try {
            const response = await fetch("http://localhost:5000/LogoutPage", {
                method: "GET",
                credentials: "include", // Ensure session clearing works
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.removeItem("user"); // Clear local storage
                alert(data.message); // Show "Logout successful!" message
                navigate("/"); // Navigate to home page
            }
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <div className="profile-container">
            <h1>Profile Page</h1>
            {user ? (
                <div>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Contact No:</strong> {user.c_no}</p>
                    <p><strong>Location:</strong> {user.location}</p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <p>Loading user details...</p>
            )}
        </div>
    );
};

export default ProfilePage;

