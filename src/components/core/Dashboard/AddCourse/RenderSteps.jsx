import React from 'react'
import { FaCheck } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import CourseInformationForm from './CourseInformation/CourseInformationForm';

const RenderSteps = () => {

    const {step} = useSelector((state)=>state.course);

    const steps = [
        {
            id:1,
            title:"Course Information"
        },
        {
            id:2,
            title:"Course Builder"
        }, 
        {
            id:3,
            title:"Publish"
        },
    ]
  return (
    <>
        <div>
            {steps.map((items) =>(
                <>
                    <div>
                        <div className={`${step === items.id ? "bg-yellow-900 border-yellow-50 text-yellow-50":"border-richblue-700 bg-richblue-800 text-richblue-300"}`}>
                        {
                            step > items.id ? (<FaCheck/>):(items.id)
                        }
                        </div> 
                   </div>
                   {/* add code for dashes between the labels */}

                </>
            ))}
        </div>

        <div>
            {
                steps.map((item)=>(
                    <>
                    <div>
                        <p>{item.title}</p>
                    </div>
                    </>
                ))
            }
        </div>

        {step===1 && <CouseInformationForm/>}
        {step===2 && <CouseBuilderForm/>}
        {/* {step===3 && <PublishCourse/>} */}
    </>
  )
}

export default RenderSteps
