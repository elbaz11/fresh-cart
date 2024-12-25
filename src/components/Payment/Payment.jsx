import React, { useContext, useEffect, useState } from 'react'
import style from './Payment.module.css'
import { useFormik } from 'formik'
import axios from 'axios';
import { cartContext } from '../../../context/cartContext';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, useNavigation } from 'react-router-dom';


export default function Payment() {
  let navigate= useNavigate()
  let {cartId,setselectedProducts,setcartItems,settotalPrice}= useContext(cartContext)
  const [isOnline, setisOnline] = useState(false)
    const [Loading, setLoading] = useState(false)
    const [isLoading, setisLoading] = useState(false)
  

  function methodPayment(val){
    if(isOnline){
      onlineOrder(val)
    }
    else{
      cashOrder(val)
    }

  }

async function cashOrder(val){

  setisLoading(true)

 let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,{
    shippingAddress:val
  },{
    headers:{token:localStorage.getItem('userToken')} 
  })
  setisLoading(false)

  if(data.status == 'success'){
    toast.success('your product in your way')
    navigate('/Cart')
    setselectedProducts(null)
    setcartItems(0)
    settotalPrice(0)
  }
  
}

async function onlineOrder(val){
  setLoading(true)
 let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${window.location.origin}`,{
    shippingAddress:val
  },{
    headers:{token:localStorage.getItem('userToken')} 
  })
  setLoading(false)

  if(data.status=='success'){
    window.open(data.session.url)
  }
  

  
}


  let formik = useFormik({
    initialValues:{
      details:'',
      phone:'',
      city:'',
    },
    onSubmit:methodPayment,
  })


    const [count, setcount] = useState(0)

    useEffect(() => {

    }, [])
    
  return (<>
      <h2 className='text-green-500 text-3xl font-bold ps-3 my-4'>Pay Now</h2>
      <div className='py-12 mx-auto p-10'>
      <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
    <div className="relative z-0 w-full mb-5 group">
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.details}  type="text" name="details" id="details" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
      <label htmlFor="details" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Your details</label>
    </div>
    <div className="relative z-0 w-full mb-5 group">
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} type="tel" name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
      <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Your Phone</label>
    </div>
    <div className="relative z-0 w-full mb-5 group">
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.city} type="text" name="city" id="city" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
      <label htmlFor="city" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Your location</label>
    </div>
    <button onClick={()=>{setisOnline(false)}} type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 me-5">{isLoading ? <i className='fa-solid fa-spinner px-1 fa-spin'></i>:'cash order'}</button>
    <button onClick={()=>{setisOnline(true)}} type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">{Loading ? <i className='fa-solid fa-spinner px-1 fa-spin'></i>:'online payment'}</button>
      </form>
      </div>


  </>
  )
}
