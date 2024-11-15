import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <>
      <div className="nav-box p-3">
            <Link to="/" className='nav-item'>Home</Link>
            <Link to="/shop" className='nav-item'>Shop</Link>
            <Link to="/cart" className='nav-item'>Cart</Link>
      </div>
    </>
  )
}

export default Navbar
