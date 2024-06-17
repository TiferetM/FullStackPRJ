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
import Products from './components/products/Products'
import Product from './components/products/Product'
import Cart from './components/products/Cart';
import Login from './components/register/Login';
import Signup from './components/register/Signup';
import Exit from './components/register/Exit';

function App() {
  const [userIn, setUserIn] = useState("guest");
  const navigate = useNavigate();
  const location = useLocation();
  const publicKey ="MIIBCgKCAQEA7Q3e7c97O+q6RU2KJd4JcWmVJ+4NZl1QK/qkYZwrayZjJygjLNL+X7KgImFvSRHt0y5UMLGp9d7mP6Jw7OFO/sWf+p/jz0TAenld7Fv8v6piCciJ7D3SPUQc0GT4L/A7U/z+tZ9QXh4C4MJZaXak0t9QJcZtEdPUnxdJ/4D+T+VrGfXRU8bhVVZj5bwK6mOAzY9eDFe8k3fLriNf3Rt5x1/qfgzv1fKkExfS+aI+V7R6FFAL3P8LoSD2W7jW5y7/s91uQ4odE7XhYHHTth42gPb58FttGbqBFWKlJ5dFgOfuK1BOGrrJYRtldhnO/yN8D7XnXBS0ezlEpMRR0FeUowIDAQAB";
  const data = JSON.stringify({
    "username": "guest",
    "passwordHash": "w3l0v3gu3sts"
  });
  const encodedData = new TextEncoder().encode(data);
  let encryptedToken; 
  window.crypto.subtle.encrypt({
    name: "RSA-OAEP",
  }, publicKey, encodedData).then((encrypted) => {
    encryptedToken = new Uint8Array(encrypted);
  });
  useEffect(() => {
    let origionalPath = location.pathname;
    //if there is no user in the session storage, set the user to guest
    if (!sessionStorage.getItem('currentUser')) {
      alert("problem accured, please try again later.");
      sessionStorage.setItem('currentUser', "guest");
      sessionStorage.setItem('token', encryptedToken);
      // Encrypt the token with the public key
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
        sessionStorage.setItem('token', encryptedToken);
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

        <Route path="products">
            <Route index element={<Products userIn={userIn} />} />
            <Route path=":id_p" element={<Product />} />
            <Route path="cart" element={<Cart />} /> {/* Add Cart route */}
          </Route>
      </Route>
      <Route path="/login" element={<Login publicKey={publicKey} setUserIn={setUserIn}/>} />
      <Route path="/signup" element={<Signup publicKey={publicKey} setUserIn={setUserIn}/>} />
      <Route path="/exit" element={<Exit setUserIn={setUserIn} />} />
      <Route path="*" element={<h1>404: Page Not Found</h1>} />
    </Routes>
  </>
)
}

export default App
