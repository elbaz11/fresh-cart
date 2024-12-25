import React, { useEffect, useState } from 'react'
import style from './Notfound.module.css'
import error from '../../assets/404.png'
export default function Notfound() {

    const [count, setcount] = useState(0)

    useEffect(() => {

    }, [])
    
  return (<>
      <div className="flex justify-center items-center">
      <img src={error} alt="" />
      </div>

  </>
  )
}
