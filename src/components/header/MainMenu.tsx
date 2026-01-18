import React from 'react';
import { Link, useLocation } from "react-router-dom";

type MainMenuProps = {
    toggleSubMenu: (e: React.MouseEvent<HTMLAnchorElement>) => void;
};

const MainMenu = ({ toggleSubMenu }: MainMenuProps) => {
    const location = useLocation();
    
    const isActive = (path: string) => {
        if (path === '/') {
            return location.pathname === '/';
        }
        // For service-details, check if pathname starts with /service-details
        if (path.startsWith('/service-details')) {
            return location.pathname.startsWith('/service-details');
        }
        return location.pathname === path || location.pathname.startsWith(path + '/');
    };

    return (
        <>
            <nav id="main-menu" className="te-main-menu">
                <ul className='te-main-list'>
                    <li className={isActive('/') ? 'te-active' : ''}>
                        <Link to="/">Home</Link>
                    </li>

                    <li className={isActive('/about') ? 'te-active' : ''}><Link to="/about">About Us</Link></li>
                    <li className={isActive('/service-details') ? 'te-active' : ''}>
                       <Link to="/service-details/1">Service</Link>
                    </li>
                    <li className={isActive('/projects') ? 'te-active' : ''}>
                        <Link to="/projects">Our Jobs</Link>
                    </li>
                    {/* <li className="te-dropdown">
                        <Link to="/blog" onClick={toggleSubMenu} className='dropdown-expand'>Blog</Link>
                        <ul className="te-submenu">
                            <li className='te-list-item'><Link to="/blog">Blog Page</Link></li>
                            <li className='te-list-item'><Link to="/blog-details/1">Blog Details Page</Link></li>
                        </ul>
                    </li> */}
                    <li className={isActive('/team') ? 'te-active' : ''}>
                        <Link to="/team">Team</Link>
                    </li>
                    <li className={isActive('/contact') ? 'te-active' : ''}><Link to="/contact">Contact</Link></li>
                </ul>
            </nav>
        </>
    );
};

export default MainMenu;