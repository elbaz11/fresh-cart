import React, { useContext, useEffect, useState } from 'react'
import style from './Home.module.css'
import { counterContext } from '../../../context/counterContext'
import RecentProducts from '../RecentProducts/RecentProducts'
import CategorySlider from '../categorySlider/categorySlider'
import MainSlider from '../MainSlider/MainSlider'
import { Helmet } from 'react-helmet'
export default function Home() {

  let {counter , changeCounter} = useContext(counterContext)
    
  return (<>
            <Helmet>
                <title>Fresh Cart Market</title>
            </Helmet>

  <div className="container mx-auto px-10   ">
    <MainSlider/>
    <CategorySlider/>
    <RecentProducts/>
  </div>
  </>
  )
}
