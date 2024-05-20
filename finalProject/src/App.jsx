import './App.css'
import { Routes, Route } from 'react-router-dom'
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
import U_NavBar from './components/NavBar'

function App() {
  let nav = sessionStorage.getItem('currentUser') == "guest" ? (<NavBar />) : (<U_NavBar />);
  return (
    <>
      <header>
        {nav}
      </header>
      <Routes >
        <Route path="/:id_u">
          <Route index element={<U_Home />} />
          <Route pzath="home" element={<Home />} />
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
