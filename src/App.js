import "./App.css";
import {Route,Routes} from "react-router-dom";
import  Home from "./pages/Home";
import Navbar from "./components/common/Navbar"
import ForgotPassword from "./pages/ForgotPassword";
import About from "./pages/About";
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
    
        {/* <Route path="/signup" element={<Signup/>}/> */}
        {/* <Route path="/login" element={<Login/>}/> */}

      </Routes>

    </div>
  );
}

export default App;
