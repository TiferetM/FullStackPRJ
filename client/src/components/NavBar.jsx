import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import navlinks from '../data/hoverNavLinks.js'
import './css/NavBar.css'
import HoverNav from './HoverNav';

function NavBar({ userIn }) {
    const [hoverNav, setHoverNav] = useState({ show: false, coordination: { x: 0, y: 0 }, links: {} });
    const handleHover = e => {
        const target = e.currentTarget;
        e.preventDefault();
        const links = navlinks(userIn, target.innerText);
        if (target.tagName != "A" || Object.keys(links).length === 0) return;
        let coord = target.getBoundingClientRect();
        setHoverNav(cur => {
            return {
                show: !cur.show,
                coordination: { x: coord.left, y: coord.bottom },
                links: { ...links }
            }
        });
    }

    return (
        <nav className='mainNav'>
            <NavLink to={`/${userIn}`} onMouseOver={e => handleHover(e)} onMouseLeave={e => handleHover(e)}>p.pic</NavLink>
            <NavLink to={`/${userIn}/home`} onMouseOver={e => handleHover(e)} onMouseLeave={e => handleHover(e)}>D-home</NavLink>
            <NavLink to={`/${userIn}/about`} onMouseOver={e => handleHover(e)} onMouseLeave={e => handleHover(e)}>About</NavLink>
            <NavLink to={`/${userIn}/designs`} onMouseOver={e => handleHover(e)} onMouseLeave={e => handleHover(e)}>Designs</NavLink>
            <NavLink to={`/${userIn}/articles`} onMouseOver={e => handleHover(e)} onMouseLeave={e => handleHover(e)}>Articles</NavLink>
            <NavLink to={`/${userIn}/products`} onMouseOver={e => handleHover(e)} onMouseLeave={e => handleHover(e)}>Products</NavLink>
            {hoverNav.show && <HoverNav coordination={hoverNav.coordination} links={hoverNav.links} />}
        </nav>
    )
}

export default NavBar