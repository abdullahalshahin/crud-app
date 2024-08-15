import React, { Component } from 'react';
import Helpers from './../../../../utils/Helpers';
import AxiosAPI from './../../../../AxiosConfig';
import Topbar from './../../components/Topbar';
import LeftSidebar from './../../components/LeftSidebar';
import Footer from './../../components/Footer';
import { Link } from 'react-router-dom';

export class Create extends Component {
    constructor(props) {
        super(props);

        this.state = {
            post: {
                title: "",
                text: ""
            },
            errors: {}
        };
    }

    componentDidMount() {
        let title = `Post Create | ${Helpers.appInfo().app_name}`;
        let meta_description = "Post Create Description";

        Helpers.updateHeadComponentDidMount(title, meta_description);
    }

    componentWillUnmount() {
        Helpers.updateHeadComponentWillUnmount();
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        
        this.setState(prevState => ({
            post: {
                ...prevState.post,
                [name]: value
            }
        }));
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const { post } = this.state;

        AxiosAPI.post(`api/user-panel/dashboard/posts/store`, {
            title: post.title,
            text: post.text || ""
        })
        .then(response => {
            window.location.href = '/user-panel/dashboard/posts/index';
        })
        .catch(error => {
            if (error.response && error.response.data) {
                this.setState({ errors: error.response.data.errors || {} });
            }
            else {
                console.error("Error creating post:", error);
            }
        });
    }

    render() {
        const { post, errors } = this.state;

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
                                                <li className="breadcrumb-item active">Post Create</li>
                                            </ol>
                                        </div>
                                        <h4 className="page-title">Post Create</h4>
                                    </div>
                                </div>
                            </div>

                            {Object.keys(errors).length > 0 && (
                                <div className="row">
                                    <div className="col-12">
                                        <div className="alert alert-danger" role="alert">
                                            <ul>
                                                {Object.values(errors).map((error, index) => (
                                                    <li key={index}>{error}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="row">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <form onSubmit={this.handleSubmit}>
                                                <div className="row g-2">
                                                    <div className="mb-2 col-md-12">
                                                        <label htmlFor="title"> Title <span className="text-danger">*</span></label>
                                                        <input type="text" className="form-control" id="title" name="title" value={post.title} onChange={this.handleInputChange} required />
                                                    </div>
                                                </div>

                                                <div className="row g-2">
                                                    <div className="mb-2 col-md-12">
                                                        <label htmlFor="text"> Text <span className="text-danger">*</span></label>
                                                        <textarea className="form-control" id="text" name="text" rows="5" value={post.text} onChange={this.handleInputChange} required></textarea>
                                                    </div>
                                                </div>

                                                <div className="float-end">
                                                    <button type="submit" className="btn btn-success button-last"> Save </button>
                                                </div>
                                            </form>
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

export default Create;
