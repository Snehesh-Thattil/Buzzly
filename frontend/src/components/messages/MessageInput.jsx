import React, { useRef, useState } from 'react'
import { BsSend } from 'react-icons/bs'
import useSendMessage from '../../hooks/useSendMessage'
import toast from 'react-hot-toast'

function MessageInput() {
  const { loading, sendMessage } = useSendMessage()
  const inputRef = useRef()

  // HANDLE SEND MESSAGE CLICK
  const handleSubmit = async (e) => {
    e.preventDefault()

    const message = inputRef.current.value.trim()
    if (!message) return
    if (message.length > 500) return toast.error('Message cannot exceed 500 characters')

    await sendMessage(message)

    inputRef.current.value = ""
    inputRef.current.focus()
  }

  return (
    <form className='px-4 my-3' onSubmit={handleSubmit}>
      <div className='w-full relative'>
        <input
          className='border text-sm pr-9 rounded-lg block w-full p-2.5 bg-gray-700 text-white'
          type="text"
          placeholder='Send a message'
          disabled={loading}
          ref={inputRef}
        />

        <button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
          {loading ? <span className='loading loading-spinner'></span> : <BsSend />}
        </button>
      </div>
    </form>
  )
}

export default MessageInput
