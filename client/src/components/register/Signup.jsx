import React from 'react'
import { Link } from 'react-router-dom'
import {sha512} from 'js-sha512'
import './css/css.css'

function Signup() {
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(e.target);
        Array.from(e.target).forEach((input) => {
            if (input.tagName=="INPUT"&& !input.value) {
              input.style.border = "1px solid red";
            } else {
              input.style.border = ""; // Reset the border if the input has a value
            }
          });
        await fetch("http://localhost:3305/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: e.target[0].value,
                email: e.target[1].value,
                passwordHash: sha512(e.target[2].value)
            })
        }).then(res => {
            return res.json()
        }).then(data => {
            console.log(data)
        }).catch(err => {
            console.log(err)
        })
    }
  return (
    <div>
        <h5>Join our platform</h5>
        <h4> sign and D-sign! </h4>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Username" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <input type="password" placeholder="Confirm Password" />
            <button type="submit">Signup</button>
            <Link to="/login">Already have an account? login here</Link>
        </form>
    </div>
  )
}

export default Signup