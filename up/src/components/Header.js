import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <div className="container nav">
                <h1>STRIKE UP</h1>
                <nav>
                    <Link to="/trade">Trade</Link>
                    <Link to="/analyse">Analyse</Link>
                    <Link to="/watchlist">Watchlist</Link>
                    <Link to="/positions">Positions</Link>
                    <Link to="/orders">Orders</Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;