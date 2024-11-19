import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <>
      <div className="nav-box p-3">
            <Link to="/" className='nav-item'>Home</Link>
            <Link to="/addProduct" className='nav-item'>Add Product</Link>
            <Link to="/store" className='nav-item'>Store</Link>
      </div>
    </>
  )
}

export default Navbar
