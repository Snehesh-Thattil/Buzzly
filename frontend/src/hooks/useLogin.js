import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useAuthContext } from '../contexts/AuthContext'

function useLogin() {
    const [loading, setLoading] = useState()
    const { setAuthUser } = useAuthContext()

    const login = async ({ username, password }) => {

        // REST API CALL TO THE BACKEND
        try {
            setLoading(true)
            if (!username || !password) throw new Error('Please fill in all fields')

            const res = await fetch('/api/auth/login', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            })

            const data = await res.json()
            if (data.error) throw new Error(data.error)

            // UPDATE ON LOCALSTORAGE
            localStorage.setItem("buzzly-user", JSON.stringify(data))

            // UPDATE ON AUTH CONTEXT
            setAuthUser(data)
        }
        catch (err) {
            toast.error(err.message)
        }
        finally {
            setLoading(false)
        }
    }

    return { loading, login }
}

export default useLogin
