import React, { Component } from 'react';
import Helpers from './../../../../utils/Helpers';
import AxiosAPI from './../../../../AxiosConfig';
import Topbar from './../../components/Topbar';
import LeftSidebar from './../../components/LeftSidebar';
import Footer from './../../components/Footer';
import { Link } from 'react-router-dom';

export class Show extends Component {
    constructor(props) {
        super(props);

        this.state = {
            post: {
                title: "",
                text: ""
            }
        };
    }

    componentDidMount() {
        let title = `Post Show | ${Helpers.appInfo().app_name}`;
        let meta_description = "Post Show Description";

        Helpers.updateHeadComponentDidMount(title, meta_description);

        const pathname = window.location.pathname;
        const pathParts = pathname.split('/');
        const post_id = pathParts[pathParts.length - 2];

        AxiosAPI.get(`/api/user-panel/dashboard/posts/${post_id}/show`)
            .then(response => {
                this.setState({
                    post: response.data.result.post
                });
            })
            .catch(error => {
                this.setState({
                    error: error,
                });
            });
    }

    componentWillUnmount() {
        Helpers.updateHeadComponentWillUnmount();
    }

    render() {
        const { post } = this.state;

        return (
            <div className="wrapper">
                <Topbar />

                <LeftSidebar />

                <div className="content-page">
                    <div className="content">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-12">
                                    <div className="page-title-box">
                                        <div className="page-title-right">
                                            <ol className="breadcrumb m-0">
                                                <li className="breadcrumb-item"><Link to={'/'}>CRUD App</Link></li>
                                                <li className="breadcrumb-item"><Link to={'/user-panel/dashboard'}>Dashboard</Link></li>
                                                <li className="breadcrumb-item active">Post Show</li>
                                            </ol>
                                        </div>
                                        <h4 className="page-title">Post Show</h4>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <p className="font-18">Title: {post.title}</p>
                                            <p className="font-18">Text: {post.text}</p>

                                            <div className="float-end">
                                                <Link to={'/user-panel/dashboard/posts/index'} className="btn btn-primary button-last"> Go Back </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Footer />
                </div>
            </div>
        );
    };
};

export default Show;
