import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import useConversation from '../zustand/useConversation'

function useFetchChats() {
    const [loading, setLoading] = useState(false)

    const { messages, setMessages, selectedConversation } = useConversation()

    useEffect(() => {
        const getMessages = async () => {
            setLoading(true)
            try {
                const res = await fetch(`/api/messages/fetch-chats/${selectedConversation._id}`)
                const data = await res.json()
                if (data.error) throw new Error(data.error)

                setMessages(data)
            }
            catch (err) {
                toast.error(err.message)
            }
            finally {
                setLoading(false)
            }
        }

        if (selectedConversation) getMessages()

    }, [selectedConversation, setMessages])

    return { loading, messages }
}

export default useFetchChats
