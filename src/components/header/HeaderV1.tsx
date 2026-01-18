import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import MainMenu from './MainMenu';
import HeaderLogo from './HeaderLogo';
import SideBarMenu from './SideBarMenu';
import SideBarOverlay from './SideBarOverlay';
import QuoteModal from '../modal/QuoteModal';

const HeaderV1 = () => {

    // Sticky Menu 
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 5) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);



    // SideBar 
    const [isMenuActive, setMenuActive] = useState(false);

    const openMenu = () => {
        setMenuActive(true);
    };

    const closeMenu = () => {
        setMenuActive(false);
    };

    const handleOverlayClick = () => {
        closeMenu();
    };

    // Mobile DropDown 
    const toggleSubMenu = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const listItem = (e.target as HTMLElement).parentElement;
        if (!listItem) return;

        const subMenu = listItem.querySelector('ul.te-submenu') as HTMLElement | null;
        if (subMenu) {
            listItem.classList.toggle('on');
            subMenu.style.maxHeight = subMenu.style.maxHeight === "20000px" ? "0" : "20000px";
        }
    };

    // Quote Modal
    const [isQuoteModalOpen, setQuoteModalOpen] = useState(false);

    const openQuoteModal = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setQuoteModalOpen(true);
    };

    const closeQuoteModal = () => {
        setQuoteModalOpen(false);
    };

    return (
        <>
            <header className="header-area style-1">
                <div className="header-area-wrapper">
                    <div className="logo-wrapper d-flex align-items-center">
                        <HeaderLogo />
                    </div>

                    <div className="header-inner">
                        <div className="header-top">
                            <div className="container">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="te-header-top-wrapper">
                                            <div className="header-top-info">
                                                <div className="te-header-contact-info">
                                                    <span><Link to="mailto:info@example.com"><i className="fa-solid fa-envelope"></i>info@autogrid.lk</Link> </span>
                                                    <span><i className="fa-solid fa-location-dot"></i>246 Athurugiriya Road, Malapalla, Kottawa.</span>
                                                    <span><i className="fa-solid fa-clock"></i>Monday - Saturday: 8:30 am - 6:30 pm</span>
                                                </div>
                                            </div>
                                            <div className="header-top-info">
                                                <div className="te-social-profile">
                                                    <Link to="https://www.facebook.com/autogridlk"><i className="fa-brands fa-facebook-f"></i></Link>
                                                    <Link to="https://www.instagram.com/autogridlk/"><i className="fa-brands fa-instagram"></i></Link>
                                                    <Link to="https://wa.me/94768950179"><i className="fa-brands fa-whatsapp"></i></Link>
                                                    <Link to="https://www.tiktok.com/@autogridlk"><i className="fa-brands fa-tiktok"></i></Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                         <div className={`te-header-menu-area te-sticky-header ${isSticky ? "te-sticky_menu" : ""}`}>
                            <div className="container">
                                <div className="row">

                                    <div className="col-12 d-flex align-items-center justify-content-end">
                                        <div className="te-logo-wrapper">
                                            <HeaderLogo />
                                        </div>
                                       <div className="te-menu d-lg-inline-block d-none">
                                            <MainMenu toggleSubMenu={toggleSubMenu} />
                                        </div>
                                        <div className="te-header-btn">
                                            <div className="te-cta-btn">
                                                <span>Need help?</span>
                                                <Link to="tel:+94112844722"><i className="fa-solid fa-phone"></i>+94 112 844 722</Link>
                                            </div>
                                            <div className="te-quote-btn" onClick={openQuoteModal}>GET A QUOTE<i className="fa-solid fa-arrow-right"></i></div>
                                        </div>
                                        <div className="te-mobile-menu-bar d-lg-none text-end">
                                            <Link
                                                to="#"
                                                className="te-mobile-menu-toggle-btn"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    openMenu();
                                                }}
                                            >
                                                <i className="fal fa-bars"></i>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <SideBarMenu toggleSubMenu={toggleSubMenu} closeMenu={closeMenu} isMenuActive={isMenuActive} />

            <SideBarOverlay isMenuActive={isMenuActive} handleOverlayClick={handleOverlayClick} />

            <QuoteModal isOpen={isQuoteModalOpen} onClose={closeQuoteModal} />

        </>
    );
};

export default HeaderV1;