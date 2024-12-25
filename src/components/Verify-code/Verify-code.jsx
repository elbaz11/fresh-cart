import React, { useEffect, useState } from 'react'
import style from './VerifyCode.module.css'
import { Formik, useFormik } from 'formik'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'

export default function ForgotPassword() {
  let navigate = useNavigate()

    const [count, setcount] = useState(0)

    function FormSubmit(val){
      // console.log(val);
        axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,{

          resetCode:val.resetCode
        })
        .then((resp)=>{console.log(resp);
          
          if(resp?.data?.status=='Success'){

            navigate('/ResetPassword')

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
        resetCode:'',
      },
      onSubmit:FormSubmit
    })

    useEffect(() => {

    }, [])
    
  return (<>
  <form onSubmit={formik.handleSubmit} >
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 m-0 p-0">
      <h1 className="text-2xl font-semibold mb-6">Please enter your verification code</h1>
      <div className="w-full max-w-sm">
        <input
        onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.resetCode}
          type="text"
          placeholder="Put the code"
          name='resetCode'
          id='resetCode'
          className="block w-full p-3 mb-4 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"/>
        <button
          className="w-full py-2 px-4 bg-white text-green-500 border border-green-500 rounded-lg font-medium hover:bg-green-500 hover:text-white transition focus:outline-none">
          Verify
        </button>
      </div>
    </div>

  </form>
  </>
  )
}
