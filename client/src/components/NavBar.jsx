import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import './css/NavBar.css'
import HoverNav from './HoverNav';

function NavBar() {
    const [userIn, setUserIn] = useState("guest");
    // const [hoverNav, setHoverNav] = useState(false);
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

    // onHover = () => {
    //     setHoverNav(!hoverNav);
    // }

    return (
        <nav >
            <NavLink to={`/${userIn}`}>p.pic</NavLink>
            <p>D-home</p>
            <NavLink to={`/${userIn}/home`}>Home</NavLink>
            <NavLink to={`/${userIn}/about`}>About</NavLink>
            <NavLink to={`/${userIn}/designs`}>Designs</NavLink>
            <NavLink to={`/${userIn}/articles`}>Articles</NavLink>
            <NavLink to={`/${userIn}/settings`}>Settings</NavLink>
            <NavLink to={`/${userIn}/products`}>Products</NavLink>
            {/* {hoverNav && <HoverNav cordination={hoverNav.cordination} links={hoverNav.links}/>} */}
        </nav>
    )
}

export default NavBar