import React from 'react'
import { useDispatch, useSelector } from 'react-redux';


const ForgotPassword = () => {
    
    const [emailSent, setEmailSent] = useState(false);
    const [email,setEmail] = useState("");

    const {loading} = useSelector((state)=>state.auth);  
    const dispatch = useDispatch ();

    const handleSubmit =(e) =>{
        e.preventDefault;
        dispatch(getPasswordResetToken(email,setEmailSent));

    }
  return (
    <div>
    {
        loading ? (
            <div className=''>
                Loading...
            </div>
        ):(
            <div> 
                <h1>
                    {
                        !emailSent ? "Reset your Password":"Check Your Email"
                    }

                </h1>
                <p>
                    {
                        !emailSent ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery":`We have sent the reset email to ${email}`
                    }
                </p>
                <form onSubmit={handleSubmit}>
                    {
                        !emailSent &&(
                            <label >
                                <p>Email Address</p>
                                <input type="email" value={email} name="email" onChange={(e)=>setEmail(e.target.value)} placeholder='Enter Your Email Address'/>
                            </label>
                        )
                    }
                <button type='submit'>
                    {
                        !emailSent ? "Reset Password" : "Resend Email"
                    }
                </button>
                </form>

                <div>
                    <Link to="/login">
                    <p>Back to Login</p></Link>
                </div>
            </div>
        )
    }
    </div>
  )
}

export default ForgotPassword
