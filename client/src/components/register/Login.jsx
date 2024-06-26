import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { sha512 } from 'js-sha512'
import './css/css.css'
function Login({ userIn, setUserIn }) {
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const username = e.target[0].value;
        const passwordHash = sha512(e.target[1].value);

        const url = new URL("http://localhost:3305/login");
        url.search = new URLSearchParams({
            username: username,
            passwordHash: passwordHash
        }).toString();

        await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
                sessionStorage.setItem("token", JSON.stringify(res.headers.get("Authorization")));
                sessionStorage.setItem("role", JSON.stringify(res.headers.get("Role")));

                return res.json()
            }).then(async data => {
                sessionStorage.setItem("currentUser", JSON.stringify(username));
                await setUserIn(username);
                navigate(`/${username}`)
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