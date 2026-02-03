import React, { useEffect } from 'react'\
import { useForm } from 'react-hook-form';
import {toast} from 'react-hot-toast';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import{RxCross1} from "react-icons/rx";
import {useSelector} from "react-redux";
import Upload from '../Upload';
import IconBtn from '../IconBtn';
import {createSubSection,deleteSubSection,updateSubSection} from "../../../../../services/operations/courseDetailsAPI";
import {setCourse} from "../../redux/courseSlice";

const SubSectionModal = ({
    modalData,
    setModalData,
    add = false,
    view = false,
    edit = false,
}) => {

    const {
        register,
        handleSubmit,
        setvalue,
        formState:{errors},
        getValues
    } = useForm();\

    const dispatch = useDispatch();
    const [loading,setLoading] = useState(false);
    const {course} = useSelector((state)=> state.course);
    const{token} =useSelector((state)=> state.auth);

    useEffect(()=>{
        if(view || edit){
            setValue("lectureTitle",modalData.title);
            setValue("lectureDesc",modalData.description);
            setValue("lectureVideo",modalData.videoUrl);
        }
    },[])

    const isFormUpdated =()=>{
        const currentValues = getValues();
        if(currentValues.lectureTitle !== modalData.title ||
            currentValues.lecturesDesc !== modalData.description ||
            currentValues.lectureVideo !== modalData.videoUrl
        ){
            return true;
        }
        return false;
    }

    const onSubmit = () =>{
        if(view)
            return;
        if(edit){
           if(!isFormUpdated){
            toast.error("No changes mde to the form")
           } 
        }
        else{
            //edit krdo store me 
            handleEditSubSection();
        }
        return;
    }
    
    const formData = new FormData();
    formData.append("sectionId",modalData);
    formData.append("title,data.lectureTitle");
    formData.append("description",data.lectureDesc);
    formData.append("video",data.lectureVideo)
    setLoading(true);

    // API CALL 

    const result =await createSubSection(formData,token);

    if(result){
        //todo: check for updation 
        dispatch(setCourse(result));
    }
    setLoading(false);
    setModalData(null);
  return (
    <div>
        <div>
           <div>
             <p>{view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture</p>
            <button
            onClick={()=>(!loading ? setModalData(null):{})}>
                <RxCross1/>
            </button>
           </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Upload
                    name="lectureVideo"
                    label="Lecture Video"
                    register={register}
                    setValue={setValue}
                    errors={errors}
                    video={true}
                    viewData={view ? modalData.videoUrl : null}
                    editData = {edit ? modalData.videoUrl:null}
                />
                <div>
                    <label htmlFor="lectureTitle">Lecture Title</label>
                    <input type="text" 
                    id="lectureTitle" 
                    {...register("lectureTitle")}
                    placeholder='Enter Lecture Title'
                    className='w-full'/>{
                        errors.lectureTitle && (<span>Lecture Title is required</span>)
                    }
                </div>
                <div>
                    <label htmlFor="lectureDesc">Lecture Description</label>
                    <textarea name="lectureDesc"
                        id="lectureDesc" 
                        {...register("lectureDesc",{required:true})} 
                        placeholder='Enter Lecture Description' 
                        className='w-full min-h-[130px]'/>
                        {
                        errors.lectureDesc && (<span>Lecture Description is required</span>)
                    }
                </div>

                {
                    !view && (
                        <div>
                            <IconBtn
                                text={loading ?"Loading..." :edit ? "Save Changes": "Save"}/>
                        </div>
                    )
                }
            </form>
        </div>
    </div>
  )
}

export default SubSectionModal
