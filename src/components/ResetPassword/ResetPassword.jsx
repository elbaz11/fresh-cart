import React, { useEffect, useState } from 'react'
import style from './ResetPassword.module.css'
import { Formik, useFormik } from 'formik'
import axios from 'axios'
import * as yup from 'yup'
import { Navigate, useNavigate } from 'react-router-dom'

export default function ForgotPassword() {
  let navigate = useNavigate()

    const [count, setcount] = useState(0)

      let validationSchema = yup.object().shape({
        email:yup.string().email('email is invalid').required('email is required'),
        newPassword:yup.string().matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,'password invalid').required('password is required'),
    
      })
    

    function FormSubmit(val){
      // console.log(val);
        axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,{

          email:val.email,
          newPassword:val.newPassword,
        })
        .then((resp)=>{console.log(resp);
          
          if(resp?.statusText=='OK'){

            localStorage.setItem('userToken',resp?.data?.data?.token)
            navigate('/Login')

            // setuserLogin(resp.data.token)
      

          }
          else{
            null
          }
          
        })
        .catch((error)=>{console.log(error);
        })
      
    }

    let formik = useFormik({
      initialValues:{
        email:'',
        newPassword:'',
      },
      onSubmit:FormSubmit,
      validationSchema

    })

    useEffect(() => {

    }, [])
    
  return (<>
  <form onSubmit={formik.handleSubmit} >
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 m-0 p-0">
      <h1 className="text-2xl font-semibold mb-6">Please enter email and password</h1>
      <div className="w-full max-w-sm">
        <input
        onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email}
          type="email"
          placeholder="Email"
          name='email'
          id='email'
          className="block w-full p-3 mb-4 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"/>
                    {formik.errors.email && formik.touched.email ?<div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
       <span class="font-medium">{formik.errors.email}</span> 
      </div>:null}

        <input
        onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.newPassword}
          type="password"
          placeholder="New password"
          name='newPassword'
          id='newPassword'
          className="block w-full p-3 mb-4 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"/>
          {formik.errors.newPassword && formik.touched.newPassword ?<div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span class="font-medium">{formik.errors.newPassword}</span> 
</div>:null}
        <button
          className="w-full py-2 px-4 bg-white text-green-500 border border-green-500 rounded-lg font-medium hover:bg-green-500 hover:text-white transition focus:outline-none">
          Submit
        </button>
      </div>
    </div>

  </form>
  </>
  )
}
