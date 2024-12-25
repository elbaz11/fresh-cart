import React, { useEffect, useState } from 'react'
import style from './MainSlider.module.css'
import Slider from "react-slick";
import bg1 from '../../assets/slider-image-1.jpeg'
import bg2 from '../../assets/slider-image-2.jpeg'
import bg3 from '../../assets/slider-image-3.jpeg'
import p1 from '../../assets/grocery-banner.png'
import p2 from '../../assets/grocery-banner-2.jpeg'


export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
    const [count, setcount] = useState(0)

    useEffect(() => {

    }, [])
    
  return (<>
  <div className='row'>
  <div className='md:w-3/4 w-1/2'>
  <Slider {...settings}>
<img className='h-[400px]' src={bg1} alt="" />
<img className='h-[400px]' src={bg2} alt="" />
<img className='h-[400px]' src={bg3} alt="" />
</Slider>
</div>
<div className='md:w-1/4 w-1/2'>
<img className='h-[200px] ' src={p1} alt="" />
<img className='h-[200px] ' src={p2} alt="" />
</div>


  </div>
  </>
  )
}
