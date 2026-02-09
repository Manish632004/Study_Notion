import "./App.css";
import {Route,Routes} from "react-router-dom";
import  Home from "./pages/Home";
import Navbar from "./components/common/Navbar"
import ForgotPassword from "./pages/ForgotPassword";
import About from "./pages/About";
import { Outlet } from "react-router-dom";
import MyProfile from "./components/core/Dashboard/MyProfile";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Error from "./pages/Error";
import { ACCOUNT_TYPE } from "./components/utils/constants";
// import Signup from "./pages/Signup";
// import Login from "./pages/Login"

function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="signup" element={
          <OpenRoute>
            <Signup />

          </OpenRoute>

        }/><Route path="login" element={
          <OpenRoute>
            <Login />

          </OpenRoute>

        }/>
        <Route path="forgot-password" element={
          <OpenRoute>
            
          </OpenRoute>
        }/>
        <Route path="forgot-password" element={
          <OpenRoute>
            <ForgotPassword/>
          </OpenRoute>
        }/>
        <Route path="update-password/:id" element={
          <OpenRoute>
            <UpdatePassword/>
          </OpenRoute>
        }/>
      <Route path="verify-email" element={
          <OpenRoute>
            <VerifyEmail/>
          </OpenRoute>
        }/> 
        <Route path="about" element={
          <OpenRoute>
            <About/>
          </OpenRoute>
        }/>

        {/* about ka route  */}
        <Route path="/contact" element={<Contact/>}/>
    
        {/* <Route path="/signup" element={<Signup/>}/> */}
        {/* <Route path="/login" element={<Login/>}/> */}
        
        {/* dashboard ka route  */}


        

        <Route path="dashboard/my-profile" element={<PrivateRoute>
          <Dashboard/>
        </PrivateRoute>}>
          <Route path="dashboard/my-profile" element={<Dashboard/>}/>
          <Route path="dashboard/settings" element={<Settings/>} />
          
          {
            user?.accountType === ACCOUNT_TYPE.STUDENT &&(
              <>
              <Route path="dashboard/cart" element={<Cart/>} />
          <Route path="dashboard/enrolled-courses" element={<EnrolledCourses/>} />
              </>
            )
          }
      
        </Route>

        <Route path="*" element={<Error/>}/>

      </Routes>

    </div>
  );
}

// after so many days daddy is back to work 

// JUST ANOTHER DAY OF THE GIT PUSH

// just another day of the git push 

export default App;
