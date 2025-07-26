import { useContext, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { RoomContext } from "../context/roomContext"

type Message = {
  text:string,
  sender:"me"|"server"

}



function Chat() {

  const [message, setmessage] = useState<Message[]>([])

  console.log(message);
  

  const ws = useRef<WebSocket | null>(null);

   const { username, room} = useContext(RoomContext)


   const room1:string|null = localStorage.getItem("room")
   

    const navigate = useNavigate()
    const inputRef = useRef<HTMLInputElement>(null)

  
    const sendMessage = () => {
    const message = inputRef.current?.value;

    const messageToSend = {
      type: "chat",
      payload: {
        message: message
      }
    };

    ws.current?.send(JSON.stringify(messageToSend));

    //@ts-ignore
    setmessage((prev) => [...prev,{text:message,sender:"me"}])

    //@ts-ignore
 inputRef.current.value = ""
   
  };


    useEffect(() => {

      // 1. Connect to WebSocket
       ws.current = new WebSocket("ws://localhost:8080")

        // 2. On message receive
      ws.current.onmessage = (message) => {
        const messages = message.data

        setmessage((prev) => [...prev,{text:messages,sender:"server"}])
        
      }

      ws.current.onopen = () => {

        const joinPayload = {
          type:"join",
          "payload":{
            room1
          }
        }

        ws.current?.send(JSON.stringify(joinPayload))

      }
      

        // 4. On cleanup, close socket
    return () => {
      ws.current?.close();
    };

    },[room1])


    //++++++++++++++++++++++++++++++++


    const messagesEndRef = useRef<HTMLDivElement>(null);

const scrollToBottom = () => {
  messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
};

useEffect(() => {
  scrollToBottom();
}, [message]);


  return (
     <div className="flex flex-col justify-center items-center gap-5 bg-black w-full h-screen ">
      
   
<div className="w-[70%] h-[90vh] lg:w-[40%] border-2 rounded-lg p-5 flex flex-col gap-5 border-green-500">

  <div className="bg-slate-900 flex justify-between py-2 px-5 rounded-md">
    <h1 className="text-2xl font-semibold text-center text-green-500">
      roomID : <span className="text-red-400">{room1}</span>
    </h1>
    <button 
      onClick={() => navigate("/join")}
      className="bg-red-400 px-4 rounded-md text-white font-semibold"
    >
      Exit
    </button>
  </div>

  {/* Chat Messages - Improved container */}
  <div className="flex-1 overflow-y-auto pr-1 flex flex-col py-5">
   


  {message.map((data,index) =>   <div
    key={index}
    className={`flex ${data.sender === "me" ? "justify-end" : "justify-start"} w-full`}
  >
  
  <div className="flex justify-center items-center gap-2">
      <div className="w-8 h-8 bg-slate-500 rounded-full flex justify-center items-center overflow-hidden p-1">
       
      </div>
    <div
      className={`px-3 py-2 rounded-tr-lg rounded-bl-lg mt-2 text-white  break-words whitespace-pre-wrap ${
        data.sender === "me" ? "bg-slate-800 " : "bg-slate-700"
      }`}
    >
      {data.text}
    </div>
  </div>

  </div>)}




  </div>

  <div className="w-full">
    <input 
      placeholder="Message...."
      ref={inputRef}
      type="text" 
      className="border-2 w-[80%] px-3 border-green-400 py-2 rounded-tl-lg rounded-bl-lg text-white focus:outline-none focus:border-green-400 bg-transparent" 
      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
    />
    <button 
      onClick={sendMessage}
      className="border-2 border-green-300 text-white px-3 py-2 rounded-tr-lg rounded-br-lg bg-slate-900 font-semibold"
    >
      Send
    </button>
  </div>
</div>



    </div>
  )
}

export default Chat
