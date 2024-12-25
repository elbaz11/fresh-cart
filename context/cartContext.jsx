import axios from "axios";
import { createContext, useEffect, useState } from "react";

 export let cartContext = createContext()
 

 export default function CartContextProvider(props){

    const [selectedProducts, setselectedProducts] = useState([])
    const [totalPrice, settotalPrice] = useState(0)
    const [cartItems, setcartItems] = useState(0)
    const [cartId, setcartId] = useState(0)
    const [wishProducts, setwishProducts] = useState([])

    let headers={
        token:localStorage.getItem('userToken')
    }

    function addToCart(id){

      return  axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{

             productId:id
        },{
            headers
        })
        .then((resp)=>{console.log(resp);
            
            // setselectedProducts(resp.data.data.products)
            // settotalPrice(resp.data.data.totalCartPrice)
            // setcartItems(resp.data.numOfCartItems)
            // setcartId(resp.data.cartId)
            getFromCart()
            return resp
        })
        .catch((error)=>{console.log(error);
            return error
        })

    }
    function getFromCart(){

        return  axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{
              headers
          })
          .then((resp)=>{console.log(resp);
              
              setselectedProducts(resp.data.data.products)
              settotalPrice(resp.data.data.totalCartPrice)
              setcartItems(resp.data.numOfCartItems)
              setcartId(resp.data.cartId)
              return resp
          })
          .catch((error)=>{console.log(error);
              return error
          })
  
      }

      function updateProduct(ID,count){

        return  axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${ID}`,{
             count: count
        },{
              headers
          })
          .then((resp)=>{console.log(resp);
              
              setselectedProducts(resp.data.data.products)
              settotalPrice(resp.data.data.totalCartPrice)
              setcartItems(resp.data.numOfCartItems)
              setcartId(resp.data.cartId)
              return resp
          })
          .catch((error)=>{console.log(error);
              return error
          })
  
      }


      function deleteProduct(id){

        return  axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
              headers
          })
          .then((resp)=>{console.log(resp);
              
              setselectedProducts(resp.data.data.products)
              settotalPrice(resp.data.data.totalCartPrice)
              setcartItems(resp.data.numOfCartItems)
              setcartId(resp.data.cartId)
              return resp
          })
          .catch((error)=>{console.log(error);
              return error
          })
  
      }

       function addToWishlist(id){
       return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{

            productId:id
        },{
            headers
        })
        .then((resp)=>{console.log(resp);
            getFromWishList()
            return resp
        })
        .catch((error)=>{console.log(error);
            return error
        });
        
       }

       function getFromWishList(){
       return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
            headers
        })
        .then((resp)=>{console.log(resp);
            setwishProducts(resp?.data?.data)
            return resp
        })
        .catch((error)=>{console.log(error);
            return error
        });
       }

       function deleteWishProduct(id){
       return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{
            headers
        })
        .then((resp)=>{console.log(resp);
            getFromWishList()
            return resp
        })
        .catch((error)=>{console.log(error);
            return error
        })
       }

       function deleteCartProducts(){
       return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{
            headers
        })
        .then((resp)=>{console.log(resp);
            setselectedProducts([])
            settotalPrice(0)
            setcartItems(0)
            
            return resp
        })
        .catch((error)=>{console.log(error);
            return error
        })
       }



      useEffect(() => {

        getFromCart()
        getFromWishList()
    
      }, [])
      
  

    return <cartContext.Provider value={{ addToWishlist,getFromWishList,setwishProducts,wishProducts,deleteWishProduct,deleteCartProducts ,addToCart ,getFromCart,selectedProducts,setselectedProducts , cartItems,totalPrice,updateProduct,deleteProduct,cartId,setcartItems,settotalPrice}}>
        {props.children}
    </cartContext.Provider>
 }