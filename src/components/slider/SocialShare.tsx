import React from 'react';
import { Link } from "react-router-dom";

const SocialShare = () => {
    return (
        <>
            <Link to="https://www.facebook.com/autogridlk" target='_blank'><i className="fa-brands fa-facebook-f"></i></Link>
            <Link to="https://www.instagram.com/autogridlk/" target='_blank'><i className="fa-brands fa-instagram"></i></Link>
            <Link to="https://wa.me/94768950179" target='_blank'><i className="fa-brands fa-whatsapp"></i></Link>
            <Link to="https://www.tiktok.com/@autogridlk" target='_blank'><i className="fa-brands fa-tiktok"></i></Link>
        </>
    );
};

export default SocialShare;