import React from 'react'
import Conversation from './Conversation'
import useFetchConversations from '../../hooks/useFetchConversations'
import { getRandomEmoji } from '../../utils/emojis'

function Conversations() {
    const { loading, conversations } = useFetchConversations()

    return (
        <div className='py-2 flex flex-col overflow-auto'>

            {(!conversations || conversations.length === 0) ? (
                <span className='mx-auto'>No Conversations</span>
            ) : (
                conversations.map((conversation, index) => (
                    <Conversation
                        key={conversation._id}
                        conversation={conversation}
                        emoji={getRandomEmoji()}
                        lastIndex={index === conversations.length - 1}
                    />
                ))
            )}

            {loading ? <span className='loading loading-spinner mx-auto'></span> : null}
        </div>
    )
}

export default Conversations
