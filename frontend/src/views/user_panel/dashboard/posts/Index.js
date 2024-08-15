import React, { Component } from 'react';
import Helpers from './../../../../utils/Helpers';
import AxiosAPI from './../../../../AxiosConfig';
import Topbar from './../../components/Topbar';
import LeftSidebar from './../../components/LeftSidebar';
import Footer from './../../components/Footer';
import { Link } from 'react-router-dom';

export class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: []
        };
    }

    componentDidMount() {
        let title = `Posts | ${Helpers.appInfo().app_name}`;
        let meta_description = "Posts Description";

        Helpers.updateHeadComponentDidMount(title, meta_description);

        this.fetchPostsData();
    }

    componentWillUnmount() {
        Helpers.updateHeadComponentWillUnmount();
    }

    fetchPostsData() {
        AxiosAPI.get(`/api/user-panel/dashboard/posts`)
        .then(response => {
            this.setState({
                posts: response.data.result.posts,
            });
        })
        .catch(error => {
            this.setState({
                error: error,
            });
        });
    }

    handleDelete(post_id) {
        AxiosAPI.delete(`/api/user-panel/dashboard/posts/${post_id}/delete`)
            .then(response => {
                this.fetchPostsData();
            })
            .catch(error => {
                this.setState({
                    error: error,
                });
            });
    }

    render() {
        const { posts } = this.state;

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
                                                <li className="breadcrumb-item active">Posts</li>
                                            </ol>
                                        </div>
                                        <h4 className="page-title">Posts</h4>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="row mb-2">
                                                <div className="col-sm-5">
                                                    <Link to={'/user-panel/dashboard/posts/create'} className="btn btn-danger mb-2"><i className="mdi mdi-plus-circle me-2"></i> Add Post</Link>
                                                </div>
                                            </div>
                    
                                            <div className="table-responsive">
                                                <table className="table table-centered w-100 dt-responsive nowrap" id="products-datatable">
                                                    <thead className="table-light">
                                                        <tr>
                                                            <th>ID</th>
                                                            <th>Title</th>
                                                            <th>Added Date</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {posts.map(post => (
                                                            <tr>
                                                                <td>{post.id}</td>
                                                                <td>{post.title}</td>
                                                                <td>{post.created_at}</td>

                                                                <td className="table-action">
                                                                    <Link to={`/user-panel/dashboard/posts/${post.id}/show`} className="action-icon"> <i className="mdi mdi-eye"></i></Link>
                                                                    <Link to={`/user-panel/dashboard/posts/${post.id}/edit`} className="action-icon"> <i className="mdi mdi-square-edit-outline"></i></Link>

                                                                    {JSON.parse(localStorage.getItem('AUTH_USER_PERMISSIONS')).includes('post_delete') && (
                                                                        <button className='btn p-0' onClick={() => this.handleDelete(post.id)} title='Move To Trash'>
                                                                            <i className="mdi mdi-delete email-action-icons-item"></i>
                                                                        </button>
                                                                    )}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
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

export default Index;
