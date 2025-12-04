import React from 'react';
import CTAButton from "../HomePage/Button";
import HighlightText from './HighlightText';
import { FaArrowRight } from 'react-icons/fa';
import { TypeAnimation } from 'react-type-animation';

const CodeBlocks = ({
    position,heading ,subheading,ctabtn1,ctabtn2,codeblock,backgroundGradient,codeColor
}) => {
return (
    <div className={`flex ${position} my-20 justify-between gap-10`}>
      {/* section 1 */}
    <div className=''>
        {heading}
        <div>
            {subheading}
        </div>
        <div className='flex gap-7 mt-7'>
            <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
                <div className='flex gap-2 items-center'>
                    {ctabtn1.btnText}
                    <FaArrowRight/>
                </div>
            </CTAButton>
            <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
                    {ctabtn2.btnText}
                
                
            </CTAButton>
           
        </div>
    </div>

    {/* section 2 */}
    <div className='h-fit w-[100%] text-[15px] flex py-3 lg:[500px] relative bg-white bg-opacity-5'>
        {/* Bg gradient */}
        <div className=' absolute bottom-12 -left-10 w-[350px] h-[250px] bg-white rounded-full bg-gradient-to-br to-white via-[#FFA500] from-[#8A2BE2] opacity-30 blur-2xl'></div>
        <div className=' px-3 flex flex-col w-[10%] text-richblack-400 font-inter font-bold'>
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
            <p>6</p>
            <p>7</p>
            <p>8</p>
            <p>9</p>
            <p>10</p>
            <p>11</p>
        </div>
        <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2`}>
            <TypeAnimation
            sequence={[codeblock,5000,""]} 
            repeat ={Infinity}
            cursor={true}
            style={
                {
                    display:"block",
                    // whiteSpace:"pre-line"
                }
            }
            omitDeletionAnimation={true}
            />

        </div>
    </div>
    </div>
)
}

export default CodeBlocks
