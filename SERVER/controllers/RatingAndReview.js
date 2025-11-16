const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");
const mongoose = require("mongoose");

// create Rating

exports.createRating = async(req,res)=>{
    try {
        //get user id 
        const userId = req.user.id;

        // fetchdata form req body 
        const {courseId,rating,review} = req.body;
        // check if use is enrolled or not 
        const courseDetails = await Course.findOne( 
                {
                    _id:courseId,
                    studentsEnrolled:{$elemMatch:{$eq:userId}}
                }
            );
        if(!courseDetails){
            return res.status(404).json({
                success:false,
                message:"Student is not enrolled in the course"
            })
        }
        // check if user already reviewed the course
        const alreadyReviewed = await RatingAndReview.findOne({
                                        user:userId,
                                        course:courseId,
        })
        if(alreadyReviewed){
            return res.status(403).json({
                success:false,
                message:'Course is already reviewed by the user',
            })
        }
        // create rating 
        const ratingReview = await RatingAndReview.create({
                                        rating,review,
                                        course:courseId,
                                        user:userId
        })
        // updte course with this rating/review
        const updatedCourseDetails =await Course.findByIdAndUpdate({_id:courseId},{
                                        $push:{
                                            ratingAndReviews:ratingReview._id,
                                        }},
                                        {new:true}
        );
        console.log(updatedCourseDetails);

        //return response 
        return res.status(200).json({
            success:true,
            message:"Rating and review created successfully",
            data:ratingReview,
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success:false,
            message:"Failed to create Rating and Review",
            error:error.message,
        })
    }
}

//  getAverage Rating 
exports.getAverageRating = async(req,res)=>{
    try {
        // get course Id
        const courseId = req.body.courseId;
        // calculate avg rating
        const result = await RatingAndReview.aggregate([
            {
                $match:{
                    course:new mongoose.Types.ObjectId(courseId),
                },
            },
            {
                $group:{
                    _id:null,
                    averageRating:{
                        $avg:"$rating"
                    }
                }
            }
        ])
        // retrun rating
        if(result.length >0){
            return res.status(200).json({
                success:true,
                message:"Average Rating fetched successfully",
                averageRating:result[0].averageRating
            })
        }
        //if no rating / review exit '
        return res.status(200).json({
            success:true,
            message:"Average Rating is 0 , no rating s given till now",
            averageRating:0

        })        
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success:false,
            message:"Failed to get Average Rating",
            error:error.message,
        })
    }
}

//getAllRating

exports.getAllRating = async(req,res)=>{
    try {
        const allReviews = await RatingAndReview.find({})
                                .sort({rating:"desc"})
                                .populate({
                                    path:"user",
                                    select:"firstName lastName email"
                                })
                                .populate({
                                    path:"course",
                                    select:"courseName"
                                })
                                .exec();

        //return response
        return res.status(200).json({
            success:true,
            message:"All Reviews fetched successfully",
            data:allReviews,
        });
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success:false,
            message:"Failed to get Average Rating",
            error:error.message,
    })

}}