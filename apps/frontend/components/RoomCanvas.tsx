"use client";
import {useEffect,useState } from "react";
import { WS_URL } from "@/config";
import Canvas from "./Canvas";

export function RoomCanvas({roomId}:{
    roomId: string;
}) {  

    const [socket,setSocket]=useState<WebSocket | null>(null);     
    useEffect(()=>{
         const ws=new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJlY2Q2Y2Y0OS00ZGMzLTQwYzEtYWZlNC0yMDUyOTJjMWJkMTYiLCJpYXQiOjE3NTE2NDk2ODh9.8ceFeWa57ypBhdUTozt1HxbyfpsLI_slZHGFBvnT9aU`);
         ws.onopen=()=>{
            setSocket(ws);
            ws.send(JSON.stringify({
                type:"join_room",
                  roomId:roomId
            }));
         }
    },[]);
     if(!socket){
                  return <div>
                    Connecting to WebSocket Server...
                  </div>
            }

      return <div >
            <Canvas roomId={roomId} socket={socket} ></Canvas>
      </div>

}