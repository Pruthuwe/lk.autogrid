import FaqV1Data from '../../jsonData/faq/FaqV1Data.json';
import SingleFaqAccordion from './SingleFaqAccordion';
import { Link } from "react-router-dom";

const FaqV1 = () => {
    return (
        <>
            {/* FAQ Area Start */}
            <div
                className="faq-area style-1 backgorund-black"
                style={{ backgroundImage: 'url("../../images/section-bg/faq-sec-bg.png")' }}
            >
                <div className="container">
                    <div className="row gy-5">
                        <div className="col-xl-6">
                            <div className="te-section-title">
                                <div className="te-section-content">
                                    <div className="short-title-wrapper">
                                        <span className="short-title only-divider">Frequently Asked Questions</span>
                                    </div>
                                    <h2 className="title text-white">
                                        Got Questions? <br /> We Have Answers
                                    </h2>
                                    <div className="te-section-desc">
                                        <p className="text-white">
                                            Find answers to common questions about our automotive services. <br /> Can't find what you're looking for? Contact us for personalized assistance.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex">
                                <Link to="/contact" className="te-theme-btn style-2 me-3">
                                    CONTACT NOW <i className="fa-solid fa-arrow-right-long" />
                                </Link>
                                <Link to="/about" className="te-theme-btn text-white">
                                    ABOUT US <i className="fa-solid fa-arrow-right-long" />
                                </Link>
                            </div>
                        </div>
                        <div className="col-xl-6 order-2 order-xxl-1 order-xl-1">
                            {/* Accordion Start */}
                            <div className="accordion-wrapper">
                                <div className="te-accordion-box-wrapper" id="faq_list">
                                    {FaqV1Data.map(accordion => (
                                        <SingleFaqAccordion
                                            accordion={{
                                                ...accordion,
                                                ariaExpanded: accordion.ariaExpanded ? "true" : "false",
                                            }}
                                            key={accordion.id}
                                        />
                                    ))}
                                </div>
                            </div>
                            {/* Accordion End */}
                        </div>
                    </div>
                </div>
            </div>
            {/* FAQ Area End */}
        </>
    );
};

export default FaqV1;
