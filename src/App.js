import './App.css'
import Navbar from './components/navbar/navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

export default function App() {
  const links = [
    {name: 'home', path: '/'}, 
     {name: 'blog', path: '/blog'}, 
    {name: 'laboratory', path: '/laboratory'},
    {name: 'about', path: '/about'}, 
    {name: 'contact', path: '/contact'}
  ]

  return (
    <BrowserRouter>
      <div className='wrapper'>
        <Navbar links={links} />
        <div className="p-4">
          <Routes>
            <Route path="/" element={<h1>Home</h1>} />
            <Route path="/blog" element={<h1>Blog</h1>} />
            <Route path="/laboratory" element={<h1>laboratory</h1>} />
            <Route path="/about" element={<h1>About</h1>} />
            <Route path="/contact" element={<h1>Contact</h1>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}