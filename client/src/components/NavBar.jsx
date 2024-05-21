import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import navlinks from '../data/hoverNavLinks.js'
import './css/NavBar.css'
import HoverNav from './HoverNav';

function NavBar() {
    const [userIn, setUserIn] = useState("guest");
    const [hoverNav, setHoverNav] = useState(false);
    const location = useLocation();
    let id;
    useEffect(() => {
        let json = sessionStorage.getItem('currentUser');
        if (json) {
            setUserIn(JSON.parse(json));
        }
        else {
            setUserIn("guest");
            alert("problem accured, please try again later.")
        }
    }, [location.pathname]);

    const handleHover = e => {
        e.preventDefault();
        //if current target is not a nav link, return
        // if(e.currentTarget.)
        setHoverNav(cur=>{return{
            show: !cur.show,
            coordination: { x: e.currentTarget.style.left, y: e.currentTarget.style.bottom },
            links: { ...navlinks(userIn)[e.currentTarget.innerText]}
        }});
        console.log(hoverNav);
    }

    return (
        <nav onMouseOver={e=>handleHover(e)} onMouseLeave={e=>handleHover(e)}>
            <NavLink to={`/${userIn}`}>p.pic</NavLink>
            <p>D-home</p>
            <NavLink to={`/${userIn}/home`}>Home</NavLink>
            <NavLink to={`/${userIn}/about`}>About</NavLink>
            <NavLink to={`/${userIn}/designs`}>Designs</NavLink>
            <NavLink to={`/${userIn}/articles`}>Articles</NavLink>
            <NavLink to={`/${userIn}/settings`}>Settings</NavLink>
            <NavLink to={`/${userIn}/products`}>Products</NavLink>
            {hoverNav.show && <HoverNav coordination={hoverNav.cordination} links={hoverNav.links}/>}
        </nav>
    )
}

export default NavBar