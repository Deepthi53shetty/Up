import React, { useEffect } from 'react';

const LogoutPage = () => {
    useEffect(() => {
        const timer = setTimeout(() => {
            window.location.href = "/";
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="message">You have been logged out successfully!</div>
    );
};

export default LogoutPage;