import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import navlinks from '../data/hoverNavLinks.js'
import './css/NavBar.css'
import HoverNav from './HoverNav';
import logo from '../images/logo_min.png';
import '@fortawesome/fontawesome-free/css/all.css';
import ProfilePicture from './user/ProfilePicture.jsx';

function NavBar({ userIn }) {
    const [hoverNav, setHoverNav] = useState({ show: false, coordination: { x: 0, y: 0 }, links: {} });
    const [imgUrl, setImgUrl] = useState('');  
    let hideTimeout;
    
    const handleMouseEnter = (e) => {
        clearTimeout(hideTimeout);
        const target = e.currentTarget;
        const title = target.href.split("/").length == 4 ? "Settings" : target.innerText;
        const links = navlinks(userIn, title);
        if (target.tagName !== "A" || links == null || Object.keys(links).length === 0) return;
        let coord = target.getBoundingClientRect();
        setHoverNav({
            show: true,
            coordination: { x: coord.left, y: coord.bottom },
            links: { ...links }
        });
    };

    const handleMouseLeave = (e) => {
        hideTimeout = setTimeout(() => {
            setHoverNav(cur => ({ ...cur, show: false }));
        }, 200);
    };

    return (
        <nav className='mainNav'>
            <NavLink to={`/${userIn}`} onMouseEnter={e => handleMouseEnter(e)} onMouseLeave={e => handleMouseLeave(e)}><ProfilePicture user={userIn} userIn={userIn}/></NavLink>
            <NavLink to={`/${userIn}/home`} onMouseEnter={e => handleMouseEnter(e)} onMouseLeave={e => handleMouseLeave(e)}><img src={logo} /></NavLink>
            <NavLink to={`/${userIn}/about`} onMouseEnter={e => handleMouseEnter(e)} onMouseLeave={e => handleMouseLeave(e)}>About</NavLink>
            <NavLink to={`/${userIn}/designs`} onMouseEnter={e => handleMouseEnter(e)} onMouseLeave={e => handleMouseLeave(e)}>Designs</NavLink>
            <NavLink to={`/${userIn}/articles`} onMouseEnter={e => handleMouseEnter(e)} onMouseLeave={e => handleMouseLeave(e)}>Articles</NavLink>
            <NavLink to={`/${userIn}/products`} onMouseEnter={e => handleMouseEnter(e)} onMouseLeave={e => handleMouseLeave(e)}>Products</NavLink>
            {hoverNav.show && <HoverNav coordination={hoverNav.coordination} links={hoverNav.links} onMouseEnter={e => handleMouseEnter(e)} onMouseLeave={e => handleMouseLeave(e)} />}
        </nav>
    )
}

export default NavBar