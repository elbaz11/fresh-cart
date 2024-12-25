import React, { useEffect, useState } from 'react'
import style from './Layout.module.css'
import Navbar from './../Navbar/Navbar'
import Footer from './../Footer/Footer'
import { Outlet } from 'react-router-dom'

export default function Layout() {

    const [count, setcount] = useState(0)

    useEffect(() => {

    }, [])
    
  return (<>
  <Navbar/>
  <div className='container mx-auto lg:p-10'></div>
 <Outlet></Outlet>
  <Footer/>
      

  </>
  )
}
