import React from 'react'
import { capitalize } from '../Utils/helper';

const UserCard = ({user}) => {
    const {firstName,lastName,photosUrl,gender,about,age,skills}=user;
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
        <button className="btn btn-primary">Ignore</button>
        <button className="btn btn-secondary">Interested</button>
      </div>
    </div>
  </div>
  )
}

export default UserCard
