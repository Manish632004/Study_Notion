// This will prevent authenticated users from accesssing this route
import React from 'react';
import { useSelector } from 'react-redux';
import {Navigate} from "recat-router-dom";

const OpenRoute = () => {
    const {token} = useSelector((state)=>state.auth)
    if(token === null){

        return children
    }else{
        return <Navigate to="/dashboard/my-profile"/>
    }
  
}

export default OpenRoute
