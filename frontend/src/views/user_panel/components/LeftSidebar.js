import React, { Component } from 'react';
import LogoDarkSmPng from './../../../assets/images/logo-dark-sm.png';
import LogoDarkPng from './../../../assets/images/logo-dark.png';
import LogoSmPng from './../../../assets/images/logo-sm.png';
import { Link } from 'react-router-dom';

export class LeftSidebar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null
        };
    }

    render() {
        return (
            <div className='leftside-menu'>
                <Link to={'/'} className="logo logo-light">
                    <span className="logo-lg">
                        <h4 className='text-light mt-3'>CRUD App</h4>
                    </span>
                    <span className="logo-sm">
                        <img src={LogoSmPng} alt="small logo" />
                    </span>
                </Link>

                <Link to={'/'} className="logo logo-dark">
                    <span className="logo-lg">
                        <img src={LogoDarkPng} alt="dark logo" />
                    </span>
                    <span className="logo-sm">
                        <img src={LogoDarkSmPng} alt="small logo" />
                    </span>
                </Link>

                <div className="button-sm-hover" data-bs-toggle="tooltip" data-bs-placement="right" title="Show Full Sidebar">
                    <i className="ri-checkbox-blank-circle-line align-middle"></i>
                </div>

                <div className="button-close-fullsidebar">
                    <i className="ri-close-fill align-middle"></i>
                </div>

                <div className="h-100" id="leftside-menu-container" data-simplebar>
                    <ul className="side-nav">
                        <li className="side-nav-title">Navigation</li>

                        <li className="side-nav-item">
                            <Link to={'/user-panel/dashboard/posts/index'} className="side-nav-link">
                                <i className="uil-clipboard-alt"></i>
                                <span> Post </span>
                            </Link>
                        </li>
                    </ul>

                    <div className="clearfix"></div>
                </div>
            </div>
        );
    };
};

export default LeftSidebar;
