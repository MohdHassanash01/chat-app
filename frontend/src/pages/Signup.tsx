

import axios from "axios";
import {  useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

export default function Signup(){

  const navigate = useNavigate()
  const emailRef = useRef<HTMLInputElement>(null)

  const passwordRef = useRef<HTMLInputElement>(null)


     const [error, setError] = useState(null)
      const [loading, setLoading] = useState(false);

      async function handleSignin(){

        const email = emailRef.current?.value
        const password = passwordRef.current?.value

        setLoading(true);
 try {
  
      const res = await   axios.post(`${apiUrl}/api/v1/signup`,{
            email,
            password
        })

        console.log(res);
        

        console.log("response : ",res.data.token);
     
        const token = res.data.token
        if (token) {
        localStorage.setItem("token",res.data.token)
        navigate("/home")
        }
       
        setLoading(false)

 } catch (error) {

   if (axios.isAxiosError(error)) {

    console.log(error.response?.data.message);
    

        setError( error.response?.data.message );
      } 
      setLoading(false)
      
 }
   
      }

            // for navigate to home page
      const token = localStorage.getItem("token")
      console.log(token);
      


    return (
        <>

       <div className="flex flex-col justify-center sm:h-screen p-4 bg-black">


      <div className="max-w-md w-full mx-auto border border-green-300 rounded-2xl p-8">

        <div className="text-center mb-5 font-bold text-2xl bg-gradient-to-r from-green-300 to-green-800 bg-clip-text text-transparent">
         Sign up
        </div>

        
        {error && (
          <div className="mb-2 p-2 bg-red-100 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        <form>
          <div  className="space-y-6">

            <div>
              <label  className="text-green-500 text-sm font-medium mb-2 block">Email Id</label>
              <input 
              ref={emailRef}
              name="email" type="email"  className="text-slate-900 font-semibold bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500 " placeholder="Enter email" />
            </div>


            <div>
              <label  className="text-sm font-medium mb-2 block text-green-500">Password...</label>
              <input
              ref={passwordRef}
              name="password" type="password"  className="text-slate-900 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter password" />
            </div>



            <div  className="flex items-center">
              <input 
              id="remember-me" name="remember-me" type="checkbox"  className="h-4 w-4 shrink-0 text-green-600 focus:ring-green-500 border-gray-300 rounded" />
              <label   className="text-slate-600 ml-3 block text-sm">
                I accept the <a href="javascript:void(0);"  className="text-green-600 font-medium hover:underline ml-1">Terms and Conditions</a>
              </label>
            </div>
          </div>



 
          <div  className="mt-12">
            <button 
            
            onClick={handleSignin}
            type="button"  className={`w-full py-3 px-4 text-sm tracking-wider font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none cursor-pointer ${loading ? "opacity-70 cursor-not-allowed":"cursor-pointer"}`}>
             {loading ? 'Creating account...' : 'Create an account'}
            </button>
          </div>


          <p  className="text-slate-600 text-sm mt-6 text-center">You have an account? <Link to="/"  className="text-green-600 font-medium hover:underline ml-1">Signin here</Link></p>
        </form>

      </div>
    </div> 
       
        </>
    )
}