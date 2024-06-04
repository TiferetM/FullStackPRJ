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
        console.log(links);
        //if current target is not a nav link, return
        if (target.tagName != "A" || links == undefined) return;
        //if links is empty, return
        if (Object.keys(links).length === 0) return;
        //getBoundingClientRect returns the size of an element and its position relative to the viewport
        // and its a function made by the browser
        //the object returned will have the properties: x, y, width, height, top, right, bottom, left
        //and to set those properties to the coordination object, we will use the spread operator
        //and the command to set the properties target.set.style = {...getBoundingClientRect()} will not work
        //because the object returned by getBoundingClientRect() is read-only
        //so we will have to set the properties individually
        //like this: target.style.left = `${coord.x}px`
        //and this: target.style.bottom = `${coord.y}px`
        let coord = target.getBoundingClientRect();
        setHoverNav(cur => {
            return {
                show: !cur.show,
                coordination: { x: coord.left, y: coord.bottom },
                //links will be an object with the key being the text of the current target and the value being the link
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