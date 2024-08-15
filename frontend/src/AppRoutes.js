import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Landing from './views/Landing';
import NotFound from './views/NotFound';
import Login from './views/user_panel/auth/Login';
import DashboardInbox from './views/user_panel/dashboard/Index';

import PostIndex from './views/user_panel/dashboard/posts/Index';
import PostShow from './views/user_panel/dashboard/posts/Show';
import PostCreate from './views/user_panel/dashboard/posts/Create';
import PostEdit from './views/user_panel/dashboard/posts/Edit';

class AppRoutes extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null 
        };
    }

    render() {
        return (
            <Router>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="*" element={<NotFound />} />

                    {/* USER AUTH */}
                    <Route path="/user-panel/dashboard/login" element={<Login />} />

                    {/* Private Routes */}
                    {(localStorage.getItem('AUTH_USER_TOKEN')) ? 
                        (
                            <>
                                <Route path="/user-panel/dashboard" element={<DashboardInbox />} />

                                <Route path="/user-panel/dashboard/posts/index" element={<PostIndex />} />
                                <Route path="/user-panel/dashboard/posts/:post_id/show" element={<PostShow />} />
                                <Route path="/user-panel/dashboard/posts/create" element={<PostCreate />} />
                                <Route path="/user-panel/dashboard/posts/:post_id/edit" element={<PostEdit />} />
                            </>
                        ) 
                        : (
                            <Route path="/user-panel/dashboard/*" element={<Navigate to="/user-panel/dashboard/login" replace />} />
                        )
                    }
                </Routes>
            </Router>
        );
    };
};

export default AppRoutes;
