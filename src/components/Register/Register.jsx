import React, { useContext, useEffect, useState } from 'react'
import style from './Register.module.css'
import {useFormik} from 'formik'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { userContext } from '../../../context/userContext'
export default function Register() {

  const [error, seterror] = useState(null)
  const [Loading, setLoading] = useState(false)
  let navigate = useNavigate()

  let {userLogin,setuserLogin}= useContext(userContext)
  

  // function validation(validForm){

  //   let errors ={}

  //   if(!validForm.name){
  //     errors.name='name input is required'
  //   }
  //   else if(!/^[a-zA-Z\s]+$/.test(validForm.name)){
  //     errors.name='name mustnt have numbers'
  //   }
  //   if(!validForm.email){
  //     errors.email='email input is required'
  //   }
  //   else if(!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(validForm.email)){
  //     errors.email='email is invalid'
  //   }
  //   if(!validForm.password){
  //     errors.password='password is required'
  //   }
  //   else if(!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(validForm.password)){
  //     errors.password='password is invalid at least two letters'
  //   }
  //   if(!validForm.rePassword){
  //     errors.rePassword='re-password is required'
  //   }
  //   else if(validForm.password !== validForm.rePassword){
  //     errors.rePassword='re-password is invalid'
  //   }
  //   if(!validForm.phone){
  //     errors.phone='phone input is required'
  //   }
  //   else if(!/^\+?[0-9]{11}$/.test(validForm.phone)){
  //     errors.phone='phone must be 11 numbers'
  //   }
  //   return errors

  // }
  let validationSchema = yup.object().shape({
    name:yup.string().min(3,'name is min length 3').max(10,'name is max length 10').required('name is required'),
    email:yup.string().email('email is invalid').required('email is required'),
    phone:yup.string().matches(/^01[0125][0-9]{8}$/,'phone is invalid').required('phone is required'),
    password:yup.string().matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,'password invalid').required('password is required'),
    rePassword:yup.string().oneOf([yup.ref('password')],'rePassword invalid').required('rePassword is required')

  })


  async function handleRegister(values){
    setLoading(true)
    let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,values)
    .then((resp)=>{
      localStorage.setItem('userToken',resp.data.token)
      // setuserLogin(resp.data.token)
      navigate('/Login')
      setLoading(false)
      
    })
    .catch((resp)=>{
      seterror(resp?.response?.data.message)
      setLoading(false)
    })
  }

  let formik = useFormik({
    initialValues:{
      name:'',
      email:'',
      password:'',
      rePassword:'',
      phone:'',
    },
    onSubmit:handleRegister,
    validationSchema
  })



  return (<>
      <div className='py-12 mx-auto p-10'>
        <h2 className='font-bold text-4xl lg:ms-10 text-green-600'>Register now</h2>
      <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
    <div className="relative z-0 w-full mb-5 group">
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} type="text" name="name" id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
      {formik.errors.name && formik.touched.name ?<div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span class="font-medium">{formik.errors.name}</span>
</div>:null}
      <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Your Name</label>
    </div>
    <div className="relative z-0 w-full mb-5 group">
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email}  type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
      {formik.errors.email && formik.touched.email ?<div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span class="font-medium">{formik.errors.email}</span>
</div>:null}
      <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Your Email</label>
    </div>
    <div className="relative z-0 w-full mb-5 group">
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" name="password" id="pass" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
      {formik.errors.password && formik.touched.password ? <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span class="font-medium">{formik.errors.password}</span>
</div>:null}
      <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Your Password</label>
    </div>
    <div className="relative z-0 w-full mb-5 group">
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} type="password" name="rePassword" id="rePass" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
      {formik.errors.rePassword && formik.touched.rePassword ?<div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span class="font-medium">{formik.errors.rePassword}</span> 
</div>:null}
      <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> re-password</label>
    </div>
    <div className="relative z-0 w-full mb-5 group">
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} type="phone" name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
      {formik.errors.phone && formik.touched.phone ?<div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span class="font-medium">{formik.errors.phone}</span> 
</div>:null}
      <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> Your phone</label>
    </div>
    {error ?<div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium">{error}</span>
</div>:null}
    <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">{Loading ? <i className='fa-solid fa-spinner px-1 fa-spin'></i>:'submit'}</button>
      </form>
      </div>

  </>
  )
}
