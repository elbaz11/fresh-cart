import React, { useContext, useEffect, useState } from 'react';
import { cartContext } from '../../../context/cartContext';
import toast from 'react-hot-toast';
import Loader from '../Loader/Loader';

export default function Wishlist() {
  let { wishProducts, setwishProducts, addToCart, deleteWishProduct } = useContext(cartContext);
  const [isLoadingSpecific, setIsLoadingSpecific] = useState(false);
  const [isLoading, setIsLoading] = useState(true); 

  async function addProductToCart(id) {
    setIsLoadingSpecific(true);
    let { data } = await addToCart(id);
    if (data.status === 'success') {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
    setIsLoadingSpecific(false); 
  }

  async function handleDeleteProduct(id) {
    setIsLoadingSpecific(true); 
    await deleteWishProduct(id); 
    setIsLoadingSpecific(false); 
  }

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false); 
    }, 2000); 
  }, []);

  return (
    <>
     
      
      {isLoadingSpecific && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <Loader />
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      ):<>      <section className="container mx-auto px-8 mt-8 mb-8">
      <h2 className="text-3xl font-bold mb-6 ms-9 dark:text-gray-200">My wish List</h2>
      <div className="grid">
        {wishProducts?.map((prod) => (
          <div
            key={prod._id}
            className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 dark:my-2 rounded-lg shadow p-4 md:mx-5 lg:mx-10">
            <div className="flex flex-wrap items-center space-x-4 mt-2 px-5">
              <img src={prod?.imageCover} alt="Product" className="w-24 h-24 object-cover rounded-md" />
              <div>
                <h3 className="font-semibold dark:text-gray-200">{prod?.title.split(' ').slice(0, 3).join(' ')}</h3>
                <p className="text-green-500 font-semibold">{prod.price} EGP</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center space-x-4 lg:space-x-8">
              <button
                onClick={() => handleDeleteProduct(prod._id)}
                className="text-red-500 hover:text-red-700 mt-1 outline-none focus:outline-none dark:bg-slate-900">
                <i className="fa-solid fa-trash mx-1"></i> Remove
              </button>
              <button
                onClick={() => addProductToCart(prod._id)}
                className="dark:bg-slate-900 mt-4 sm:mt-1 px-8 py-2 text-green-500 border border-green-500 rounded hover:bg-green-500 hover:text-white focus:outline-none">
                + Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
</>}
      
     
    </>
  );
}
