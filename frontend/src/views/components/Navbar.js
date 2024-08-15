import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg py-lg-1 bg-dark">
                <div className="container">
                    <Link to={'/'} className="navbar-brand me-lg-5">
                        <h3 className='text-light'>CRUD App</h3>
                    </Link>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
                        aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <i className="mdi mdi-menu"></i>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav me-auto align-items-center">
                            <li className="nav-item mx-lg-1">
                                <Link className="nav-link text-light" to={'/'}>Home</Link>
                            </li>
                        </ul>

                        <ul className="navbar-nav ms-auto align-items-center">
                            <li className="nav-item me-0">
                                {(localStorage.getItem('AUTH_USER_TOKEN')) ? 
                                    (
                                        <>
                                            <Link to={'/user-panel/dashboard'} className="nav-link d-lg-none">Dashboard</Link>
                                            <Link to={'/user-panel/dashboard'} className="btn btn-sm btn-light rounded-pill d-none d-lg-inline-flex">
                                                Dashboard
                                            </Link>
                                        </>
                                    ) 
                                    : (
                                        <>
                                            <Link to={'/user-panel/dashboard/login'} className="nav-link d-lg-none">Login</Link>
                                            <Link to={'/user-panel/dashboard/login'} className="btn btn-sm btn-light rounded-pill d-none d-lg-inline-flex">
                                                Login
                                            </Link>
                                        </>
                                    )
                                }
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    };
};

export default Navbar;
