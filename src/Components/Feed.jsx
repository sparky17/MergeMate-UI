import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../Utils/environment'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../Utils/feedSlice'
import UserCard from './UserCard'

const Feed = () => { 
  const feed= useSelector((store)=>store.feed)
  const dispatch=useDispatch();

  const getFeed=async ()=>{
    if(feed) return;
    try{
      const response =await axios.get(BASE_URL + "/user/feed",{
        withCredentials:true,
      }); 
      dispatch(addFeed(response.data.users))
    }catch(err){
      console.error(err);
    }
    // TODO handle error 
  }
  
  useEffect(()=>{
    getFeed();
  },[])

  if(!feed) return;
  if(feed.length===0) return (<div className="flex flex-col justify-center items-center mx-auto my-10">
      <h1 className="text-3xl text-white font-bold">No More Users</h1>
      </div>)
  
  return (
    feed && (

      <div className='flex justify-center m-y-10'>
      <UserCard user={feed[0]}/> 
    </div>
    )
  )
}

export default Feed
