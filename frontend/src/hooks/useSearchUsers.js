import React, { useState } from 'react'
import toast from 'react-hot-toast'
import useSearching from '../zustand/useSearching'

function useSearchUsers() {
    const [loading, setLoading] = useState(false)
    const { setUsers } = useSearching()

    const search = async (sarchQuery) => {

        setLoading(true)
        try {
            const res = await fetch(`/api/users/search-users/${sarchQuery}`)

            const data = await res.json()
            if (data.error) throw new Error(data.error)

            setUsers(data)
        }
        catch (err) {
            toast.error(err.message)
        }
        finally {
            setLoading(false)
        }
    }

    return { loading, search }
}

export default useSearchUsers