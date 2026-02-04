import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

const PublishCourse = () => {

    const {register, handleSubmit, setValue , getValues} = useForm();
    const dispatch = useDispatch();
    const {token} = useSelector((state)=>state.auth);
    const[ loading,setLoading] = useState(false);

    const goBack = () =>{
          dispatch(setStep(2));
    }

    const handleCoursePublish =()=>{
      
    }
    const onSubmit = () =>{
        handleCoursePublish();
    }


  return (
    <div className='rounded-md border-[1px] bg-richblack-800 p-6 border-richblack-700'>
      <p>Publish Course</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="public">Make this Course as Public
          <input 
            type="text"
            id='public'
            {...register("public")}
            className='rounded h-4 w-4'
          />
          <span className='ml-3'>Make this Course as Public </span>
          </label>
        </div>
        <div className='flex justify-end'>
          <button
          disabled={loading}
          className=' flex items-center rounded-md p-2 bg-richblue-300'
          onClick={goBack}>
            Back</button>
            <IconBtn
            disabled={loading}
            text="Save Changes"/>
        </div>
      </form>
    </div>
  )
}

export default index
