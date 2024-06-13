import React from 'react';
import NavBar from './NavBar';
import logo from '../images/logo.png';  // נתיב יחסי נכון לתמונה

function Home() {
  return (
    <>
      <div>Home</div>
      <img src={logo} alt="home" />
    </>
  );
}

export default Home;
