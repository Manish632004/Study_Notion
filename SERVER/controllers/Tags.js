const Tag = require("../models/tags")

// create tag ka handler function
exports.createTag = async(req,res)=>{
    try {
        //data fetch 
        const {name,description} = req.body;
        
        //validation 
        if(!name || !description){
            return res.status(400).json({
                success:false,
                message:"Please fill all the fields"
            })
        }

        //create entry in db
        const tagDetails = await Tag.create({
            name:name,
            description:description,
        });
        console.log(tagDetails);

        // return response
        return res.status(200).json({
            success:true,
            message:"Tag created successfully",
            tagDetails,
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}


// getAll tags handler function 

exports.showAllTags = async(req,res)=>{
    try {
        //fetch all tags from db
        const allTags = await Tag.find({},{name:true,description:true});
        console.log(tags);
        //return response
        return res.status(200).json({
            success:true,
            message:"AllTags fetched successfully",
            allTags,
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}
