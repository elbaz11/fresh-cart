import React, { useEffect, useState } from 'react'
import style from './Loader.module.css'

export default function Loader() {

    const [count, setcount] = useState(0)

    useEffect(() => {

    }, [])
    
  return (<>
  <div className='flex flex-wrap justify-center items-center h-screen'>
  <span class="loader"></span>

  </div>


  </>
  )
}
