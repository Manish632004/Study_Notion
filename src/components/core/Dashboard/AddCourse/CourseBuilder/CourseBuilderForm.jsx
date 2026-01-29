import React, { useState } from 'react';
import {MdAddCircleOutline} from "react-icons/md"
import {BiRightArrow} from "react-icons/bi"
import { useDispatch } from 'react-redux';
import { setEditCourse } from '../../../../../slices/courseSlice';

const CourseBuilderForm = () => {

    const {register,handleSubmit, setValue, formState:{errors}} = useForm();
    const [editSectionName,setEditSectionName] = useState(null);
    const {course} = useSelector((state)=>state.course);
    const dispatch = useDispatch();
    const [loading,setLoading] = useState(false);
    const {token} = useSelector((state)=>state.auth);

    const onSubmit = async(data)=>{
        setLoading(true);
        let result;
        
        if(editSectionName){
            // we are editing the section name 
            result = await updateSection(
                {
                    sectionName :data.sectionName,
                    sectionId: editSectionName,
                    courseId :course._id,
                },token
            )
        }
        else{
            result = await createSection({
                sectionName:data.sectionName,
                courseId:course._id,
            },token)
        }

        // update value
        if(result){
            dispatch(setCourse(result));
            setEditSectionName(null);
            setValue("sectionName","");

            
        }
        // loading false
        setLoading(false)
    }
    const cancelEdit =()=>{
        setEditSectionName(null);
        setValue("sectionName","");
    }

    const goBack =()=>{
        dispatch(setStep(1));
        dispatch(setEditCourse(true));
    }

    const gotoNext =()=>{
        if(course.courseContent.length === 0){
            toast.error("Please add at least one section");
            return;
        }
       
        if(course.courseContent.some((section)=>section.subSection.length === 0)){
            toast.error("Please add at least one lecture in each  section");
            return;
        }
        // if everything is good 
        dispatch(setStep(2));
    }
/// handle change in edit section
    const handleChangeEditSectionName = (sectionId, sectionName) =>{

        if(editSectionName === sectionId){
            cancelEdit();
            return;
        }
        setEditSectionName(sectionId);
        setValue("sectionName",sectionName);

    }
  return (
    <div className='text-white'>
       <p>Course Builder </p>

       <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div>
            <label htmlFor="sectionName">Section Name <sup>*</sup></label>
            <input 
            type="text"
            id="sectionName"
            placeholder='Add Section name'
            {...register("sectionName",{required:true})}
            className='w-full'
            />
            {
                errors.sectionName && (
                    <span>Section Name is required</span>
                )
            }
        </div>
        <div className='mt-10 flex gap3'>
            <IconBtn
            type="submit"
            text={editSectionName ?  "Edit Section Name" :"Create Section"}
            outline={true}
            customClasses ={"text-white"}

            >
                <MdAddCircleOutline className='text-yellow-50' size={20}/>

            </IconBtn>
            {editSectionName && (
                <button 
                type='button' 
                onClick={cancelEdit}
                className='text-sm text-richblack-300 underline'>Cancel Edit</button>
            )}
        </div>
       </form>

       {course.courseContent.length > 0 && (
        <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
       ) }

       <div className='flex justify-end gap-x-3 mt-10'>
        <button
        onClick={goBack}
        className='rounded-md cursor-pointer flex items-center'>Back</button>
        <IconBtn
        text="Next"
        onclick={gotoNext}>
            <BiRightArrow/>
        </IconBtn>

       </div>
    </div>
  )
}

export default CourseBuilderForm
