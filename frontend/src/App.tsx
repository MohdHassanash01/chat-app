import { BrowserRouter,Route,Routes,  } from "react-router-dom"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import Home from "./pages/Home"
import Join from "./pages/Join"
import Chat from "./pages/Chat"
import { RoomContextProvider } from "./context/roomContext"


function App() {
  return (
   <BrowserRouter>
   
   <RoomContextProvider>

   <Routes>

    <Route path="/" element={<Signin/>}/>
    <Route path="/signup" element={<Signup/>}/>
    
    <Route path="/home" element={<Home/>} />

    <Route path="/join" element={<Join/>} />

    <Route path="/chat" element={<Chat/>} />



   </Routes>

</RoomContextProvider>
   </BrowserRouter>
  )
}




export default App
