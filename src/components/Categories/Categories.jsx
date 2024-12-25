import React, { useEffect, useState } from 'react'
import style from './Categories.module.css'
import {Helmet} from "react-helmet";
import axios from 'axios';
import Loader from '../Loader/Loader';
import { useQuery } from '@tanstack/react-query';

export default function Categories() {

  const [categories, setcategories] = useState([])
  const [specific, setspecific] = useState([])
   const [isLoadingSpecific, setIsLoadingSpecific] = useState(false);
  
  function getCategories(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    
  }
    const { data, isLoading, isError } = useQuery({
      queryKey: ['getCategories'], 
      queryFn: getCategories,
    });
    // console.log(data);
    


    
  
  async function specificCategories(id){
    setIsLoadingSpecific(true)
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`)
    console.log(data.data);
    setspecific(data?.data)
    setIsLoadingSpecific(false)
  }

    const [count, setcount] = useState(0)


    useEffect(() => {
      
    }, [])

    if (isLoading) {
      return <Loader />;
    }
  
    if (isError) {
      return <h1>Error loading products</h1>;
    }

    
  return (<>

<div className="row m-auto text-center mx-auto justify-center  ">
  {data?.data?.data?.map((category) => {
    return (
      <div  onClick={()=>{specificCategories(category._id)}} key={category._id} className="md:w-1/3 w-full max-w-sm bg-white border border-gray-200 rounded-lg  dark:bg-gray-900 dark:border-gray-700 mx-6 my-6 overflow-hidden shadow-md hover-shadow">
        <div className="w-full h-80 overflow-hidden">
          <img
            className="w-full h-full object-cover "
            src={category.image}
            alt={category.name}
          />
        </div>
        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-green-600 dark:text-white">
            {category.name}
          </h5>
        </div>
      </div>
    );
  })}
</div>
{isLoadingSpecific ? (
        <div className=" fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <Loader />
          
        </div>
      ) : (
        <>
          <h3 className="text-green-600 text-3xl font-bold text-center">
            {specific[0]?.name}
          </h3>

          <div className="row justify-center">
            {specific.map((category) => {
              return (
                <div
                  key={category._id}
                  className="border rounded-md px-3 text-center py-4 w-full md:w-[25%] mx-4 my-2 font-bold shadow-md hover-shadow dark:text-white"
                >
                  {category.slug}
                </div>
              );
            })}
          </div>
        </>
      )}      <Helmet>
                <title>Fresh Cart/Categories</title>
            </Helmet>




  </>
  )
}
