import React from 'react'

function Footer() {
  return (
    <>
      <div className="container-fluid footer-container p-4" style={{backgroundColor:"#d9d9d9"}}>
        {/* row starts from here */}
            <div className="row h-100">
                {/* this is the first column */}
                <div className="col-lg-2 col-md-2 col-sm-4 d-flex flex-column justify-content-center h-100">
                    <h2 className='text-right'>CRESELLE</h2>
                    <p>We offer you fashion which will make you say, "Oh Wow"</p>
                </div>
                {/* this is the second column */}
                <div className="col-lg-2 col-md-2 col-sm-4 d-flex flex-column align-items-start">
                    <h5>Bags</h5>
                    <ul className='list-unstyled d-flex flex-column justify-content-between h-100'>
                        <li><a href="/">Tote Bags</a></li>
                        <li><a href="/">Backpacks</a></li>
                        <li><a href="/">Crossbody Bags</a></li>
                        <li><a href="/">Laptop Bags</a></li>
                        <li><a href="/">Duffle Bags</a></li>
                        <li><a href="/">Shoulder Bags</a></li>
                    </ul>
                </div>
                {/* this is the third column */}
                <div className="col-lg-2 col-md-2 col-sm-4">
                <h5>Accessories</h5>
                    <ul className='list-unstyled d-flex flex-column'>
                        <li><a href="/">Bottle Tux & Coasters</a></li>
                        <li><a href="/">Wallet</a></li>
                        
                    </ul>
                </div>
                {/* this is the fourth column */}
                <div className="col-lg-2 col-md-2 col-sm-4">
                <h5>Explore</h5>
                    <ul className='list-unstyled d-flex flex-column'>
                        <li><a href="/">Home</a></li>
                        <li><a href="/">Our Story</a></li>
                        <li><a href="/">Contact Us</a></li>
                        
                    </ul>
                </div>
                {/* this is the fifth column */}
                <div className="col-lg-2 col-md-2 col-sm-4">
                <h5>Legal</h5>
                    <ul className='list-unstyled d-flex flex-column'>
                        <li><a href="/">Return and Refund Policy</a></li>
                        <li><a href="/">Privacy Policy</a></li>
                        <li><a href="/">Shippign and Delivery Policy</a></li>
                        <li><a href="/">Terms of Services</a></li>
                        
                    </ul>
                </div>
                {/* this is the sixth column */}
                <div className="col-lg-2 col-md-2 col-sm-4">
                <h5>Address</h5>
                    <ul className='list-unstyled d-flex flex-column'>
                        <li>Office: Champasari, Siliguri</li>
                        <li><a href="/">Contact: 7429082232</a></li>
                        <li><a href="/">Email: info@creselle.com</a></li>
                        
                        
                    </ul>
                </div>
            </div>
            {/* row ends here */}
            <div className="row mt-5 border-bottom pb-3">
                <div className="col-lg-6 col-md-6 col-sm-6 d-flex">
                    <input className='px-3' type="email" name="email" id="email" placeholder='Enter your email' />
                    <button className='bg-dark text-light px-4 py-2'>Submit</button>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 d-flex justify-content-end social-footer">
                <i class='bx bxl-facebook'></i>
                <i class='bx bxl-instagram' ></i>
                <i class='bx bx-envelope' ></i>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6"></div>
            </div>
            <div className="text-center pt-3">All rights reserved by Creselle 2024</div>
      </div>
    </>
  )
}

export default Footer
