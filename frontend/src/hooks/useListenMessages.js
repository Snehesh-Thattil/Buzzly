import React, { useEffect } from 'react'
import useConversation from '../zustand/useConversation'
import { useSocketContext } from '../contexts/SocketContext'
import notificationSound from '../assets/sounds/notification.mp3'

const useListenMessages = () => {
    const { socket } = useSocketContext()
    const { messages, setMessages } = useConversation()

    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            newMessage.shouldShake = true
            new Audio(notificationSound).play()
            
            setMessages([...messages, newMessage])
        })

        return () => socket?.off("newMessage")
    }, [socket, messages, setMessages])
}

export default useListenMessages
