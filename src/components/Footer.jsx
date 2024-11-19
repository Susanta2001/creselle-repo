import React from 'react'

function Footer() {
  return (
    <>
      <div className="container-fluid footer-container p-4" style={{backgroundColor:"#d9d9d9", marginTop:'4rem'}}>
        {/* row starts from here */}
            <div className="row h-100">
                {/* this is the first column */}
                <div className="col-lg-2 col-md-2 col-sm-4 d-flex flex-column justify-content-center h-100">
                    <h2 className='text-right'>CRESELLE</h2>
                    <p className='footer-hero-p'>We offer you fashion which will make you say, "Oh Wow"</p>
                </div>
                {/* this is the second column */}
                <div className="col-lg-2 col-md-2 col-sm-4 d-flex flex-column align-items-start">
                    <h5>Varieties</h5>
                    <ul className='list-unstyled d-flex flex-column justify-content-between h-100'>
                        <li><a href="/">Saree</a></li>
                        <li><a href="/">Lahenga</a></li>
                        <li><a href="/">Kurti</a></li>
                        <li><a href="/">Choli Ghagra</a></li>
                        <li><a href="/">Salwar Kameez</a></li>
                        <li><a href="/">Chunni / Duppata</a></li>
                    </ul>
                </div>
                {/* this is the third column */}
                <div className="col-lg-2 col-md-2 col-sm-4">
                <h5>Additional</h5>
                    <ul className='list-unstyled d-flex flex-column'>
                        <li><a href="/">Blouse</a></li>
                        <li><a href="/">Nets</a></li>
                        
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
            <div className="text-center pt-3">All rights reserved by Creselle 2024 | Developed by SRT Global Solutions</div>
      </div>
    </>
  )
}

export default Footer
