import React, { Component } from 'react';
import Helpers from '../../../utils/Helpers';
import Topbar from '../components/Topbar';
import LeftSidebar from '../components/LeftSidebar';
import Footer from '../components/Footer';

export class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null
        };
    }

    componentDidMount() {
        let title = `Dashboard | ${Helpers.appInfo().app_name}`;
        let meta_description = "Dashboard Description";

        Helpers.updateHeadComponentDidMount(title, meta_description);
    }

    componentWillUnmount() {
        Helpers.updateHeadComponentWillUnmount();
    }

    render() {
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
                                        <h4 className="page-title"> Dashboard </h4>
                                    </div>
                                </div>
                            </div>

                            <div className="row mt-sm-5 mb-3">
                                
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
