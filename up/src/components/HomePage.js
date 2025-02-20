import React from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css'; // Import CSS file

const HomePage = () => {
    return (
        <div>
            <Header />
            <section className="hero">
                <div className="container">
                    <h1>Welcome to Strike Up</h1>
                    <p>Innovating Your Path to Success</p>
                    <Link className="cta-button" to="/login">Get Started</Link>
                </div>
            </section>

            <section id="trade" className="container">
                <div className="features">
                    <div className="feature">
                        <h3>Trade</h3>
                        <p>Streamline your trading strategies with our advanced tools.</p>
                    </div>
                    <div className="feature">
                        <h3>Analyse</h3>
                        <p>Gain deep insights with real-time data analysis.</p>
                    </div>
                    <div className="feature">
                        <h3>Watchlist</h3>
                        <p>Monitor your favorite stocks and indices effortlessly.</p>
                    </div>
                    <div className="feature">
                        <h3>Positions</h3>
                        <p>Keep track of your open positions and performance.</p>
                    </div>
                    <div className="feature">
                        <h3>Orders</h3>
                        <p>Manage your orders efficiently and with precision.</p>
                    </div>
                </div>
            </section>

            <footer>
                <p>&copy; 2025 Strike Up. All Rights Reserved.<Link to="/policy-page">Privacy policy</Link>
                </p>
            </footer>
        </div>
    );
};

export default HomePage;