import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../Utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../Utils/environment";

const Login = () => {
  const [email, setEmail] = useState('Riya@example.com');
  const [password, setPasswrd] = useState('RiyaPassword@2024');
  
  const dispatch=useDispatch();
  const navigate =useNavigate();

  const handleLogin=async ()=>{
    try{
    const response = await axios.post(
      BASE_URL + "/login"
      ,{
        email,
        password
      },{ withCredentials:true}) 
      dispatch(addUser(response.data.data));
      navigate("/")
    }catch(e){
      console.log(e);
    }
  };

  return (
    <div className="flex justify-center items-center h-[60vh] ">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-center justify-center text-2xl font-semibold mb-6">
            Login
          </h2>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Email ID</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="form-control mb-6">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="input input-bordered w-full"
              value={password}
              onChange={(e) => {
                setPasswrd(e.target.value);
              }}
            />
          </div>
          <div className="card-actions justify-center">
            <button className="btn btn-primary w-full" onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
