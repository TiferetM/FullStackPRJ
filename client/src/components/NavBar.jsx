import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import navlinks from '../data/hoverNavLinks.js'
import './css/NavBar.css'
import HoverNav from './HoverNav';

function NavBar({ userIn }) {
    const [hoverNav, setHoverNav] = useState({ show: false, coordination: { x: 0, y: 0 }, links: {} });
    let hideTimeout;

    const handleMouseEnter = (e) => {
        clearTimeout(hideTimeout);
        const target = e.currentTarget;
        const links = navlinks(userIn, target.innerText);
        if (target.tagName !== "A" || Object.keys(links).length === 0) return;
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
            <NavLink to={`/${userIn}`} onMouseEnter={e => handleMouseEnter(e)} onMouseLeave={e => handleMouseLeave(e)}>p.pic</NavLink>
            <NavLink to={`/${userIn}/home`} onMouseEnter={e => handleMouseEnter(e)} onMouseLeave={e => handleMouseLeave(e)}>D-home</NavLink>
            <NavLink to={`/${userIn}/about`} onMouseEnter={e => handleMouseEnter(e)} onMouseLeave={e => handleMouseLeave(e)}>About</NavLink>
            <NavLink to={`/${userIn}/designs`} onMouseEnter={e => handleMouseEnter(e)} onMouseLeave={e => handleMouseLeave(e)}>Designs</NavLink>
            <NavLink to={`/${userIn}/articles`} onMouseEnter={e => handleMouseEnter(e)} onMouseLeave={e => handleMouseLeave(e)}>Articles</NavLink>
            <NavLink to={`/${userIn}/products`} onMouseEnter={e => handleMouseEnter(e)} onMouseLeave={e => handleMouseLeave(e)}>Products</NavLink>
            {hoverNav.show && <HoverNav coordination={hoverNav.coordination} links={hoverNav.links} onMouseEnter={e => handleMouseEnter(e)} onMouseLeave={e => handleMouseLeave(e)}/>}
        </nav>
    )
}

export default NavBar