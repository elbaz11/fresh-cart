import React, { useEffect, useState } from 'react'
import style from './ProtectRoutes.module.css'
import { Navigate } from 'react-router-dom'
import Login from '../Login/Login'
export default function ProtectRoutes(props) {

  if(localStorage.getItem('userToken')!==null){
    return props.children
  }
  else{
    return <Navigate to='/login'/>
  }
    
  return (<>
      <div className='py-20'>ProtectRoutes</div>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse soluta odit deleniti reiciendis repudiandae maxime rerum illum, magni tenetur delectus explicabo, quos nobis rem quas, accusantium alias consequatur? Porro, fugiat.</p>

  </>
  )
}
