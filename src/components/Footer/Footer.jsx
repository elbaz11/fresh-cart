import React, { useEffect, useState } from 'react'
import style from './Footer.module.css'

export default function Footer() {

    const [count, setcount] = useState(0)

    useEffect(() => {

    }, [])
    
  return (<>
<footer className="bg-gray-200 py-8 dark:bg-slate-900">
  <div className="max-w-7xl mx-auto px-4">
    {/* Top Section */}
    <div className="text-center mb-6">
      <h2 className="text-xl font-semibold dark:text-gray-300">Get the FreshCart app</h2>
      <p className="text-gray-600 dark:text-gray-300">We will send you a link, open it on your phone to download the app.</p>
    </div>
    {/* Email Input Section */}
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
      <input type="email" placeholder="Email .." className="border border-gray-300 rounded-md p-3 w-full sm:w-1/2" />
      <button className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600">
        Share App Link
      </button>
    </div>
    {/* Divider */}
    <div className="my-6 border-t border-gray-300" />
    {/* Bottom Section */}
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
      {/* Payment Partners */}
      <div className="flex items-center gap-4">
        <span className="text-gray-500 font-medium">Payment Partners</span>
        <img className='w-20 cursor-pointer' src={`${process.env.PUBLIC_URL}/Amazon_Pay-Logo.wine.svg`} alt="Amazon Pay" />
        <img className='w-20 cursor-pointer' src={`${process.env.PUBLIC_URL}/American-Express-Color.png`} alt="American Express" />
        <img className='w-10 cursor-pointer' src={`${process.env.PUBLIC_URL}/Mastercard-logo.svg.png" alt="MasterCard`} />
        <img className='w-20 cursor-pointer' src={`${process.env.PUBLIC_URL}/PayPal_logo.svg.png" alt="PayPal`} />
      </div>
      {/* App Store Links */}
      <div className="flex items-center gap-4">
        <span className="text-gray-500 font-medium dark:text-gray-300">Get deliveries with FreshCart</span>
        <img className='w-20' src={`${process.env.PUBLIC_URL}/google-play-apple-text-logo-thumbnail.png`} alt="App Store" />
        <img className='w-20' src={`${process.env.PUBLIC_URL}/fresh-cart/google-thumbnail.png" alt="Google Play`} />
      </div>
    </div>
  </div>
</footer>


  </>
  )
}
