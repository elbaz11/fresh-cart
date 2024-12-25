import { createContext, useEffect, useState } from "react";
 export let userContext = createContext()

 export default function UserContextProvider(props){
    useEffect(() => {
        if(localStorage.getItem('userToken')!==null){
            setuserLogin(localStorage.getItem('userToken'))
        }
    
    },[])
    

    const [userLogin, setuserLogin] = useState(null)

    return <userContext.Provider value={{userLogin,setuserLogin}}>
        {props.children}
    </userContext.Provider>
 }