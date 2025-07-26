// roomContext.tsx
import { createContext, useState,type ReactNode } from "react";

type RoomContextType = {
  username: string| null;
  setUsername: (name: string) => void;
  room: string | null;
  setRoom: (room: string) => void;
};


export const RoomContext  = createContext<RoomContextType | null>(null);

export function RoomContextProvider({ children }: { children: ReactNode }) {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  return (
    <RoomContext.Provider value={{ username, setUsername, room, setRoom }}>
      {children}
    </RoomContext.Provider>
  );
}
