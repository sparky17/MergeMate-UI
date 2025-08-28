import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../Utils/environment';
import axios from 'axios';
import { addRequest, removeRequest } from '../Utils/requestSlice';
import { capitalize } from '../Utils/helper';

const Request = () => {
  const dispatch =useDispatch();
  const requests=useSelector((store)=>store.requests);
  const fetchRequest=async ()=>{
    if (requests) return;
    try {
      const req=await axios.get(BASE_URL+"/user/requests",{
        withCredentials:true
      });
      dispatch(addRequest(req.data.data))
      console.log(requests)
    } catch (error) {
      console.error(error) 
    }
  }
  const reviewRequest=async (status,_id)=>{
    try{
      const res=await axios.post(BASE_URL+`/request/review/${status}/${_id}`,
        {}, {withCredentials:true}
      );
      dispatch(removeRequest(_id))
    }catch(err){
      console.error(err)
    }
  }


  useEffect(()=>{
    fetchRequest();
  },[])
  if(!requests) return;
  console.log(requests)
  if(requests.length===0) return <h1 className='flex justify-center text-2xl'>No Request Found</h1>;
  return (
    <div className="flex flex-col justify-center items-center mx-auto my-10 ">
      <h1 className="text-3xl text-white font-bold">Connection Requests</h1>

      {requests && requests.map((request)=>{
        const {_id}=request
        const { firstName,lastName,photosUrl,gender,about,age,skills} =request.fromUserId; 
        return (
            <div key={_id} className="m-4 p-4 flex justify-around rounded-lg bg-base-200  w-1/2">
                <div className="">
                    <img src={photosUrl} alt={firstName+" img"}  className="rounded-full m-10 h-10 w-[30%]" />
                </div>
                <div className="text-left mx-4 my-5 justify-center w-[70%]">
                    <h2>{firstName+" "+lastName}</h2>
                    <p>{about}</p>
                   {age && gender && <p>{age+", "+capitalize(gender)}</p>}

                </div>
                
                <div className=" flex justify-between items-center">
                <button className="btn btn-primary mx-2" onClick={()=>reviewRequest("rejected",_id)}>Reject</button>
                <button className="btn btn-secondary mx-2" onClick={()=>reviewRequest("accepted",_id)}>Accept</button>
                </div>


            </div>
        )

})}
    </div>
  );
};

export default Request
