import React, { useContext, useEffect, useState } from 'react';
import style from './ProductDetails.module.css';
import { useParams, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { cartContext } from '../../../context/cartContext';
import toast, { Toaster } from 'react-hot-toast';

export default function ProductDetails() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  let {id,category} = useParams()
  let {addToCart} = useContext(cartContext)

  async function addProductToCart(id){
    let {data} = await addToCart(id)
    console.log(data.data);
    if(data.status=='success'){
      toast.success(data.message)
    }
    else{
      toast.error(data.message)
    }
    
  }


  
  const [prodDetails, setprodDetails] = useState({})
  const [relatedData, setrelatedData] = useState([])

 async function getProductDetails(id){
    let {data}=await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)    
    setprodDetails(data.data)
  }

 async function getRelatedProducts(){
    let {data}=await axios.get(`https://ecommerce.routemisr.com/api/v1/products`)  
    // console.log(data.data);
    let allProducts = data.data
   let relatedProducts= allProducts.filter((product)=>product.category.name===category)
  //  console.log();
   setrelatedData(relatedProducts)

   
  }

  useEffect(() => {

      getProductDetails(id)
      getRelatedProducts()

  }, [id,category])
  

  return (
    <>
<div className="row items-center mx-10 md:mx-20 lg:mx-30 py-4 ">
  <div className="w-full md:w-1/4 lg:px-10 sm:px-5">
    <Slider {...settings} >
      {prodDetails?.images?.map((prodImg, index) => (
        <div key={index} className="w-full ">
          <img
            className="w-full h-auto rounded-md "
            src={prodImg}
            alt={`Product ${index}`}
          />
        </div>
      ))}
    </Slider>
  </div>

  <div className="w-full md:w-3/4">
    <h4 className="text-green-500 text-xl">{prodDetails.title}</h4>
    <p className="mt-2 text-gray-500 dark:text-gray-300">{prodDetails.description}</p>
    <p className="mt-2 text-sm text-gray-400 dark:text-gray-300">{prodDetails?.category?.name}</p>

    <div className="flex justify-between items-center px-3 my-4">
      <span className="text-lg font-semibold dark:text-gray-300">{prodDetails.price} EGP</span>
      <div className="flex items-center">
        <i className="fa-solid fa-star text-yellow-300 mr-1"></i>
        <span className="text-black text-sm dark:text-gray-300 font-semibold">{prodDetails.ratingsAverage}</span>
      </div>
    </div>
    <button onClick={()=>{addProductToCart(prodDetails.id)}} className="w-full bg-green-500 hover:bg-green-600 rounded-md py-2 text-white font-semibold transition">
      Add to Cart
    </button>
  </div>
</div>

    <div className="row py-2">
      {relatedData.map((product)=>  <div key={product.id} className='lg:w-1/6 md:w-1/3  px-4 py-3 '>
        <Link to={`/ProductDetails/${product.id}/${product.category.name}`}>  <div className='p-3 shadow-md hover-shadow'>
    <img className='w-full ' src={product.imageCover} alt="" />
    <h4 className='text-green-500 text-xl'>{product.category.name}</h4>
    <p className='dark:text-gray-300'>{product.title .split(' ').slice(0,2).join(' ')}</p>
    <div className='row justify-between items-center px-3'>
    <span className='dark:text-gray-300'>{product.price}EGP</span>
    <span className='fa-solid fa-star text-yellow-300'><span className='text-black text-xs dark:text-gray-300'>{product.ratingsAverage}</span></span>
  </div>

  </div>

</Link>
  </div>
)}
</div>

    </>
  );
}
