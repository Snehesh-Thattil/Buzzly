import { createContext, useContext, useState } from "react";

// CONTEXT DECLARATION
export const AuthContext = createContext()

// CREATED A HOOK FOR ACCESSING AUTH CONTEXT
export const useAuthContext = () => {
    return useContext(AuthContext)
}

// PROVIDER TO WRAP ON APP
export function AuthContextProvider({ children }) {
    const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("buzzly-user")) || null)

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser }}>
            {children}
        </AuthContext.Provider>
    )
}