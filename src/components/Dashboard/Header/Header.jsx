/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

import { Link } from 'react-router-dom';

import './Header.scss';

/**
 * Header component.
 * @param {Object} props Props
 */
const Header = (props) => (
    <div className="Header">
        <div className="Header__main">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link to="/dashboard" className="navbar-brand"><img className="logo" src="https://storage.googleapis.com/scratchpay-com-assets/challenges/logo.png" alt="Logo" /></Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/dashboard/users">Users <span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/dashboard/roles">Roles</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link btn" to={`/dashboard/users/${props.user.id}/edit`}>{props.user.firstName}</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/logout">Logout</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    </div>
);

export default Header;
