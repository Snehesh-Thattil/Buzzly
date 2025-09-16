import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useAuthContext } from '../contexts/AuthContext'

function useSignup() {
    const [loading, setLoading] = useState(false)
    const { setAuthUser } = useAuthContext()

    const signup = async ({ fullName, username, gender, password, confirmPassword }) => {

        // VALIDATE ISSUES IN THE USER SIGNUP INPUTS
        const validationPassed = handleInputErrors({ fullName, username, gender, password, confirmPassword })
        if (!validationPassed) return

        // REST API CALL TO THE BACKEND
        try {
            setLoading(true)
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fullName, username, password, confirmPassword, gender })
            })

            // DATA FROM THE BACKEND
            const data = await res.json()
            if (data.error) throw new Error(data.error)

            // SAVE USER ON LOCALHOST
            localStorage.setItem("buzzly-user", JSON.stringify(data))

            // SAVE USER ON CONTEXT
            setAuthUser(data)
        }
        catch (err) {
            toast.error(err.message)
        }
        finally {
            setLoading(false)
        }
    }

    return { loading, signup }
}

export default useSignup


//  INPUT VALIDATION FUNCTION
function handleInputErrors({ fullName, username, gender, password, confirmPassword }) {

    if (!fullName || !username || !gender || !password || !confirmPassword) {
        toast.error('Please fill in all fields')
        return false
    }

    if (password !== confirmPassword) {
        toast.error('Passwords do not match')
        return false
    }

    if (password.length < 6) {
        toast.error('Password must contain 6 characters')
        return false
    }

    return true
}