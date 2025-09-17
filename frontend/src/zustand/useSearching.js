import { create } from 'zustand'

const useSearching = create((set) => ({
    users: null,
    setUsers: (results) => set({ users: results })
}))

export default useSearching