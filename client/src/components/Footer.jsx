import React, { useEffect } from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router'
import { BadgeX, Instagram, LucideYoutube, Phone, PhoneCall, PhoneIcon, Twitter, X, XIcon, Youtube, YoutubeIcon } from 'lucide-react';


const Footer = () => {

    const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", 
    });
  };

    return (
        <div className='px-6 md:px-16 lg:px-24 xl:px-32 mt-60 text-sm text-gray-500'>

            <div className='flex flex-wrap justify-between items-start gap-8
            pb-6 border-borderColor border-b'>
                <div >
                    <img src={assets.logo} alt="logo" className='h-8 md:h-9' />
                    <p className='max-w-80 mt-3'>
                    Premium car rental service with a wide selection of luxury
                    and everyday vehicles for all your driving needs.
                    </p>
                    <div className='flex items-center gap-3 mt-6'>
                        <Link to="https://www.instagram.com/salviaro_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target='_blank'>
                        <Instagram className='w-5 h-5' alt="" />
                        </Link>

                        <Link to="https://x.com/SALVIAROautos" target='_blank'>
                        <Twitter className='w-5 h-5' alt="" />
                        </Link>

                        <Link to="http://www.youtube.com/@SALVIAROAUTOS" target='_blank'>
                        <Youtube className='w-5 h-5' alt="" />
                        </Link>

                    </div>
                </div>

                <div>
                    <h2 className='text-base font-medium text-gray-800 
                    uppercase'>Quick Links</h2>
                    <ul className='mt-3 flex flex-col gap-1.5'>
                        <li><Link onClick={handleScrollToTop} to={'/'}>Home</Link></li>
                        <li><Link onClick={handleScrollToTop} to={'/cars'}>Browse Cars</Link></li>
                        <li><Link onClick={handleScrollToTop} to={'/my-bookings'}>My Bookings</Link></li>
                        <li><Link onClick={handleScrollToTop} to={'/about-us'}>About Us</Link></li>
                        
                    </ul>
                </div>

                <div>
                    <h2 className='text-base font-medium text-gray-800 
                    uppercase'>Resources</h2>
                    <ul className='mt-3 flex flex-col gap-1.5'>
                        <li><Link onClick={handleScrollToTop} to={'/help-center'}>Help Center</Link></li>
                        <li><Link onClick={handleScrollToTop} to={'/terms-of-service'}>Terms of Service</Link></li>
                        <li><Link onClick={handleScrollToTop} to={'/privacy-policy'}>Privacy Policy</Link></li>
                        <li><Link onClick={handleScrollToTop} to={'/insurance'}>Insurance</Link></li>
                    </ul>
                </div>

                <div>
                    <h2 className='text-base font-medium text-gray-800 
                    uppercase'>Contact</h2>
                    <ul className='mt-3 flex flex-col gap-1.5'>
                        <li>salviaro.autos@gmail.com</li>
                        <li>+212 699272226</li>
                        <li>+212 602867321</li>
                        <li><Link onClick={handleScrollToTop} to={'/contact-us'}>Contact Us</Link></li>
                    </ul>
                </div>

                <div>
                    <h2 className='text-base font-medium text-gray-800 
                    uppercase'>Our Goals</h2>
                    <ul className='mt-3 flex flex-col gap-1.5'>
                        <Link to={'/our-goals'}>international expansion</Link>
                    </ul>
                </div>

            </div>

            <div className='flex flex-col md:flex-row gap-2 items-center justify-between py-5'>
                <p>© {new Date().getFullYear()} <Link onClick={handleScrollToTop} to="/">salviaro.autos</Link>. All rights reserved.</p>
            </div>
        </div>
    )
}

export default Footer