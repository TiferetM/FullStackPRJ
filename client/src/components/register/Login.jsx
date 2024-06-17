import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './css/css.css'
function Login({ userIn, setUserIn}) {
    const navigate = useNavigate()  
    const handleSubmit = async (e) => {
        e.preventDefault()
        await fetch("http://localhost:3305/login", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            sessionStorage.setItem("token", JSON.stringify(res.headers.get("Authorization")));
            return res.json()
        }).then(async data => {
            sessionStorage.setItem("currentUser", JSON.stringify(data.username));
            await setUserIn(data.username);
            navigate(`/${userIn}`)
        }).catch(err => {
            console.log(err)
        })
    }
    return (
        <div>
            <h1>Login</h1>
            <p>Log in to your account</p>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" />
                <input type="password" placeholder="Password" />
                <button type="submit">Login</button>
                <Link to="/signup">Don't have an account? sign up here</Link>
            </form>
        </div>
    )
}

export default Login