import React, { Component } from 'react';
import Helpers from '../utils/Helpers';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export class Landing extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null,
        };
    }

    componentDidMount() {
        let title = `Home | ${Helpers.appInfo().app_name}`;
        let meta_description = "Home Description";

        Helpers.updateHeadComponentDidMount(title, meta_description);

    }

    componentWillUnmount() {
        Helpers.updateHeadComponentWillUnmount();
    }
    
    render() {
        return (
            <div className='Landing'>
                <Navbar />
                
                <section className="hero-section">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-md-5">
                                <div className="mt-md-4">
                                    <div>
                                        <span className="badge bg-danger font-13 rounded-pill">New</span>
                                    </div>
                                    <h2 className="text-white fw-normal mb-4 mt-3 lh-base">
                                    Welcome to CRUD App
                                    </h2>

                                    <p className="mb-4 font-16 text-white-50">Hyper is a fully featured dashboard and admin template
                                        comes with tones of well designed UI elements, components, widgets and pages.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        );
    };
};

export default Landing;
