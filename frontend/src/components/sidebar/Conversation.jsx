import React from 'react'
import useConversation from '../../zustand/useConversation'

function Conversation({ conversation, emoji, lastIndex }) {
    const { selectedConversation, setSelectedConversation } = useConversation()

    const isSelected = selectedConversation?._id === conversation?._id

    return (
        <>
            <div className={`flex items-center gap-2 rounded p-2 py-1 cursor-pointer
             ${isSelected ? 'bg-green-500' : ' hover:bg-green-400'} `}
                onClick={() => setSelectedConversation(conversation)}
            >
                <div className='avatar online '>
                    <div className='w-12 rounded-full '>
                        <img src={conversation.profilePic} alt="" />
                    </div>
                </div>

                <div className='flex flex-col flex-1'>
                    <div className='flex gap-3 justify-between'>
                        <p className='font-bold text-gray-200'>{conversation?.fullName}</p>
                        <span className='text-xl'>{emoji}</span>
                    </div>
                </div>
            </div>
            {!lastIndex && <div className='divider my-0 py-0 h-1' />}
        </>
    )
}

export default Conversation
