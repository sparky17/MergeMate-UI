import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios'
import { BASE_URL } from '../Utils/environment'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../Utils/userSlice'

const Body = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const userData= useSelector((store)=> store.user)
  const fetchUser= async ()=>{
    try{
        const res =await axios.get(BASE_URL + "/profile/view",{
        withCredentials:true,
      }); 
      dispatch(addUser(res.data.user));
    }catch(err){
      if(err.status===401){
        return navigate('/login')
      }
      console.error(err)
    }
  }

  useEffect(()=>{
    
    if(!userData){
      fetchUser();
    }
  },[])
  
  return (
    <div>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Body
