import React, { useState } from 'react'
import MessageInput from './MessageInput'
import Messages from './Messages'
import { TiMessages } from 'react-icons/ti'
import useConversation from '../../zustand/useConversation'
import { useEffect } from 'react'

function MessageContainer() {
  const { selectedConversation, setSelectedConversation } = useConversation()

  useEffect(() => {
    // CLEANUP WHEN COMPONENT UNMOUNTS
    return () => setSelectedConversation(null)
  }, [setSelectedConversation])

  return (
    <div className='flex flex-col flex-1'>
      {!selectedConversation ?
        <NoChatSelected />
        :
        <>
          <div className='flex items-center gap-4 bg-slate-500 p-4 mb-2'>
            <img className='h-8' src={selectedConversation.profilePic} alt="" />
            <span className='text-gray-900 font-bold'>{selectedConversation?.fullName}</span>
          </div>
          <Messages />
          <MessageInput />
        </>
      }
    </div>
  )
}

export default MessageContainer


const NoChatSelected = () => {
  return (
    <div className='flex items-center justify-center w-full h-full'>
      <div className='flex flex-col items-center gap-2 p-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold'>

        <p>Welcome 👋🏼 Snehesh Thattil ❄️</p>
        <p>Select a chat to start messaging</p>

        <TiMessages className='text-3xl md:text-6xl text-center' />
      </div>
    </div>
  )
}