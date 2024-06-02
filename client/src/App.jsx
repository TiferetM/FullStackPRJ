import './App.css'
import React, { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './components/Home'
import About from './components/About'
import Designs from './components/designs/Designs'
import Design from './components/designs/Design'
import Articles from './components/articles/Articles'
import Article from './components/articles/Article';
import U_Home from './components/user/Home';
import NewDesign from './components/designs/newDesign/CreateDesign'
import NewArticle from './components/articles/newArticle/CreateArticle'
import Settings from './components/user/Settings'
import Products from './components/products/Products'
import Product from './components/products/Product'

function App() {
  const [userIn, setUserIn] = useState("guest");
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    let origionalPath = location.pathname;
    //if there is no user in the session storage, set the user to guest
    if (!sessionStorage.getItem('currentUser')) {
      alert("problem accured, please try again later.");
      sessionStorage.setItem('currentUser', "guest");
      setUserIn("guest");
      navigate("/guest");
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
        setUserIn("guest");
        sessionStorage.setItem('currentUser', "guest");
        navigate(origionalPath.replace(/[^/]+/, json));
      }
    }
  },[]);
return (
  <>
    <header>
      <NavBar userIn={userIn} />
    </header>
    <Routes >
      <Route path="/:id_u">
        <Route index element={<U_Home />} />
        <Route path="home" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="designs">
          <Route index element={<Designs />} />
          <Route path=":id_d" element={<Design />} />
          <Route path="new" element={<NewDesign />} />
        </Route>
        <Route path="articles">
          <Route index element={<Articles />} />
          <Route path=":id_a" element={<Article />} />
          <Route path="new" element={<NewArticle />} />
        </Route>
        <Route path="settings" element={<Settings />} />
        <Route path="products" >
          <Route index element={<Products />} />
          <Route path=":id_p" element={<Product />} />
        </Route>
      </Route>
    </Routes>
  </>
)
}

export default App
