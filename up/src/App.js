import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ProfilePage from './components/ProfilePage';
import LogoutPage from './components/LogoutPage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/profile" element={<ProfilePage user={{ name: 'John Doe', email: 'john@example.com', c_no: '1234567890', location: 'New York, NY' }} />} />
                <Route path="/logout" element={<LogoutPage />} />
            </Routes>
        </Router>
    );
};

export default App;