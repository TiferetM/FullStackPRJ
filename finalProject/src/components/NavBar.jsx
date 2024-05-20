import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

function NavBar() {
    const [userIn, setUserIn] = useState("guest");
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
    return (
        <nav>
            <NavLink to={`/${userIn}`}>p.pic</NavLink>
            <p>D-home</p>
            <NavLink to={`/${userIn}/home`}>Home</NavLink>
            <NavLink to={`/${userIn}/about`}>About</NavLink>
            <NavLink to={`/${userIn}/designs`}>Designs</NavLink>
            <NavLink to={`/${userIn}/articles`}>Articles</NavLink>
            <NavLink to={`/${userIn}/settings`}>Settings</NavLink>
            <NavLink to={`/${userIn}/products`}>Products</NavLink>
        </nav>
    )
}

export default NavBar