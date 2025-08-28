import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../Utils/environment";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../Utils/connectionsSlice";
import { capitalize } from "../Utils/helper";

const Connections = () => {
  const dispatch = useDispatch(); // ✅ Moved here
  const connections = useSelector((store) => store.connections);

  const fetchConnections = async () => {
    if (connections) return;
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });

      dispatch(addConnections(res.data.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);
  if(!connections) return;
  if(connections.length===0) return <h1>No Request Found</h1>;
  return (
    <div className="flex flex-col justify-center items-center mx-auto my-10">
      <h1 className="text-3xl text-white font-bold">Connections</h1>

      {connections && connections.map((connection,index)=>{
        const { firstName,lastName,photosUrl,gender,about,age,skills} =connection; 
        return (
            <div key={index} className="m-4 p-4 flex justify-around rounded-lg bg-base-100 w-1/2">
                <div className="">
                    <img src={photosUrl} alt={firstName+" img"}  className="rounded-full m-10 h-10 w-[30%] " />
                </div>
                <div className="text-left mx-4 my-5 justify-center w-[70%]">
                    <h2>{firstName+" "+lastName}</h2>
                    <p>{about}</p>
                   {age && gender && <p>{age+", "+capitalize(gender)}</p>}

                </div>

            </div>
        )

})}
    </div>
  );
};

export default Connections;
