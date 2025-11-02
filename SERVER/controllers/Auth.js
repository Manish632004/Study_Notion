const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//sendotp
exports.sendOTP = async (req, res) => {

    try {
        // fetch email from request ki body 
        const { email } = req.body;

        //check if user already exist

        const checkUserPresent = await User.findOne({ email });

        // if user already exist ,then return a response 

        if (checkUserPresent) {
            return res.status(401).json({
                success: false,
                message: "User already registered"
            })
        }

        // generate otp 

        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets: fals,
            lowerCaseAlphabets: false,
            specialChars: false,
        }
        );
        console.log("OTP generated:", otp);


        // check unique otp or not 
        const result = await OTP.findOne({ otp: otp });

        while (result) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: fals,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
            result = await OTP.findOne({ otp: otp });

        }

        const otpPayload = { email, otp };

        //create an entry for opt

        const otpBody = await OTP.create(otpPayload);
        console.log(otpBody);

        //return respnse successfully 

        res.status(200).json({
            success: true,
            message: "OTP SENT SUCCESSFULLY",
            otp,
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }

}


//Signup 

exports.signUp = async (req, res) => {
    try {
        // data fetch 
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            contactNumber,
            otp
        } = req.body;
        // validate 

        if (!firstName || !lastName || !email || !password || !confirmPassword || !accountType || !contactNumber || !otp) {
            return res.status(403).json({
                success: false,
                message: "Please fill all the fields"
            })
        }
        // 2 password match karo
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password and confirm password do not match"
            })
        }

        // check user already exist
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({
                success: false,
                message: "User already registered"
            })
        }

        //find most recent otp stored for the user 
        const recentOTP = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
        console.log("recentOTP", recentOTP);

        //validate top 
        if (recentOTP.length == 0) {
            return res.status(400).json({
                success: false,
                message: " OTP not found"
            })
        }

        else if (recentOTP !== otp) {
            // invalid otp 
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            })
        }


        // hash password 
        const hashedPassword = await bcrypt.hash(password, 10);

        //create entry in db 

        //profile

        const profileDetails = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: null,
        })
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            accountType,
            contactNumber,
            additionalDetails:profileDetails._id,
            image: `https://api.dicebear.com/7.x/initials/svg?seed=${firstName} ${lastName}`,

        })

        // return res

        return res.status(200).json({
            success:true,
            message:"User registered Successfully",
            user
        })

    } catch (error) {
        console.log("Error in signUp controller", error);
        return res.status(500).json({
            success: false,
            message: "user cannot be registered. Please try again",
        })
    }

}

// Login
exports.login = async(req,res)=>{
    try {
        //get data from req body 
        const {email,password} = req.body;

        // validation data 
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Please fill all the fields "
            })
        }

        //user check exist or not 
        const user = await User.findOne({email}).populate("additionalDetails");
        if(!user){
            return res.status(401).json9({
                success:false,
                message:"User is not registered please signup first"
            })
        }


        // generate Jwt ,after password mathcing 
        if(await bcrypt.compare(password,user.password)){
            const payload ={
                email:user.email,
                id:user._id,
                role:user.accountType,
            }

            const token = jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"2h",
            })
            user.token = token;
            user.password = undefined;
            
            
            //create cookie and send response
            
        const options ={
            expires:new Date(Date.now()+3*24*60*60*1000),
            httpOnly:true,
        }
        
        res.cookie("token",token,options).status(200).json({
            success:true,
            token,
            user,
            message:"Login Successfully"
        })
        
    }
    else{
        return res.status(401).json({
            success:false,
            message:"Password is incorrect "
        })
    }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Login failed, please try again"
        })
        
    }
}


// changePassword
// todo:HO
exports.changePassword  = async (req,res)=>{
    try{
        // get data from req body
        // get oldpassword ,newPassword , confirmNewPasswor
        //validation

        //update pwd in db 
        //send mail -password updated successfully
        // return res


    }catch(error){

    }
}