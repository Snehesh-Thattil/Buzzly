import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import { io } from "socket.io-client"

// CONTEXT DECLARATION
const SocketContext = createContext()

// CREATED A HOOK FOR ACCESSING SOCKET CONTEXT
const useSocketContext = () => useContext(SocketContext);

// PROVIDER TO WRAP ON APP
const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const { authUser } = useAuthContext()

    useEffect(() => {
        if (authUser) {
            const socket = io("https://buzzly-o6c8.onrender.com", {
                query: {
                    userId: authUser._id
                }
            })

            setSocket(socket)

            // SOCKET.ON IS USED TO LISTEN EVENTS. CAN BE USED BOTH ON CLIENT AND SERVER SIDE
            socket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users)
            })

            return () => socket.close()
        }
        else {
            if (socket) {
                socket.close()
                setSocket(null)
            }
        }
    }, [authUser])

    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    )
}

export { SocketContextProvider, useSocketContext }