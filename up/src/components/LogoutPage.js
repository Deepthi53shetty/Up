import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LogoutPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleLogout = async () => {
            try {
                const response = await fetch("http://localhost:5000/LogoutPage", {
                    method: "GET",
                    credentials: "include", // Ensures session cookies are sent
                });

                if (!response.ok) {
                    throw new Error(`Server error: ${response.status}`);
                }

                const data = await response.json(); // ✅ Parse the response JSON
                
                alert(data.message || "You have been logged out successfully!"); // ✅ Display message

                // Clear user session from localStorage
                localStorage.removeItem("user");

                // Redirect to home page
                navigate("/");
            } catch (error) {
                console.error("⚠️ Logout Error:", error);
                alert("⚠️ Logout failed. Please try again.");
            }
        };

        handleLogout();
    }, [navigate]);

    return null; // No UI needed, just handling logout
};

export default LogoutPage;
