import { Children, useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Products from './components/products/products'
import Categories from './components/Categories/Categories'
import Cart from './components/Cart/Cart'
import Brands from './components/Brands/Brands'
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Notfound from './components/Notfound/Notfound';
import CounterContextProvider from './../context/counterContext';
import UserContextProvider from '../context/userContext';
import ProtectRoutes from './components/ProtectRoutes/ProtectRoutes';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Wishlist from './components/Wishlist/Wishlist';
import CartContextProvider from '../context/cartContext';
// import Allorders from './components/allorders/allorders';
import Allorders from './components/Allorders/Allorders';
import ForgotPassword from './components/Forgot-password/Forgot-password';
import ResetPassword from './components/ResetPassword/ResetPassword';
import VerifyCode from './components/Verify-code/Verify-code';
import  { Toaster } from 'react-hot-toast';
import Payment from './components/Payment/Payment';
import DarkModeToggle from './components/DarkModeToggle/DarkModeToggle';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
let query = new QueryClient()

function App() {
const router = createBrowserRouter([
  {path:'', element:<Layout/>,children:[
    {index:true , element:<ProtectRoutes><Home/></ProtectRoutes>},
    {path:'products' , element:<ProtectRoutes><Products/></ProtectRoutes>},
    {path:'categories' , element:<ProtectRoutes><Categories/></ProtectRoutes>},
    {path:'ProductDetails/:id/:category' , element:<ProtectRoutes><ProductDetails/></ProtectRoutes>},
    {path:'cart' , element:<ProtectRoutes><Cart/></ProtectRoutes>},
    {path:'Payment' , element:<ProtectRoutes><Payment/></ProtectRoutes>},
    {path:'brands' , element:<ProtectRoutes><Brands/></ProtectRoutes>},
    {path:'wishlist' , element:<ProtectRoutes><Wishlist/></ProtectRoutes>},
    {path:'allorders' , element:<ProtectRoutes><Allorders/></ProtectRoutes>},
    {path:'forgot-password' , element:<ForgotPassword/>},
    {path:'verify-code' , element:<VerifyCode/>},
    {path:'resetpassword' , element:<ResetPassword/>},
    {path:'register' , element:<Register/>},
    {path:'login' , element:<Login/>},
    {path:'*' , element:<Notfound/>},
  ]}
])


  return ( 

   <>
   <QueryClientProvider client={query}>
   <CartContextProvider>
   <UserContextProvider>
   <CounterContextProvider>
   <RouterProvider router={router}></RouterProvider>
   <ReactQueryDevtools/>
   <Toaster
  position="top-right"
  reverseOrder={false}
  gutter={8}
  containerClassName=""
  containerStyle={{}}
  toastOptions={{
    // Define default options
    className: '',
    duration: 5000,
    style: {
      background: '#363636',
      color: '#fff',
    },

    // Default options for specific types
    success: {
      duration: 3000,
      theme: {
        primary: 'green',
        secondary: 'black',
      },
    },
  }}/>
   </CounterContextProvider>
   </UserContextProvider>

   </CartContextProvider>

   </QueryClientProvider>


    </>
  )
}

export default App
