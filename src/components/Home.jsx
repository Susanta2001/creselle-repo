import React, { useState } from 'react';
import Offcanvas from './Offcanvas';
import logo from '../images/logo.png';
import bannerBtnOne from '../images/banner-btn-one.png';
import bannerBtnTwo from '../images/banner-btn-two.png';
import bannerBtnThree from '../images/banner-btn-three.png';

function Home() {
    const [bannerImg, setBannerImg] = useState(bannerBtnOne);
    const [bgColor, setBgColor] = useState('radial-gradient(circle, #d9d9d9 0%, #3d8228 60%)');
    const [fadeClass, setFadeClass] = useState('');

    const bannerChange = (newBannerImg, color) => {
        setFadeClass('fade-out');

        setTimeout(() => {
            setBannerImg(newBannerImg);
            setBgColor(color);
            setFadeClass('');
        }, 500);
    };

    return (
        <>
            <div className="container-fluid p-4" >
                {/* the banner is starting from here */}
                <div className="banner-outer" style={{ background: bgColor }}>
                    <div className="logo-container d-flex align-items-center">
                        <button className="btn off-canvas-btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop">
                            <i className='bx bx-menu text-light'></i>
                        </button>
                        <div className="logo d-inline-block" style={{ width: '200px', height: '100px' }}>
                            <img src={logo} alt="Logo" className='mt-1' style={{ width: '100%', height: '100px', objectFit: "cover" }} />
                        </div>
                    </div>

                    <div className="px-5 banner-inner">
                        <div className="inner-text d-flex flex-column" style={{ width: '30%' }}>
                            <p className='head-text'>Traditional</p>
                            <p className='support-text'>Experience the essence of elegance and luxury with CRESELLE.</p>
                            <p className='offer-text'>Get your first order with free delivery.</p>
                            <button className='border purchase-btn p-2'>Buy Now</button>
                        </div>
                        <div className="inner-img" style={{ width: '40%' }}>
                            <img src={bannerImg} alt="Banner" className={`banner-img ${fadeClass}`} />
                        </div>
                        <div className="inner-btns d-flex flex-column justify-content-around align-items-end" style={{ width: '30%' }}>
                            <div style={{ backgroundColor: '#6DEE66' }} onClick={() => bannerChange(bannerBtnOne, 'radial-gradient(circle, #d9d9d9 0%, #3d8228 60%)')}>
                                <img src={bannerBtnOne} alt="Banner Button One" />
                            </div>
                            <div style={{ backgroundColor: '#DFBAD3' }} onClick={() => bannerChange(bannerBtnTwo, 'radial-gradient(circle, #DFBAD3 0%, #FF69B4 60%)')}>
                                <img src={bannerBtnTwo} alt="Banner Button Two" />
                            </div>
                            <div style={{ backgroundColor: '#5E39E3' }} onClick={() => bannerChange(bannerBtnThree, 'radial-gradient(circle, #5E39E3 0%, #4B0082 60%)')}>
                                <img src={bannerBtnThree} alt="Banner Button Three" />
                            </div>
                        </div>
                    </div>
                </div>
                <Offcanvas />
                {/* DANGER - DO NOT TOUCH THESE TWO DIV */}
                <div className="design-card top-right-card position-absolute"></div>
                <div className="bottom-left-card position-absolute"></div>
                {/* banner ends here */}

                 {/* offer section starts from here */}
                 <div className="offer-section d-flex flex-column align-items-center" style={{marginTop:'5rem'}}>
                    <p style={{ fontFamily: 'Josefin Sans, serif', fontSize: '24px' }}>Offers</p>
                    <p style={{ fontFamily: 'Judson, serif', fontSize: '48px' }}>Get your offers and coupons now</p>
                    {/* the cards starts from here */}
                    <div className="offer-cards d-flex justify-content-between">
                        <div className='offer-card' id="card-one">
                            {/* <img src="" alt="" /> */}
                            <div className="card-design-card"></div>
                        </div>
                        <div className='offer-card' id="card-two">
                            {/* <img src="" alt="" /> */}
                            <div className="card-design-card"></div>
                        </div>
                        <div className='offer-card' id="card-three">
                            {/* <img src="" alt="" /> */}
                            <div className="card-design-card"></div>
                        </div>
                    </div>
                </div>
                {/* offer section ends here */}
            </div>
        </>
    )
}
export default Home;

