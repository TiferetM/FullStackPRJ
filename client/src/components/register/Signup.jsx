import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { sha512 } from 'js-sha512';
import './css/css.css';

function Signup({ setUserIn, publicKey }) {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let valid = true;
    Array.from(e.target).forEach((input) => {
      if (input.tagName === "INPUT" && !input.value) {
        input.style.border = "1px solid red";
        valid = false;
      } else {
        input.style.border = ""; // Reset the border if the input has a value
      }
    });

    if (e.target[2].value !== e.target[3].value) {
      alert('Passwords do not match');
      e.target[2].style.border = "1px solid red";
      e.target[3].style.border = "1px solid red";
      return;
    } else {
      e.target[2].style.border = "";
      e.target[3].style.border = "";
    }
    if (!valid) return;

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
      sessionStorage.setItem('currentUser', JSON.stringify(e.target[0].value));
      sessionStorage.setItem('token', res.headers.get("Authorization"));
      setUserIn(e.target[0].value);
      navigate("/" + e.target[0].value);
    }).catch(err => {
      console.log(err);
    });
  };

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
  );
}

export default Signup;