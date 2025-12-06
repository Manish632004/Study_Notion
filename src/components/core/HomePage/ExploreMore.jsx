import React, { useState } from 'react';
import { HomePageExplore } from '../../../data/homepage-explore';
import HighlightText from './HighlightText';
import CourseCard from './CourseCard';
const tabsName =[
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths"

]

const ExploreMore = () => {
    const [currentTab,setCurrentTab] = useState(tabsName[0]);
    const [courses,setCourses]= useState(HomePageExplore[0].courses);
    const [currentCard,setCurrentCard]=useState(HomePageExplore[0].courses[0].heading);

    const setMyCards = (value) =>{
        setCurrentTab(value);
        const result = HomePageExplore.filter((course)=>course.tag === value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    }


  return (
    <div className='flex flex-col items-center justify-center'>
        {/* heading  */}
      <div className='text-4xl font-semibold text-center'>
        Unlock the 
        <HighlightText text={"Power of Code"}/>
      </div>
      <p className='text-center text-richblue-300 text-sm text-[16px] mt-3'>
        Learn to build anything you can imagine
      </p>

      {/* tabs  */}
    <div className='flex w-fit rounded-full bg-richblue-800 mb-5 mt-5 px-1 py-1 border-richblack-100'>
         {
        tabsName.map((element,index)=>{
            return (
                <div className={`text-[16px] flex flex-row items-center gap-2 ${currentTab === element ? "bg-richblue-900  text-richblack-5 font-medium":"text-richblack-200 "} rounded-full  transition-all duration-200 cursor-pointer hover:bg-richblue-900 hover:text-richblack-5 py-3 px-5`}
                key={index}
                onClick={()=> setMyCards(element)}
                >
                    {element}
                </div>
            )
        })
      }
    </div>

        {/* Cards   */}

        <div className='lg:h-[150px] mb-12'>
                 {/* course card ka group  */}
                <div className='p-5 flex items-center gap-4'>
                    {
                        courses.map((element,index) =>{
                            return(
                                <CourseCard
                                key={index}
                                cardData ={element}
                                currentCard={currentCard}
                                setCurrentCard={setCurrentCard}
                                />
                            )
                        })
                    }
                </div>
        </div>
    
    </div>
  )
}

export default ExploreMore;
