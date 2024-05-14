import './App.css'
import { Routes, Route } from 'react-router-dom'
import NavBar from './generalComponents/NavBar'
import Home from './generalComponents/Home'
import About from './generalComponents/About'
import Designs from './generalComponents/designs/Designs'
import Design from './generalComponents/designs/Design'
import Articles from './generalComponents/articles/Articles'
import Article from './generalComponents/articles/Article';
import U_Home from './userComponents/Home';
import NewDesign from './generalComponents/designs/newDesign/CreateDesign'
import NewArticle from './generalComponents/articles/newArticle/CreateArticle'
import Settings from './userComponents/Settings'
import Products from './generalComponents/products/Products'
import Product from './generalComponents/products/Product'
import U_NavBar from './userComponents/NavBar'

function App() {
  let nav = sessionStorage.getItem('currentUser')?(<U_NavBar />):( <NavBar />);
  return (
    <>
      <header>
       {nav}
      </header>
      <Routes >
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/designs" element={<Designs />} >
          <Route path=":id_d" element={<Design />} />
        </Route>
        <Route path="/articles" element={<Articles />} >
          <Route path=":id_a" element={<Article />} />
        </Route>
        <Route path="/:id_u" element={<U_Home />} >
          <Route path="Designs" element={<Designs />} >
            <Route path=":id_d" element={<Design />} />
            <Route path="new" element={<NewDesign />} />
          </Route>
          <Route path="Articles" element={<Articles />} >
            <Route path=":id_a" element={<Article />} />
            <Route path="new" element={<NewArticle />} />
          </Route>
          <Route path="settings" element={<Settings />} />
          <Route path="products" element={<Products />} >
            <Route path=":id_p" element={<Product />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
