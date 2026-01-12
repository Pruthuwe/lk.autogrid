import React from 'react';
import { Link } from "react-router-dom";

const FooterLinksWidget = () => {
    return (
        <>
            <div className="te-footer-widget te_widget_nav_menu">
                <h2 className="te-footer-widget-title">Useful Links</h2>
                <ul className="no-icon">
                    <li><Link to="/about">About Us</Link></li>
                    <li><Link to="/team">Our Team</Link></li>
                    {/* <li><Link to="/news">Recent News </Link></li> */}
                    <li><Link to="/projects">Projects</Link></li>
                    <li><Link to="/services">Our All Services</Link></li>
                </ul>
            </div>
        </>
    );
};

export default FooterLinksWidget;