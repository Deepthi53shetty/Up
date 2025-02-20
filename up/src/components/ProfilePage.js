import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/ProfilePage.css';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch("http://localhost:5000/user", {
                    method: "GET",
                    credentials: "include", // Ensures session-based authentication works
                });

                const data = await response.json();
                
                if (response.ok) {
                    setUser(data.user);
                } else {
                    setError(data.message || "Session expired. Please log in again.");
                    localStorage.removeItem("user"); // Remove old data if session expired
                    setTimeout(() => navigate("/login"), 2000); // Redirect to login
                }
            } catch (error) {
                console.error("Error fetching user:", error);
                setError("Server error. Try again later.");
            }
        };

        fetchUser();
    }, [navigate]);

    const handleLogout = async () => {
        try {
            const response = await fetch("http://localhost:5000/LogoutPage", {
                method: "GET",
                credentials: "include", // ✅ Required for session persistence
            });

            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            const data = await response.json(); // ✅ Parse the response JSON

            localStorage.removeItem("user"); // Clear local storage
            alert(data.message); // Show "Logout successful!" message
            navigate("/"); // Navigate to home page
        } catch (error) {
            console.error("Logout error:", error);
            alert("Logout failed. Please try again.");
        }
    };

    return (
        <div className="profile-container">
            <h1>Profile Page</h1>
            
            {error && <p className="error-message">{error}</p>}

            {user ? (
                <div>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Contact No:</strong> {user.c_no}</p>
                    <p><strong>Location:</strong> {user.location}</p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                !error && <p>Loading user details...</p>
            )}
        </div>
    );
};

export default ProfilePage;