import React, { useState } from 'react';
import Offcanvas from './Offcanvas';
import logo from '../images/logo.png';
import bannerBtnOne from '../images/banner-btn-one.png';
import bannerBtnTwo from '../images/banner-btn-two.png';
import bannerBtnThree from '../images/banner-btn-three.png';
import offerOne from '../images/offer-card-one.jpg'
import offerTwo from '../images/offer-card-two.jpg'
import offerThree from '../images/offer-card-three.jpg'

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
                </div>

                {/* offer section starts from here */}
                <div className="offer-section d-flex flex-column align-items-center container-fluid p-4" style={{ marginTop: '4rem' }}>
                    <p style={{ fontFamily: 'Josefin Sans, serif', fontSize: '24px' }}>Offers</p>
                    <p style={{ fontFamily: 'Judson, serif', fontSize: '48px' }}>Get your offers and coupons now</p>
                    {/* the cards starts from here */}
                    <div className="offer-cards d-flex justify-content-between" style={{ marginTop: '4rem' }}>
                        <div className='offer-card' id="card-one">
                            <img src={offerOne} alt="" />
                            <p>Get 30% discount on all products</p>
                            <div className="card-design-card"></div>
                        </div>
                        <div className='offer-card' id="card-two">
                            <img src={offerTwo} alt="" />
                            <p>Get 30% discount on all products</p>
                            <div className="card-design-card"></div>
                        </div>
                        <div className='offer-card' id="card-three">
                            <img src={offerThree} alt="" />
                            <p>Get 30% discount on all products</p>
                            <div className="card-design-card"></div>
                        </div>
                    </div>
                </div>
                {/* offer section ends here */}
                {/* transformed offer section comes from here */}
            <div className="transformed-section d-flex flex-column">
                    <div className="first-section-outer bg-dark">
                        <div className="first-section d-flex  align-items-center text-light">
                            <span>Saree</span>
                            <span>Kurti</span>
                            <span>Lahenga</span>
                            <span>Salwar Kameez</span>
                            <span>Anarkali Suits</span>
                            <span>Frocks</span>
                            <span>Choli</span>
                        </div>
                    </div>
                    <div className="second-section-outer">
                        <div className="second-section">
                            <span>10% off on all saree</span>
                            <span>30% cashback on every purchases</span>
                            <span>15% additional off on IDFC Credit Card</span>
                        </div>
                    </div>
                </div>

                {/* about and categories section starts from here */}
                <div className="categories-section container-fluid p-4">
                    <div className="upper-container d-flex justify-content-between">
                        <div className="check-out-box bg-dark position-relative box-shadows">

                            <div className=' box-texts d-flex flex-column '>
                                <h2 className='box-header'>Welcome to Creselle shop now from our varied categories</h2>
                                <p>Discover Tradition, Shop by Essence – Your Journey Through India's Heritage Begins Here. Uncover handpicked treasures crafted with authenticity and passion.</p>
                                <button className='purchase-btn border p-2'>Check Out Shop</button>
                            </div>
                        </div>
                        <div className="support-box d-flex flex-column justify-content-between">
                            <div className="number-one bg-dark box-shadows">
                                <p>Shop fancy sarees</p>
                            </div>
                            <div className="number-two bg-dark box-shadows">
                                <p>Shop Lahenga's</p>
                            </div>
                        </div>
                    </div>
                    <div className="lower-container d-flex justify-content-between mt-5">
                        <div className="about-section">
                            <h1>About Creselle - Who Are We?</h1>
                            <p>Creslle brings India’s rich heritage to you with authentic, artisan-made products. Celebrate timeless craftsmanship and culture through our curated, quality collection.</p>
                        </div>
                        <div className="support-box d-flex justify-content-between" style={{ width: '75%' }}>
                            <div className="number-three bg-dark box-shadows mx-2">
                                <p>Shop Kurti's</p>
                            </div>
                            <div className="number-four bg-dark box-shadows mx-2">
                                <p>Shop Indo-Weestern Gowns</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* about and categories section ends here */}

                {/* trending section starts from here */}
                <div className="container-fluid p-4">
                    <div className="upper-container w-100">
                        <div className="d-flex justify-content-between align-items-center">
                        <p className='w-50' id='trending-word'>Trending</p>
                        <div className="categories w-50 d-flex align-items-center justify-content-between">
                            <p className='categories-active'>Saree</p>
                            <p>Kurti</p>
                            <p>Salwar</p>
                            <p>Lahenga</p>
                            <p>Pajamas</p>
                            <p>Gowns</p>
                        </div>
                        </div>
                    </div>
                    <div className="lower-container"></div>
                </div>
        </>
    )
}
export default Home
