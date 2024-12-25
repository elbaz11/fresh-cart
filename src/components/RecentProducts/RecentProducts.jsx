import React, { useContext, useEffect, useState } from 'react';
import style from './RecentProducts.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { cartContext } from '../../../context/cartContext';
import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import Loader from '../Loader/Loader';

export default function RecentProducts() {
  const [searcedVal, setsearcedVal] = useState([]);

  function getRecentProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ['RecentProducts'], 
    queryFn: getRecentProducts,
  });

  useEffect(() => {
    if (data?.data?.data) {
      setsearcedVal(data.data.data);
    }
  }, [data]);

  function searchProduct(e) {
    const searchValue = e.target.value.toLowerCase();
    if (searchValue === '') {
      setsearcedVal(data?.data?.data); 
    } else {
      const filteredProducts = data?.data?.data.filter((prod) => 
        prod.title.toLowerCase().includes(searchValue)
      );
      setsearcedVal(filteredProducts); 
    }
  }

  const { addToCart , addToWishlist,wishProducts, setwishProducts } = useContext(cartContext);

  async function addProductToCart(id) {
    let { data } = await addToCart(id);
    if (data.status === 'success') {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  }

  async function addProductToWishlist(id){
  let {data} = await addToWishlist(id)
  if (data.status === 'success') {
    toast.success(data.message);
     setwishProducts(id) ;
  } else {
    toast.error(data.message);
  }

  }

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <h1>Error loading products</h1>;
  }

  return (
    <>
  <form className="w-full px-4 sm:w-3/4 md:1/2 lg:px-20 mx-auto mt-10">
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
          </div>
          <input
            onInput={(e) => searchProduct(e)}
            type="text"
            id="default-search"
            className="block w-full outline-none p-2 ps-10 text-md text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
            placeholder="Search Product"/>
        </div>
      </form>
      <div className="row py-2 dark:bg-slate-900 ">
        {searcedVal.map((product) => (
          <div key={product.id} className="lg:w-1/4 md:w-1/3 px-4 py-3   ">
            <Link to={`ProductDetails/${product.id}/${product.category.name}`}>
              <div className="p-3 shadow-md hover-shadow product-card ">
                <img className="w-full" src={product.imageCover} alt="" />
                <h4 className="text-green-500 text-xl">{product.category.name}</h4>
                <p className='dark:text-gray-400 '>{product.title.split(' ').slice(0, 2).join(' ')}</p>
                <div className="row justify-between items-center px-3">
                  <span className='dark:text-gray-400 '>{product.price}EGP</span>
                  <span className="fa-solid fa-star text-yellow-300">
                    <span className="text-black text-xs dark:text-gray-300">{product.ratingsAverage}</span>
                  </span>
                </div>
                <Link>
                <i onClick={()=>{addProductToWishlist(product.id)}}  className={`fa-solid fa-heart text-xl ${
                    wishProducts.includes(product.id) ? 'text-red-600' : 'text-black dark:text-gray-300'}`}></i>
                </Link>
                
                <div className="text-center">
                  <Link> <button
                    onClick={() => addProductToCart(product.id)}
                    className="bg-green-600 py-1 px-16 md:py-2 md:px-5 lg:px-10 lg:py-1 xl:px-14 xl:py-1 rounded-md text-white text-center add-to-cart-button focus:outline-none "
                  >
                    <span className='text-xl'>+</span> Add
                  </button>
                  </Link>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
