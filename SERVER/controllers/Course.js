const Course = require("../models/Course");
const Tag = require("../models/tags");
const User = require("../models/User");
const {uploadImageToCloudinary} = require("../utils/imageUploader");

// createCourse handler function 
exports.createCourse = async(req,res) =>{
    try {
        
        //fetch data 
        const {courseName, courseDescription,whatYouWillLearn,price,tag} =req.body;

        //get tumbnail 
        const tumbnail = req.files.tumbnailImage;

        //validation
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !tag || !tumbnail){
            return res.status(400).json({
                success:false,
                message:"Please fill all the fields"
            });

        }

        //check for instructor
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);

        console.log("instructorDetails : ",instructorDetails);
        
        if(!instructorDetails){
            return res.status(404).json({
                success:false,
                message:"Instructor details not found"
            })
        }

        // check given tag is valid or not 
        const tagDetails = await Tag.findById(tag);
        if(!tagDetails){
            return res.status(404).json({
                success:false,
                message:"Tag details not found"
            })
        }
        
        // upload Tumbnail image to cloudinary 

        const tumbnailImage = await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME);

        // Create an entry for new course
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor:instructorDetails._id,
            whatYouWillLearn:whatYouWillLearn,
            price,
            tag:tagDetails._id,
            thumbnail:tumbnailImage.secure_url,
        });


        // add the new course to the user Schema of instructor

        await User.findByIdAndUpdate(
            {_id:instructorDetails._id},
            {
                $push:{
                    courses:newCourse._id,
                }
            },
            {new:true}
        )

        // update the tag Schema  // todo hw

        //return response 
        return res.status(200).json({
            success:true,
            message:"Course created successfully",
            data:newCourse,
        });


    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success:false,
            message:"Failed to create Course",
            error:error.message,
        })
    }
}

//getAllCourses handler function  
exports.getAllCourses = async(req,res)=>{
    try{
        //fetch all courses from db
        const allCourses = await Course.find({},{courseName:true,
            courseDescription:true,
            price:true,
            thumbnail:true,
            instructor:true,
            ratingAndReviews:true,
            studentsEnrolled:true, 
        }).populate("intructor")
        .exec();
        console.log(allCourses);
        //return response
        return res.status(200).json({
            success:true,
            message:"AllCourses fetched successfully",
            data:allCourses,
        })
    }
    catch(error){
        console.error(error)
        return res.status(500).json({
            success:false,
            message:"Failed to fetch Courses",
            error:error.message,
        })
    }
}

// getCourseDetails
exports.getCourseDetails = async(req,res)=>{
    try {
        //ftech course id
        const {courseId} = req.body;
         // find course Details
        
        const courseDetails = await Course.findById(
                                {_id:courseId})
                            .populate(
                                {
                                    path:"instructor",
                                    populate:{
                                        path:"additionalDetails"
                                    },
                                    
                                }
                            )
                            .populate("category")
                            .populate("ratingAndreviews")
                            .populate(
                                {
                                    path:"courseContent",
                                    populate:{
                                        path:"subSection"
                                    }
                                }
                            )
                            .exec();

                            
        

        // validation 
        if(!courseDetails){
            return res.status(400).json({
                success:false,
                message:`Course not found the course with ${courseId}`
            })
        }

        // return response
        return res.status(200).json({
            success:true,
            message:"Course Details fetched successfully",
            data:courseDetails,
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success:false,
            message:"Failed to fetch Course Details",
            error:error.message,
        })
    }
}
