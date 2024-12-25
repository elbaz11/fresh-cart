import React, { useEffect, useState } from 'react'
import style from './CategorySlider.module.css'
import Slider from "react-slick";
import axios from 'axios';

export default function CategorySlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 1200,
    slidesToShow: 8,
     cssEase: "linear",
    slidesToScroll: 1,
    
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  const [count, setcount] = useState(0)
const [categorySlider, setcategorySlider] = useState([])

  async function getCategorySlider(){
    let {data}=await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)  
   
    setcategorySlider(data.data)
   
  }
  useEffect(() => {
    getCategorySlider()
  }, [])

    
  return (<>
  <div>


    <Slider {...settings}>
    {categorySlider.map((prodImg)=>    <img className='h-[250px]' src={prodImg.image} alt="" />
)}
    </Slider>

  </div>

  </>
  )
}
