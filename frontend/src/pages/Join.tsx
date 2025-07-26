import { useContext, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { RoomContext } from "../context/roomContext"


function Join() {

 
 const { setUsername, setRoom} = useContext(RoomContext)

 const [error, setError] = useState(false)


   const navigate = useNavigate()
  const usernameRef = useRef<HTMLInputElement>(null)

  const roomRef = useRef<HTMLInputElement>(null)

  function joinroom(){

    const username = usernameRef.current?.value
    const room = roomRef.current?.value

    if(username && room){
      console.log(username,room);
      
setUsername(username)
setRoom(room)

localStorage.setItem("username",username)
localStorage.setItem("room",room)

navigate("/chat")
      setError(false)

    }else{
      setError(true)
    }

  }



  return (
      <div className="min-h-screen bg-black flex pt-30  justify-center px-4 relative ">

<div className="absolute top-3 right-10 ">
  <button 

  onClick={() => {
  navigate("/home")}}
  
  className="text-green-500 text-lg font-semibold border-2 px-4 rounded-lg cursor-pointer">Back</button>
</div>

     <div >
      {/* Background decorative elements - subtle green glow */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-green-500 rounded-full opacity-5 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-green-500 rounded-full opacity-5 blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-green-500 rounded-full opacity-3 blur-2xl animate-pulse delay-500"></div>
       
      <div className="text-center max-w-5xl mx-auto relative z-10">
        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 font-doto">
          <span className="text-zinc-300 drop-shadow-[0_0_10px_rgba(212,212,212,0.3)]">
        <span className="text-green-500">  Join</span>  Real-Time Rooms
          </span>
          <br />
        </h1>

 <div className="mt-20 ">

<div className="my-5">
  {error && <div className="text-white pb-2.5">username and roomID is required</div>}

    <input 
    required
    ref={usernameRef}
placeholder="enter your username"
type="text" className="border-green-500 border-2 rounded text-green-400 py-2 pl-5 pr-10 tracking-wider font-medium focus:outline-none focus:border-green-700 focus:scale-105 transition-all duration-300 cursor-pointer" />
</div>

<div>

    <input 
    ref={roomRef}
    required
placeholder="enter your room"
type="text" className="border-green-500 border-2 rounded text-green-400 py-2 pl-5 pr-10 tracking-wider font-medium   focus:outline-none focus:border-green-700 focus:scale-105 transition-all duration-300 cursor-pointer" />
</div>


<button 
onClick={joinroom}
className="mt-5 px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(74,222,128,0.3)] hover:shadow-[0_0_30px_rgba(74,222,128,0.5)] font-doto">Join room</button>

 </div>

        

        {/* Buttons */}
 

        {/* Additional decorative elements */}
        <div className="mt-16 opacity-30">
          <div className="flex justify-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce delay-100"></div>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce delay-200"></div>
          </div>
        </div>
       
      </div>
      </div>
    </div>
  )
}

export default Join
