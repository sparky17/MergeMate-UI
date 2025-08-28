import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../Utils/environment";
import { useDispatch } from "react-redux";
import { addUser } from "../Utils/userSlice";
import { capitalize } from "../Utils/helper";

const EditProfile = ({ user }) => {
  const dispatch=useDispatch(); 
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [skills, setSkills] = useState([]);
  const [photosUrl, setPhotosUrl] = useState("");
  const [gender, setGender] = useState("");
  const [about, setAbout] = useState("");
  const [showToast, setShowToast] = useState(false);


  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setAge(user.age || "");
      setSkills(user.skills || "");
      setPhotosUrl(user.photosUrl || "");
      setGender(capitalize(user.gender) || "");
      setAbout(user.about || "");
    }
  }, [user]);

  const hanldeSaveProfle=async ()=>{
    setError("");
    try{    
        const res=await axios.patch(BASE_URL+"/profile/edit",{
                firstName,
                lastName,
                photosUrl,
                gender,
                about,
                age,
                skills
        },{withCredentials:true}
    );

    dispatch(addUser(res?.data?.data))
    setShowToast(true);
    setTimeout(()=>{
      setShowToast(false);
    },2000)
    }
    catch(e){
        setError(e?.response?.data?.message || "Something went wrong");
    }
  }

  const [error, setError] = useState("");

  return (
    (user &&
    <div className="min-h-screen bg-base-200 p-4 flex justify-center items-start gap-8">
      <div className="flex justify-center items-center mx-10">
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-center justify-center text-2xl font-semibold mb-2">
              Edit Profile
            </h2>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Firstname</span>
              </label>
              <input
                type="text"
                placeholder="Enter your email"
                className="input input-bordered w-full"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
            </div>
            <div className="form-control mb-2">
              <label className="label">
                <span className="label-text">Lastname</span>
              </label>
              <input
                type="text"
                placeholder="Enter your password"
                className="input input-bordered w-full"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </div>
            <div className="form-control mb-2">
              <label className="label">
                <span className="label-text">Gender</span>
              </label>
              <select 
                value={gender} 
                onChange={(e) => setGender(e.target.value)} 
                className="input input-bordered w-full"
              >
                <option value="" disabled>Select your gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-control mb-2 remove-arrow">
              <label className="label">
                <span className="label-text">Age</span>
              </label>
              <input
                type="number"
                placeholder="Enter your age"
                className="input input-bordered w-full"
                value={age}
                onChange={(e) => {
                  setAge(e.target.value);
                }}
              />
            </div>{" "}
            <div className="form-control mb-2">
              <label className="label">
                <span className="label-text">Skills</span>
              </label>
              <input
                type="text"
                placeholder="Enter your skills"
                className="input input-bordered w-full"
                value={skills}
                onChange={(e) => {
                  setSkills(e.target.value);
                }}
              />
            </div>{" "}
            <div className="form-control mb-2">
              <label className="label">
                <span className="label-text">PhotosUrl</span>
              </label>
              <input
                type="text"
                placeholder="Enter your photosUrl"
                className="input input-bordered w-full"
                value={photosUrl}
                onChange={(e) => {
                  setPhotosUrl(e.target.value);
                }}
              />
            </div>{" "}
            <div className="form-control mb-2">
              <label className="label">
                <span className="label-text">About</span>
              </label>
              <input
                type="textarea"
                placeholder="Enter your about"
                className="input input-bordered w-full"
                value={about}
                onChange={(e) => {
                  setAbout(e.target.value);
                }}
              />
            </div>
            <p className="text-red-500">{error}</p>
            <div className="card-actions justify-center">
              <button
                className="btn btn-primary w-full"
                onClick={hanldeSaveProfle}
              >
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className=" ">
        
      <h2 className="card-title bg-base-300  text-center justify-center text-2xl font-semibold mb-2">
              Your User Card 
            </h2>
      <div className="flex justify-center items-center mb-5 ">
        <UserCard
            user={{
                firstName,
                lastName,
                photosUrl,
                gender,
                about,
                age,
                skills,
            }}
            />
            {showToast && <div className="toast toast-end toast-end"> 
            <div className="alert alert-success">
              <span>Profile Update successfully.</span>
            </div>
            </div>}
          </div>
        </div>
    </div>
    )
  );
};

export default EditProfile;
