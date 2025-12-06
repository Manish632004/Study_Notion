import React from 'react';
import { HomePageExplore } from '../../../data/homepage-explore';
import lesson from"../../../assets/Images/lessons.svg";
import union from"../../../assets/Images/Union.svg";


const CourseCard = ({cardData,currentCard,setCurrentCard}) => {
  return (
    <div className='w-[340px] h-[300px] bg-richblack-800 flex flex-col justify-between hover:bg-white hover:text-richblack-800 transition-all duration-200'
    onClick={setCurrentCard}>
      <div className='flex flex-col p-4'>
        <h1 className='mb-4'>{cardData.heading}</h1>
      <p>{cardData.description}</p>
      </div>
        {/* about  */}
        <div className='flex justify-between p-5 border-t-2 border-dotted border-richblack-100'>
            <div className='flex gap-2'>
                <img src={union}alt="" />
                <div>{cardData.level}</div>
            </div>
            <div className='flex gap-2'>
                <img src={lesson}alt="" />
                <div>{cardData.lessionNumber} Lessons</div>
            </div>

        </div>
        
      </div>
    
  )
}

export default CourseCard
