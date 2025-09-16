import Message from './Message'
import useFetchChats from '../../hooks/useFetchChats'
import MessageSkeleton from '../skeletons/MessageSkeleton'
import { useEffect, useRef } from 'react'

function Messages() {
    const { loading, messages } = useFetchChats()
    const lastMessageRef = useRef()

    useEffect(() => {
        lastMessageRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    return (
        <div className='px-4 flex-1 overflow-auto'>
            {loading && [...Array(3)].map((_, index) => <MessageSkeleton key={index} />)}

            {!loading && messages.length === 0 && (
                <p className='text-center'>Send a message to start conversation</p>
            )}

            {!loading && messages.length > 0 && messages.map((message) => (
                <div key={message._id} ref={lastMessageRef}>
                    <Message message={message} />
                </div>)
            )}
        </div>
    )
}

export default Messages
