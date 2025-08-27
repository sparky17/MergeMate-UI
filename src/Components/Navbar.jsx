import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../Utils/userSlice";
import axios from "axios";
import { BASE_URL } from "../Utils/environment";

const Navbar = () => {
  const user = useSelector((store) => store.user); 
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const handleLogout=async ()=>{
    try{
    await axios.post(
      BASE_URL + "/logout",{},
      { withCredentials:true}) 
      dispatch(removeUser());
      navigate("/login")
    }catch(e){
      console.error(e);
    }
  };

  return (
    <div className="navbar bg-base-200 shadow-sm">
      <div className="flex-1">
        <Link to={"/"} className="btn btn-ghost text-xl">MergeMate(🔥)</Link>
      </div>
      {user && (
       <div className="flex items-center gap-2">
    
       <div className="form-control">
         <span>Welcome, {user.firstName}</span>
       </div>
          <div className="flex dropdown dropdown-end mx-5">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar m-2"
            >
              <div className="w-10 rounded-full ">
                <img alt="Tailwind CSS Navbar component" src={user.photosUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow "
            >
              <li>
                <Link to={'/profile'} className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link onClick={handleLogout}>Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
