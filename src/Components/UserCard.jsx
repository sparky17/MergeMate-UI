import React from 'react'
import { capitalize } from '../Utils/helper';
import axios from 'axios';
import { BASE_URL } from '../Utils/environment';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../Utils/feedSlice';

const UserCard = ({user}) => {
    const {_id,firstName,lastName,photosUrl,gender,about,age,skills}=user;
    const dispatch=useDispatch();

    const handleSendRequest=async (status,userId)=>{
      try {
        const res=await axios.post(BASE_URL+ `/request/send/${status}/${userId}`,{},
          {withCredentials:true}
        );
        dispatch(removeUserFromFeed(_id))
      } catch (error) {
        console.log(error)
      }
    }

   return (
    <div className="card bg-base-300 w-96 shadow-sm">
    <figure>
      <img
        src={photosUrl}
        alt={firstName} />
    </figure>
    <div className="card-body">
      <h2 className="card-title">{firstName+" "+lastName}</h2>
     {age && gender &&<p>{age+" "+capitalize(gender)}</p>}
      <p>{about}</p>
      {skills && <p>{"Skills "+skills}</p>}
      <div className="card-actions justify-center my-5">
        <button className="btn btn-primary" onClick={()=>handleSendRequest("ignored",_id)}>Ignore</button>
        <button className="btn btn-secondary" onClick={()=>handleSendRequest("interested",_id)}>Interested</button>
      </div>
    </div>
  </div>
  )
}

export default UserCard
