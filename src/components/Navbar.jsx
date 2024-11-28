import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Auth } from '../context/Auth';

function Navbar() {
    const { isLoggedIn, logout } = useContext(Auth);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">My App</Link>
                {isLoggedIn && (
                    <div className="d-flex">
                        <Link className="btn btn-outline-primary" to="/dashboard">Dashboard</Link>
                        <Link className="btn btn-outline-primary" to="/task-list">Task List</Link>
                        <button className="btn btn-outline-danger" onClick={logout}>Logout</button>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
