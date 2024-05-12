import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <header>
        <NavBar />
      </header>
      <Routes >
        <Route path="">
          <Route index element={<Welcome />} />
          <Route path="login" element={<LogIn />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="/:id">
          <Route index element={<Home />} />
          <Route path="info" element={<Info />} />
          <Route path="exit" element={<ExitPage />} />
          <Route path="todos" element={<Todos />} />
          <Route path="albums" >
            <Route index element={<Albums />} />
            <Route path=":albumId" element={<AlbumMain />} />
          </Route>
          <Route path="posts">
            <Route index element={<Posts />} />
            <Route path=":postId" element={<PostMain />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
