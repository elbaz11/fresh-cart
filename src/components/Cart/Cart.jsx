import React, { useEffect, useState } from 'react'
import style from './Cart.module.css'
import { useContext } from 'react'
import { cartContext } from '../../../context/cartContext'
import { Link } from 'react-router-dom'
import {Helmet} from "react-helmet";
import Loader from '../Loader/Loader'
export default function Cart() {

   let {selectedProducts , cartItems,totalPrice,updateProduct,deleteProduct,deleteCartProducts} = useContext(cartContext)
     const [isLoading, setIsLoading] = useState(true); 
   
  //  const [products, setProducts] = useState(selectedProducts);
  //  const [items, setItems] = useState(cartItems);  
  //   const [count, setcount] = useState(0)


    useEffect(() => {
      setTimeout(() => {
        setIsLoading(false); 
      }, 2000); 
    }, [])
    
  return (<>
        <Helmet>
                <title>Fresh Cart/Cart</title>
            </Helmet>

      

      <div className=" sm:mt-16 dark:bg-gray-300 bg-slate-100 text-center py-12 my-6 m-auto rounded-md flex flex-col lg:flex-wrap lg:flex-row items-center justify-between px-4 lg:px-20 gap-6 mx-4 lg:mx-32">
  <div className="w-full lg:w-auto">
    <h2 className="text-2xl lg:text-3xl mb-5 font-semibold">Cart Shop</h2>
    <span className="font-semibold text-lg lg:text-xl">
      Total Price :
      <span className="text-green-500 font-semibold text-lg lg:text-xl mx-1">{totalPrice} EGP</span>
    </span>
  </div>
  <div className="w-full lg:w-auto">
    <button onClick={()=>{deleteCartProducts()}} className="bg-transparent rounded-md px-4 py-2 outline hover:bg-slate-500 hover:text-white w-1/2 lg:w-auto">
      Clear Products
    </button>
    <p className="mt-5 font-semibold text-lg lg:text-xl mb-2">
      Selected :
      <span className="text-green-500 font-semibold text-lg lg:text-xl mx-1">
        {cartItems} Products
        <i className="fa-solid fa-cart-shopping text-sm ms-1"></i>
      </span>
    </p>
  </div>
</div>
    {isLoading?<Loader></Loader>:<>
      <div className="w-full relative overflow-x-auto shadow-md sm:rounded-lg px-2 lg:px-32">
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-4 lg:px-16 py-3">
          <span className="sr-only">Image</span>
        </th>
        <th scope="col" className="px-4 lg:px-6 py-3">Product</th>
        <th scope="col" className="px-4 lg:px-6 py-3">Qty</th>
        <th scope="col" className="px-4 lg:px-6 py-3">Price</th>
        <th scope="col" className="px-4 lg:px-6 py-3">Action</th>
      </tr>
    </thead>
    <tbody>
      {selectedProducts?.map((prod) => (
        <tr
          key={prod.product.id}
          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
          <td className="p-4">
            <img className="w-full md:w-36" src={prod.product.imageCover} alt="" />
          </td>
          <td className="px-4 lg:px-6 py-4 font-semibold text-gray-900 dark:text-white">
            {prod.product.title}
          </td>
          <td className="px-4 lg:px-6 py-4">
            <div className="flex items-center">
              <button
                onClick={() => updateProduct(prod.product.id, prod.count - 1)}
                className="inline-flex items-center justify-center p-1 me-2 lg:me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100"
                type="button">
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 2">
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M1 1h16"/>
                </svg>
              </button>
              <div>
                <input
                  type="number"
                  className="bg-gray-50 w-12 lg:w-14 border border-gray-300 text-gray-900 text-sm rounded-lg px-2 py-1"
                  placeholder={prod.count}
                  required/>
              </div>
              <button
                onClick={() => updateProduct(prod.product.id, prod.count + 1)}
                className="inline-flex items-center justify-center h-6 w-6 p-1 ms-2 lg:ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100"
                type="button">
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18">
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 1v16M1 9h16"/>
                </svg>
              </button>
            </div>
          </td>
          <td className="px-4 lg:px-6 py-4 font-semibold text-gray-900 dark:text-white">
            {prod.price} EGP
          </td>
          <td className="px-4 lg:px-6 py-4">
            <span
              onClick={() => deleteProduct(prod.product.id)}
              className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer">
              Remove
            </span>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  <div className="text-center my-10">
    <Link to={"/Payment"}>
      <button className="bg-green-500 py-2 rounded-md text-white w-1/2 lg:w-1/2">
        Pay Now
      </button>
    </Link>
  </div>
</div>


    </>}


  </>
  )
}
