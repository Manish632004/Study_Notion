const Profile = require("../models/Profile");
const User = require("../models/User");

// handler function 

exports.updateProfile = async (req,res)=>{
    try {
         // get data 
        const {dateOfBirth ="",about="",contactNumber, gender} = req.body;
         // get userId
        const id = req.user.id;
         // validation 
        if(!contactNumber || !gender){
            return res.status(400).json({
                success:false,
                message:"Please fill all the fields"
            })
        }
         //find profile 
        const userDetails = await User.findById(id);

        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId);

         // upate profile 
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.gender = gender;
        profileDetails.contactNumber = contactNumber ;

        await profileDetails.save();

        // return response 
        return res.status(200).json({
            success:true,
            message:"Profile updated successfully",
            profileDetails,
        })



    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Unable to update Profile ,Please try again",
            error:error.message,
        })
    }
}

// deleteAccount
// How can we  schedule this deletion operation 

exports.deleteAccount = async(req,res)=>{

    try{

        //get id 
        const id = req.user.id;
        //validation 
        const userDetails = await User.findById(id);
        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }

        // delete profile
        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});

        // todo :HW unenroll user from all enrolled courses 
        //delete user 
        await User.findByIdAndDelete({_id:id});

        // return response 
        return res.status(200).json({
            success:true,
            message:"Account deleted successfully",
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Unable to delete Account ,Please try again",
            error:error.message,
        })
    }
}

