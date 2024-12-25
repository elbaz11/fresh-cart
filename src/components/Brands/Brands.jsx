import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Loader from '../Loader/Loader';

export default function Brands() {
  const [isLoadingSpecific, setIsLoadingSpecific] = useState(false);
  const [specificBrand, setspecificBrand] = useState(null);

  function getAllBrands() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
  }

  let { data, isError, error, isLoading } = useQuery({
    queryKey: ['allBrands'],
    queryFn: getAllBrands,
  });

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  async function specificBrands(id) {
    setIsLoadingSpecific(true);
    try {
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);
      setspecificBrand(data?.data);
    } catch (err) {
      console.error('Error fetching specific brand:', err);
    } finally {
      setIsLoadingSpecific(false);
    }
  }

  return (
    <>
      <Helmet>
        <title>Fresh Cart/Brands</title>
      </Helmet>

      <div className="flex flex-wrap m-auto text-center mt-8 mb-10 ">
        {data?.data?.data?.map((brand) => (
          <div
            onClick={() => specificBrands(brand._id)}
            key={brand._id}
            className="mx-auto border rounded-md my-3 shadow-md hover-shadow"
          >
            <div>
              <img src={brand.image} className="w-full" alt={brand.name} />
            </div>
          </div>
        ))}
      </div>

      {isLoadingSpecific ? (
        <div className="flex justify-center items-center fixed top-0 right-0 bottom-0 left-0 bg-black bg-opacity-50 z-50">
          <Loader />
        </div>
      ) : specificBrand ? (
<div
  id="progress-modal"
  tabIndex={-1}
  aria-hidden="true"
  className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full h-full bg-black bg-opacity-50"
  onClick={(e) => {
    if (e.target.id === "progress-modal") {
      setspecificBrand(null);
    }
  }}
>
  <div className="relative p-4 w-full max-w-md bg-white rounded-lg shadow">
    <div className="flex justify-between items-center">
      <button 
        onClick={() => setspecificBrand(null)}
        type="button"
        className="absolute  top-3 right-3 text-gray-800 bg-gray-300 hover:bg-gray-200 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center mt-2 focus:outline-none"
      >
        <svg
          className="w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
        X
      </button>
    </div>
    <div className="row items-center justify-between">
      <div>
        <h2 className="text-3xl text-green-500 font-semibold">{specificBrand.name}</h2>
        <span className='font-semibold'>{specificBrand.slug}</span>
      </div>
      <div>
        <img
          className="w-full"
          src={specificBrand.image}
          alt={specificBrand.name}
        />
      </div>
    </div>
    <div className="flex items-center mt-6 space-x-4">
      <button
        onClick={() => setspecificBrand(null)}
        type="button"
        className="py-2.5 px-5 text-sm font-medium text-gray-900  focus:outline-none bg-gray-300 rounded-lg border border-gray-200 hover:bg-gray-200 "
      >
        Close
      </button>
    </div>
  </div>
</div>
      ) : null}
    </>
  );
}
