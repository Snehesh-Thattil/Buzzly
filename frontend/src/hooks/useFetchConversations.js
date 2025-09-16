import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

function useFetchConversations() {
    const [loading, setLoading] = useState(false)
    const [conversations, setConversations] = useState()

    useEffect(() => {
        const getConversations = async () => {
            setLoading(true)
            try {
                const res = await fetch('/api/users/fetch-conversations')
                const data = await res.json()
                if (data.error) throw new Error(data.error)

                setConversations(data)
            }
            catch (err) {
                toast.error(err)
            }
            finally {
                setLoading(false)
            }
        }

        getConversations()
    }, [])

    return { loading, conversations }
}

export default useFetchConversations
