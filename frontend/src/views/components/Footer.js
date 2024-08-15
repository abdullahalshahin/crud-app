import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Footer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null
        };
    }

    render() {
        return (
            <footer className="bg-dark py-3">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <ul className="social-list list-inline mt-3">
                                <li className="list-inline-item text-center">
                                    <Link to={'/'} className="social-list-item border-primary text-primary"><i className="mdi mdi-facebook"></i></Link>
                                </li>
                                <li className="list-inline-item text-center">
                                    <Link to={'/'} className="social-list-item border-danger text-danger"><i className="mdi mdi-google"></i></Link>
                                </li>
                                <li className="list-inline-item text-center">
                                    <Link to={'/'} className="social-list-item border-info text-info"><i className="mdi mdi-twitter"></i></Link>
                                </li>
                                <li className="list-inline-item text-center">
                                    <Link to={'/'} className="social-list-item border-secondary text-secondary"><i className="mdi mdi-github"></i></Link>
                                </li>
                            </ul>

                        </div>

                        <div className="col-lg-2 col-md-4 mt-3 mt-lg-0">
                            <h5 className="text-light">Company</h5>

                            <ul className="list-unstyled ps-0 mb-0 mt-3">
                                <li className="mt-2"><Link to={'/'} className="text-light text-opacity-50">About Us</Link></li>
                                <li className="mt-2"><Link to={'/'} className="text-light text-opacity-50">Documentation</Link></li>
                            </ul>

                        </div>

                        <div className="col-lg-2 col-md-4 mt-3 mt-lg-0">
                            <h5 className="text-light">Apps</h5>

                            <ul className="list-unstyled ps-0 mb-0 mt-3">
                                <li className="mt-2"><Link to={'/'} className="text-light text-opacity-50">Email</Link></li>
                                <li className="mt-2"><Link to={'/'} className="text-light text-opacity-50">Social Feed</Link></li>
                            </ul>
                        </div>

                        <div className="col-lg-2 col-md-4 mt-3 mt-lg-0">
                            <h5 className="text-light">Discover</h5>

                            <ul className="list-unstyled ps-0 mb-0 mt-3">
                                <li className="mt-2"><Link to={'/'} className="text-light text-opacity-50">Help Center</Link></li>
                                <li className="mt-2"><Link to={'/'} className="text-light text-opacity-50">Privacy</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-12">
                            <div className="mt-2">
                                <p className="text-light text-opacity-50 mt-4 text-center mb-0">© 2023 - {new Date().getFullYear()} CRUD App</p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    };
};

export default Footer;
