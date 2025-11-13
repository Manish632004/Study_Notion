const Section = require("../models/Section");
const Course = require("../models/Course");

exports.createSection = async(req,res)=>{
    try {
        //data fetch 
        const {sectionName, courseId} = req.body;

        // data validation
        if(!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message:"Missing Properties"
            })
        }
         // create section 
        const newSection = await Section.create({sectionName});

        // update course with section objectid
        const updateCourseDetails = await Course.findByIdAndUpdate(courseId,{
            $push:{
                courseContent: newSection._id,
            }
        },
        {
            new:true,
        }
        );
        /// hw: use populate to replace section /sub-sections both in the updatedCourseDetails

        console.log(updateCourseDetails);
        
        // return response
        return res.status(200).json({
            success:true,
            message:"Section created successfully",
            data:updateCourseDetails,
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed to create Section",
            error:error.message,
        })
        
    }
}

// update section handler

exports.updateSection = async(req,res) =>{
    try {

        //data input 

        const {sectionName,sectionId} = req.body;

        // data validation

        if(!sectionName || !sectionId){
            return res.status(400).json({
                success:false,
                message:"Missing Properties"
            })
        }

        // update data 
        const section = await Section.findByIdAndUpdate(sectionId,{sectionName},{new:true})

        // return response
        return res.status(200).json({
            success:true,
            message:"Section updated successfully",
            data:section,
        })

        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Unable to update Section ,Please try again",
            error:error.message,
        })
        
    }
}

// delete section ka handler function 

exports.deleteSection = async(req,res)=>{
    try {
        //get Id -- assuming that we  are sending id in params
        const {sectionId} = req.params
        // user findByIdandDelete
        await Section.findByIdAndDelete(sectionId);
        // Todo : do we need to delete the entry from the course entry 
        //return response
        return res.status(200).json({
            success:true,
            message:"Section deleted successfully",
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Unable to delete Section ,Please try again",
            error:error.message,
        })
    }
}