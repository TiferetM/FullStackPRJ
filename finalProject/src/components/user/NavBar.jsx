import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

function NavBar() {
    const [userIn, setUserIn] = useState(0);
    const location = useLocation();
    let id;
    useEffect(() => {
        let json = sessionStorage.getItem('currentUser');
        if (json) {
            setUserIn(JSON.parse(json));
        }
        else {
            setUserIn(0);
        }
    }, [location.pathname]);
    return (
        <nav>
            <div>D-home</div>
            <NavLink to={`/${userIn}`}>Home</NavLink>
            <NavLink to={`/${userIn}/about`}>About</NavLink>
            <NavLink to={`/${userIn}/designs`}>Designs</NavLink>
            <NavLink to={`/${userIn}/articles`}>Articles</NavLink>
            <NavLink to={`/${userIn}/settings`}>Settings</NavLink>
            <NavLink to={`/${userIn}/products`}>Products</NavLink>
        </nav>
    )
}

export default NavBar