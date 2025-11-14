const mongoose = rquire("mongoose");

const ratingAndReview  = new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    rating:{
        type:Number,
        required:true,
    },
    review:{
        tyep:String,
        required:true
    },
    course:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Course",
        index:true,
    }

})

module.exports = mongoose.model("RatingAndReview",ratingAndReview);