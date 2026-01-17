const AboutV1 = () => {

    return (
        <>
            <div className="about-us-area style-1">
                <div className="about-us-image">
                    <div className="about-us-image-inner">
                        <img src="../../images/section-bg/about-sec-bg.jpg" alt="image" />
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-xl-8 offset-xl-4 align-self-center">
                            <div
                                className="te-about-info-card background-black"
                                style={{ backgroundImage: 'url("../../images/section-bg/about-bg.png")' }}
                            >
                                <div className="te-about-info-content">
                                    <div className="te-section-title">
                                        <div className="te-section-content">
                                            <div>
                                                <span className="short-title only-divider">ABOUT US</span>
                                            </div>
                                            <h2 className="title text-white">
                                                Driving Confidence One Repair at a Time
                                            </h2>
                                            <div className="te-section-desc text-white">
                                                <p>
                                                    At Automec, we are committed to building long-term relationships with our customers through trust, performance, and exceptional service quality. Our comprehensive service range includes engine tune-ups, hybrid battery replacement, ABS brake system repairs, dual clutch repairs, and complete vehicle servicing. With our specialized expertise and state-of-the-art diagnostic equipment, we ensure your vehicle receives the highest quality care it deserves.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="te-contact-info">
                                        <div className="te-icon-card style-1">
                                            <div className="icon">
                                                <img src="../../images/icon/icon-card/v-1/icon-1.png" alt="icon" />
                                            </div>
                                            <div className="content">
                                                <h3 className="title">Air Conditioning Maintenance</h3>
                                                <span className="desc">
                    Professional AC system diagnostics, repair, and maintenance to keep you comfortable year-round. Our expert technicians ensure optimal cooling performance and air quality.
                  </span>
                                            </div>
                                        </div>
                                        <div className="te-icon-card style-1">
                                            <div className="icon">
                                                <img src="../../images/icon/icon-card/v-1/icon-2.png" alt="icon" />
                                            </div>
                                            <div className="content">
                                                <h3 className="title">Oil Change &amp; Filter Replacement</h3>
                                                <span className="desc">
                    Regular oil changes and filter replacements are essential for engine longevity. We use premium quality oils and genuine filters to protect your engine and improve performance.
                  </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AboutV1;