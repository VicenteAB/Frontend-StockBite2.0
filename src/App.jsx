import { Routes, Route } from 'react-router-dom'
import Navbar from "./components/Navbar"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Layout from './components/Layout'
import Restaurante from './pages/RestauranteDetalle'
import RestauranteDetalle from './pages/RestauranteDetalle'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={
          <Layout>
            <Home />
          </Layout>
        } />
        <Route path="/restaurante/:id" element={
          <Layout>
            <RestauranteDetalle/>
          </Layout>
        } />
      </Routes>
    </div>
  )
}

export default App
