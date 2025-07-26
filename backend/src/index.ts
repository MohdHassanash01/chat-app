import dotenv from "dotenv"

dotenv.config()

import express from "express"
import cors from "cors"
import {WebSocketServer, WebSocket} from "ws"
import { userRouter } from "./routes/userRouter";


const wss = new WebSocketServer({port:8080})
const app = express()
const PORT = process.env.PORT || 3000

interface User {
    socket: WebSocket;
    room: string
}


let allSockets: User[] = []

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(cors());


app.use("/api/v1",userRouter)


wss.on("connection",(socket) => {

    console.log("user connected");


    // reacived message from client 
    socket.on("message",(message) => {

        // console.log(message);
        
        const parseMessage = JSON.parse(message as unknown as string)

        console.log("parsemessage : ",parseMessage);

        if (parseMessage.type === "join" ) {
            allSockets.push({
                socket,
                room: parseMessage.payload.room
            })
        }



        // method 1 
        // if (parseMessage.type === "chat") {
        //     console.log("user wants to chat")

        //     let currentUserRoom = null 
        //     for (let i = 0; i < allSockets.length; i++) {
        //      if (allSockets[i].socket == socket) {
        //         currentUserRoom = allSockets[i].room
        //      }
                
        //     }


        //     for (let i = 0; i < allSockets.length; i++) {
        //         if (allSockets[i].room == currentUserRoom) {
        //             allSockets[i].socket.send(parseMessage.payload.message)
        //         }
                
        //     }


        // }


        // method 2


if (parseMessage.type === "chat") {
    console.log("user wants to chat");

    const currentUserRoom = allSockets.find(item => item.socket === socket)?.room;

    allSockets.forEach(({ room, socket: sock }) => {
        if (room === currentUserRoom && sock !== socket) {
            sock.send(parseMessage.payload.message);
        }
    });
}


    })

    socket.on("close", () => {
    console.log("user disconnected");
    allSockets = allSockets.filter(user => user.socket !== socket);
});
    
})




app.listen(PORT, function(){
    console.log(`server is runing on ${PORT}`);
})

