import React from 'react'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

const MyProfile = () => {

    const {user} = useSelector ((state)=>state.proifle);
    const navigate =useNaviage();
  return (
    <div className='text-white'>
      <h1>My Profile</h1>
      <div>
        <div>
            <img src={user?.image} alt={`profile-${user?.firstName}`}
            className='aspect-square w-[78px] rounded-full object-cover' />
            <div>
                <p>{user?.firstName + " " + user?.lastName}</p>
                <p>{user?.email}</p>
            </div>

        </div>
        <IconBtn
            text="Edit"
            onClick={() =>{
                navigate("/dashboard/settings")
            }}/>
      </div>


    </div>
  )
}

export default MyProfile
