import React from 'react';
import { Link } from "react-router-dom";

type MainMenuProps = {
    toggleSubMenu: (e: React.MouseEvent<HTMLAnchorElement>) => void;
};

const MainMenu = ({ toggleSubMenu }: MainMenuProps) => {
    return (
        <>
            <nav id="main-menu" className="te-main-menu">
                <ul className='te-main-list'>
                    <li>
                        <Link to="/">Home</Link>
                    </li>

                    <li><Link to="/about">About Us</Link></li>
                    <li>
                       <Link to="/service-details/1">Service</Link>
                    </li>
                    <li>
                        <Link to="/projects">Project</Link>
                    </li>
                    {/* <li className="te-dropdown">
                        <Link to="/blog" onClick={toggleSubMenu} className='dropdown-expand'>Blog</Link>
                        <ul className="te-submenu">
                            <li className='te-list-item'><Link to="/blog">Blog Page</Link></li>
                            <li className='te-list-item'><Link to="/blog-details/1">Blog Details Page</Link></li>
                        </ul>
                    </li> */}
                    <li>
                        <Link to="/team">Team</Link>
                    </li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>
            </nav>
        </>
    );
};

export default MainMenu;