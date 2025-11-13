const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const uploadImageToCloudinary = require("../utils/imageUploader");

//create Subsection 
exports.createSubSection = async(req,res)=>{
    try {
        // fetch data from req body 
        const {sectionId,title,timeDuration ,description} = req.body;

        //extract file/video
        const video = req.files.videoFile;

        //validation 
        if(!sectionId || !title || !timeDuration || !description || !video){
            return res.status(400).json({
                success:false,
                message:"Missing Properties"
            })
        }

        // upload video to cloudinary 
        const uploadDetails = await uploadImageToCloudinary(video,process.env.FOLDER_NAME);

        //create a sub section 
        const subSectionDetails = await SubSection.create({
            // sectionId,
            title:title,
            timeDuration:timeDuration,
            description:description,
            videoUrl:uploadDetails.secure_url,
            // videoId:uploadDetails.public_id,
        })
        // update section with this sub section ObjectId
        const updatedSection = await Section.findByIdAndUpdate({_id:sectionId},
                                                {$push:{
                                                    subSection:subSectionDetails._id,
                                                }},
                                                {new:true}
        );

        // HW : log updated section here ,after adding populate query 


        // retrun response 
        return res.status(200).json({
            success:true,
            message:"SubSection created successfully",
            // data:subSection,
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Unable to create SubSection ,Please try again",
            error:error.message,
        })
    }
}


// HW : delete subsection 

exports.deleteSubSection = async(req,res)=>{
    try {
        // get id 
        const {subSectionId} = req.params;
        // delete sub section 
        await SubSection.findByIdAndDelete(subSectionId);
        // return response 
        return res.status(200).json({
            success:true,
            message:"SubSection deleted successfully",
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Unable to delete SubSection ,Please try again",
            error:error.message,
        })
    }
}