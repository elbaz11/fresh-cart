import { createContext, useState } from "react";

export let counterContext = createContext()

export default function counterContextProvider(props){
    const [counter, setcounter] = useState(0)
    function changeCounter(){
        setcounter(Math.round(Math.random()*100))
    }

    return <counterContext.Provider value={{counter,changeCounter}}>
        {props.children}
    </counterContext.Provider>
}