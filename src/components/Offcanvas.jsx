import React from 'react'
import { Link } from 'react-router-dom'
import '../assets/css/Offcanvas.css'
function Offcanvas() {
    return (
        <>
            <div className="offcanvas offcanvas-start" data-bs-backdrop="static" tabindex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel">
                <div className="offcanvas-header">
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <button className='bg-dark  text-light w-100 p-2 mb-2'>
                        <Link to="/login" target='_blank' className='user-page-link'>Login</Link>
                    </button>
                    <button className='bg-dark text-light w-100 p-2 mb-2'>
                        <Link to="/signin" target='_blank' className='user-page-link'>Signin</Link>
                    </button>
                </div>
            </div>
        </>
    )
}

export default Offcanvas
