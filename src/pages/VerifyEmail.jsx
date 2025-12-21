import React from 'react'
import { useSelector } from 'react-redux'

const VerifyEmail = () => {
    const {loading} = useSelector( (state)=> state.auth);
  return (
    <div>
      {
        loading ?(
            <div>
                Loading...
            </div>
        ):
        (
            <div>
                <h1>Verify Email</h1>
                <p>A verificatoin code has been sent to you. Enter the code below </p>
                <form onSubmit={handleOnSumbit}>
                    

                </form>
            </div>
        )
      }
    </div>
  )
}

export default VerifyEmail
