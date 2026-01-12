import React from 'react';
import { Link } from "react-router-dom";

const FooterServicesWidget = () => {
    return (
        <>
            <div className="te-footer-widget te_widget_nav_menu">
                <h2 className="te-footer-widget-title">More Service</h2>
                <ul className="no-icon">
                    <li><Link to="/service-details/1">Engine Tune-Up</Link></li>
                    <li><Link to="/service-details/2">Hybrid Battery Service </Link></li>
                    <li><Link to="/service-details/3">ABS System Replacement</Link></li>
                    <li><Link to="/service-details/4">Dual Clutch Repair </Link></li>
                    <li><Link to="/service-details/5">Hybrid Diagnosis</Link></li>
                  
                </ul>
            </div>
        </>
    );
};

export default FooterServicesWidget;