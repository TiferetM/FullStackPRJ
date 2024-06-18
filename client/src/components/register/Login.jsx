import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { sha512 } from 'js-sha512'
import './css/css.css'
function Login({ userIn, setUserIn}) {
    const navigate = useNavigate()  
    const handleSubmit = async (e) => {
        e.preventDefault()
        await fetch("http://localhost:3305/login", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            params: {
                username: e.target[0].value,
                passwordHash: sha512(e.target[1].value)
            }
        }).then(res => {
            console.log(res.headers.get("Authorization"))
            sessionStorage.setItem("token", JSON.stringify(res.headers.get("Authorization")));
            return res.json()
        }).then(async data => {
            sessionStorage.setItem("currentUser", JSON.stringify(e.target[0].value));
            await setUserIn(e.target[0].value);
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