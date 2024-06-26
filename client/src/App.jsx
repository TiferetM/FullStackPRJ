import './App.css'
import React, { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './components/Home'
import About from './components/About'
import Designs from './components/designs/Designs'
import Design from './components/designs/Design'
import Articles from './components/articles/Articles'
import U_Home from './components/user/Home';
import NewDesign from './components/designs/newDesign/CreateDesign'
import NewArticle from './components/articles/newArticle/CreateArticle'
import Products from './components/products/Products'
import Product from './components/products/Product'
import Cart from './components/products/Cart';
import Login from './components/register/Login';
import Signup from './components/register/Signup';
import Exit from './components/register/Exit';
import FullArticle from './components/articles/FullArticle'
import Settings from './components/user/Settings'

function App() {
  const [userIn, setUserIn] = useState("guest");
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    let origionalPath = location.pathname;
    //if there is no user in the session storage, set the user to guest
    if (!sessionStorage.getItem('currentUser')) {
      signGuest();
    }
    else {
      let json = sessionStorage.getItem('currentUser');
      //if the user is not guest, set the user to the user in the session storage
      if (json != "guest") {
        setUserIn(JSON.parse(json));
        navigate(origionalPath.replace(/[^/]+/, JSON.parse(json)));
      }
      //if the user is guest, set the user to guest
      else {
        signGuest();
      }
    }
  }, []);
  const signGuest = async () => {
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
      setUserIn(data.username);
      navigate(`/${data.username}`)
    }).catch(err => {
      console.log(err)
    })
  }
  return (
    <>
      <header>
        <NavBar userIn={userIn} />
      </header>
      <Routes >
        <Route path="/:id_u">
          <Route index element={<U_Home userIn={userIn} />} />
          <Route path="info" element={<Settings userIn={userIn} />} />
          <Route path="home" element={<Home userIn={userIn} />} />
          <Route path="about" element={<About userIn={userIn} />} />
          <Route path="designs">
            <Route index element={<Designs userIn={userIn} />} />
            <Route path=":id_d" element={<Design userIn={userIn} />} />
            <Route path="new" element={<NewDesign userIn={userIn} />} />
          </Route>
          <Route path="articles">
            <Route index element={<Articles userIn={userIn} />} />
            <Route path=":id_a" element={<FullArticle userIn={userIn} />} />
            <Route path="new" element={<NewArticle userIn={userIn} />} />
            <Route path="me" element={<Articles userIn={userIn} />} />
            <Route path="friends" element={<Articles userIn={userIn} />} />
            <Route path="stared" element={<Articles userIn={userIn} />} />
          </Route>
          <Route path="products">
            <Route index element={<Products userIn={userIn} />} />
            <Route path=":id_p" element={<Product userIn={userIn} />} />
            <Route path="cart" element={<Cart userIn={userIn} />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login setUserIn={setUserIn} />} />
        <Route path="/signup" element={<Signup setUserIn={setUserIn} />} />
        <Route path="/exit" element={<Exit setUserIn={setUserIn} />} />
        <Route path="*" element={<h1>404: Page Not Found</h1>} />
      </Routes>
    </>
  )
}

export default App
