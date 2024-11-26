import React from 'react'
import '../assets/css/Signin.css'
import {Link} from 'react-router-dom'
function Sign() {
  return (
    <div className='sign-in-main d-flex align-items-center'>        
        <div className='sign-in-inner d-flex flex-column justify-content-around'>
            <div className='d-flex justify-content-center flex-column align-items-center'>
                <h2 style={{ color: 'white' }}
                > Sign in               
                </h2>
                <span>
                    Already a user?<Link to='/login' className='mx-2'>Log in </Link>
                </span>
            </div>
            <div className='d-flex flex-column ' style={{width:'80%', alignSelf:'center'}}>
            <p className='sl-user'>
                Username                
            </p>
            <input type='text'></input>
            <p className='sl-email'>
                Email
            </p>
            <input type='email'></input>
            <p className='sl-password'>
                Password
            </p>
            <input type='password'></input>
            </div>
            <div className='d-flex justify-content-center flex-column align-items-center'>
                <button id='signinB'>
                <a  href="/">Sign in</a>
                </button>
            </div>        
        </div>
    </div>
         )
}
export default Sign