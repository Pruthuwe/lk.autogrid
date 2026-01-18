import {motion} from "framer-motion";
import { useRef } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import PricingV1Data from "../../jsonData/pricingPlans/PricingV1Data.json";
import SinglePricingPlans from "../../components/pricingPlans/SinglePricingPlans";

const PricingPlans = () => {
    const sliderRef = useRef<Slider>(null);

    const handlePrevious = () => {
        sliderRef.current?.slickPrev();
    };

    const handleNext = () => {
        sliderRef.current?.slickNext();
    };

    const settings = {
        infinite: true,
        autoplay: true,
        arrows: false,
        speed: 1000,
        slidesToShow: 2,
        dots: false,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                },
            }
        ]
    };

    return (
        <>
            {/* Price Area Start !*/}
            <div className="price-area style-1 py-120 position-relative">
                <div className="sec-shape">
                    <img src="../../images/shape/wheel-shape.png" alt="image" />
                </div>
                <div className="container">
                    <div className="row gy-4">
                        <motion.div
                            className="col-md-12 col-lg-4 align-self-center"
                            initial={{ y: -50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ delay: 0.1, duration: 1.5, ease: "easeOut" }}
                        >
                            <div className="te-section-title mb-0">
                                <div className="te-section-content">
                                    <div className="short-title-wrapper">
                                        <span className="short-title only-divider">Our Packages</span>
                                    </div>
                                    <h2 className="title">Comprehensive Service Plans for Every Vehicle</h2>
                                    <div className="te-section-desc">
                                        <p>
                                            Choose from our flexible service packages designed to keep your vehicle running smoothly. <br /> From routine maintenance to specialized repairs, we offer tailored solutions that fit your needs and budget.
                                        </p>
                                    </div>
                                    <div className="te-slider-btn-wrapper style-1 mt-4">
                                        <Link
                                            to="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handlePrevious();
                                            }}
                                            className="te-slider-nav te-slider-prev"
                                        >
                                            <i className="fa-solid fa-angle-left"></i>
                                        </Link>
                                        <Link
                                            to="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleNext();
                                            }}
                                            className="te-slider-nav te-slider-next"
                                        >
                                            <i className="fa-solid fa-angle-right"></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                        <div className="col-md-12 col-lg-8">
                            <div className="price-slider-wrapper">
                                <Slider {...settings} ref={sliderRef}>
                                    {PricingV1Data.map((item, index) => (
                                        <div className="slick-slider-item px-3" key={item.id}>
                                            <SinglePricingPlans item={item} index={index} />
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Price Area End */}
        </>
    );
};

export default PricingPlans;