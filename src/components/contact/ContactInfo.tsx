import React from 'react';
import SocialShare from '../slider/SocialShare';
import { Link } from "react-router-dom";

const ContactInfo = () => {
    return (
        <>
            {/* Contact Info Section Start !*/}
            <div className="te-contact-info-wrapper">
                <div className="te-title-wrapper">
                    <h2 className="title">
                        Let Us Know About Your <br /> Next Project
                    </h2>
                </div>
                <div className="te-contact-info">
                    <div className="te-icon-card style-2">
                        <div className="icon">
                            <i className="fa-solid fa-location-dot" />
                        </div>
                        <div className="content">
                            <h3 className="title">Location</h3>
                            <span className="desc">
                                246 Athurugiriya Road, Malapalla, Kottawa.
                            </span>
                        </div>
                    </div>
                    <div className="te-icon-card style-2">
                        <div className="icon">
                            <i className="fa-solid fa-phone" />
                        </div>
                        <div className="content">
                            <h3 className="title">Phone number</h3>
                            <Link to="tel:+94112844722" className="desc">
                                +94 112 844 722
                            </Link>
                        </div>
                    </div>
                    <div className="te-icon-card style-2">
                        <div className="icon">
                            <i className="fa-solid fa-envelope" />
                        </div>
                        <div className="content">
                            <h3 className="title">Emails</h3>
                            <Link to="mailto:info@autogrid.lk" className="desc">
                                info@autogrid.lk
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="te-social-profile-link">
                    <SocialShare />
                </div>
            </div>
            {/* Contact Info Section End */}
        </>
    );
};

export default ContactInfo;