import React from 'react'
import useConversation from '../../zustand/useConversation'
import { useAuthContext } from '../../contexts/AuthContext'
import { extractTime } from '../../utils/extractTime'

function Message({ message }) {
    const { selectedConversation } = useConversation()
    const { authUser } = useAuthContext()

    const formatedTime = extractTime(message.createdAt)
    const fromMe = message.senderId === authUser._id
    const chatClassName = fromMe ? 'chat-end' : 'chat-start'
    const profilePic = fromMe ? authUser?.profilePic : selectedConversation?.profilePic
    const bubbleBgColor = fromMe ? 'bg-green-700' : 'bg-green-500'

    return (
        <div className={`chat ${chatClassName}`}>
            <div className='chat-image avatar'>
                <div className='w-8 rounded-sm'>
                    <img src={profilePic} alt="" />
                </div>
            </div>

            <p className={`chat-bubble text-white ${bubbleBgColor} rounded-2xl break-words whitespace-pre-wrap`}>{message.message}</p>
            <p className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formatedTime}</p>
        </div>
    )
}

export default Message
