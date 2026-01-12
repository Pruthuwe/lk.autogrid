import React from 'react';
import { Link } from "react-router-dom";
import FeatureV1Data from '../../jsonData/latestService/LatestServiceV1Data.json';

type serviceInfoData = {
    title: string;
    text: string;
    brochure?: string;
}
const ServiceDetailsContent = ({ serviceInfo } : { serviceInfo:serviceInfoData }) => {
    const { title, text, brochure } = serviceInfo
    return (
        <>
            {/* Service Details Page Start !*/}
            <div className="service-details-page">
                <div className="container">
                    <div className="row">
                        {/* Service Details Content Start */}
                        <div className="col-lg-8">
                            <div className="te-service-details-wrapper">
                                <div className="service-details">
                                    <div className="image">
                                        <img src="../../images/service/service-details.jpg" alt="Image" />
                                    </div>
                                    <div className="content">
                                        <div className="te-title-wrapper">
                                            <div className="title-inner">
                                                <h3 className="title">{title}</h3>
                                            </div>
                                        </div>
                                        <div className="text">
                                            <p>
                                                {text}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="row gy-4 mt-3">
                                    <div className="col-md-6">
                                        <div className="gallery-wrapper">
                                            <img
                                                className="rounded"
                                                src="../../images/service/gallery-one.jpg"
                                                alt="Image"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="gallery-wrapper">
                                            <img
                                                className="rounded"
                                                src="../../images/service/gallery-two.jpg"
                                                alt="Image"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="service-details-overview">
                                    <h3 className="mb-0">Why Choose Us</h3>
                                    <p>
                                        AutoGrid is a modern automobile garage located on Athurugiriya Road, Kottawa, 
                                        specializing mainly in Hybrid Vehicle Services. We provide professional, reliable, 
                                        and transparent vehicle care, using advanced diagnostic tools and skilled technicians 
                                        to ensure your vehicle performs at its best.
                                    </p>
                                    <div className="te-list-item-wrapper">
                                        <div className="te-list-item style-1">
                                              <span className="icon">
                                                <i className="fa-regular fa-check" />
                                              </span>
                                            <span className="text">Hybrid Vehicle Specialists</span>
                                        </div>
                                        <div className="te-list-item style-1">
                                              <span className="icon">
                                                <i className="fa-regular fa-check" />
                                              </span>
                                            <span className="text">Skilled &amp; Experienced Technicians</span>
                                        </div>
                                        <div className="te-list-item style-1">
                                              <span className="icon">
                                                <i className="fa-regular fa-check" />
                                              </span>
                                            <span className="text">Advanced Diagnostic Equipment</span>
                                        </div>
                                        <div className="te-list-item style-1">
                                                  <span className="icon">
                                                    <i className="fa-regular fa-check" />
                                                  </span>
                                            <span className="text">Genuine &amp; Quality Spare Parts</span>
                                        </div>
                                        <div className="te-list-item style-1">
                                                  <span className="icon">
                                                    <i className="fa-regular fa-check" />
                                                  </span>
                                            <span className="text">Affordable &amp; Transparent Pricing</span>
                                        </div>
                                        <div className="te-list-item style-1">
                                                  <span className="icon">
                                                    <i className="fa-regular fa-check" />
                                                  </span>
                                            <span className="text">Customer-First Service Approach</span>
                                        </div>
                                    </div>
                                    <p>
                                        From engine tune-ups to hybrid battery replacement, ABS brake systems, dual clutch 
                                        repairs, and full vehicle servicing, AutoGrid is your trusted partner for complete 
                                        automobile solutions. We are committed to building long-term relationships with our 
                                        customers through trust, performance, and exceptional service quality.
                                    </p>
                                    <div className="content">
                                        <h4>Repairs &amp; Upgrades</h4>
                                        <p>
                                            Our comprehensive service range includes engine tune-ups, hybrid battery replacement, 
                                            ABS brake system repairs, dual clutch repairs, and complete vehicle servicing. 
                                            With our specialized expertise in hybrid vehicles and state-of-the-art diagnostic 
                                            equipment, we ensure your vehicle receives the highest quality care and maintenance 
                                            it deserves.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Service Details Content End */}
                        {/* sidebar Start */}
                        <div className="col-lg-4">
                            <div className="service-sidebar">
                                <div className="widget te_widget_categories">
                                    <div className="te-widget-title">
                                        <h4 className="wp-block-heading">Services List</h4>
                                    </div>
                                    <ul>
                                        {FeatureV1Data.map((service) => (
                                            <li key={service.id}>
                                                <Link to={`/service-details/${service.id}`}>{service.title}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="widget te_widget_pdf">
                                    <div className="te-widget-title">
                                        <h4 className="wp-block-heading">Brochure</h4>
                                    </div>
                                    <Link to={brochure || "#"} className="pdf-download-btn" target="_blank" rel="noopener noreferrer">
                                        <div className="icon">
                                            <i className="fa-light fa-file-pdf" />
                                        </div>
                                        <div className="content">
                                            <span className="title">Download Brochure</span>
                                        </div>
                                    </Link>
                                    <Link to="#" className="pdf-download-btn">
                                        <div className="icon">
                                            <i className="fa-light fa-file-pdf" />
                                        </div>
                                        <div className="content">
                                            <span className="title">Company Details</span>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        {/* sidebar Start */}
                    </div>
                </div>
            </div>
            {/* Service Details Page End !*/}
        </>
    );
};

export default ServiceDetailsContent;