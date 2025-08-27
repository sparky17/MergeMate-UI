import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../Utils/environment'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../Utils/feedSlice'
import UserCard from './UserCard'

const Feed = () => {
  console.log("FeedComponent loads")
  const feed= useSelector((store)=>store.feed)
  const dispatch=useDispatch();

  const getFeed=async ()=>{
    if(feed) return;
    const response =await axios.get(BASE_URL + "/user/feed",{
      withCredentials:true,
    }); 
    dispatch(addFeed(response.data.users))
    // TODO handle error 
  }
  
  useEffect(()=>{
    getFeed();
  },[])
  
  return (
    feed && (

      <div className='flex justify-center m-y-10'>
      <UserCard user={feed[0]}/> 
    </div>
    )
  )
}

export default Feed
