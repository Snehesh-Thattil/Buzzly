import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useAuthContext } from '../contexts/AuthContext'

function useLogout() {
    const [loading, setLoading] = useState(false)
    const { setAuthUser } = useAuthContext()

    const logout = async () => {
        try {
            setLoading(true)
            const res = await fetch('/api/auth/logout')

            const data = await res.json()
            if (data.error) throw new Error(data.error)

            // REMOVE FROM LOCALHOST
            localStorage.removeItem("buzzly-user")

            // REMOVE FROM CONTEXT
            setAuthUser(null)
            
            toast.success("User logged out successfully")
        }
        catch (err) {
            toast.error(err.message)
        }
        finally {
            setLoading(false)
        }
    }

    return { loading, logout }
}

export default useLogout
