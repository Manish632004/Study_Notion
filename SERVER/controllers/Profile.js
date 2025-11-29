const Profile = require("../models/Profile");
const User = require("../models/User");

// handler function 

exports.updateProfile = async (req, res) => {
    try {
        // get data 
        const { dateOfBirth = "", about = "", contactNumber, gender } = req.body;
        // get userId
        const id = req.user.id;
        // validation 
        if (!contactNumber || !gender) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields"
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
        profileDetails.contactNumber = contactNumber;

        await profileDetails.save();

        // return response 
        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            profileDetails,
        })



    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to update Profile ,Please try again",
            error: error.message,
        })
    }
}

// deleteAccount
// How can we  schedule this deletion operation 

exports.deleteAccount = async (req, res) => {

    try {

        //get id 
        const id = req.user.id;
        //validation 
        const userDetails = await User.findById(id);
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        // Delete Assosiate Profile with the user 
        await Profile.findByIdAndDelete({ _id: userDetails.additionalDetails });

        // todo :HW unenroll user from all enrolled courses 
        //delete user 
        await User.findByIdAndDelete({ _id: id });

        // return response 
        return res.status(200).json({
            success: true,
            message: "Account deleted successfully",
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to delete Account ,Please try again",
            error: error.message,
        })
    }
}

// Get all user details
exports.getAllUserDetails = async (req, res) => {
    try {
            const id = req.user.id;
            const userDetails = await User.findById(id)
                .populate("additionalDetails")
                .exec();
            console.log(userDetails);
            res.status(200).json({
                success: true,
                message: "User Data fetched successfully",
                data: userDetails,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
}

// Get Enrolled Courses (stub)
exports.getEnrolledCourses = async (req, res) => {
    try {
        return res.status(200).json({ success: true, courses: [] });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Failed to fetch enrolled courses", error: error.message });
    }
}

// Update Display Picture (stub)
exports.updateDisplayPicture = async (req, res) => {
    try {
        const displayPicture = req.files.displayPicture;
        const userId = req.user.id;
        const image = await uploadImageToCloudinary(
            displayPicture,
            process.env.FOLDER_NAME,
            1000,
            1000
        )
        console.log(image)
        const updatedProfile = await User.findByIdAndUpdate(
            { _id: userId },
            { image: image.secure_url },
            { new: true }
        )
        res.send({
            success: true,
            message: `Image Updated successfully`,
            data: updatedProfile,
        })
    } catch (error) {
        console.log("Error in updateDisplayPicture", error)
        return res.status(500).json({
            success: false,
            message: error.message,
            
        })
    }
}
