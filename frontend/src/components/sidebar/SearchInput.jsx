import React, { useRef } from 'react'
import toast from 'react-hot-toast'
import { IoSearchSharp } from 'react-icons/io5'
import useSearchUsers from '../../hooks/useSearchUsers'
import useSearching from '../../zustand/useSearching'

function searchInput() {
    const { loading, search } = useSearchUsers()
    const { setUsers } = useSearching()
    const inputRef = useRef()

    function handleSearch(e) {
        e.preventDefault()

        const searchQuery = inputRef.current.value.trim()
        if (!searchQuery) return setUsers(null)

        if (searchQuery.length < 3) {
            toast.error('Search must contain 3 characters')
            return
        }

        search(searchQuery)
    }

    return (
        <form className='flex items-center gap-2' onSubmit={handleSearch}>
            <input
                type="text"
                ref={inputRef}
                placeholder='Search..'
                className='input input-bordered rounded-full' />

            <button type='submit' className='btn btn-circle bg-green-400 text-white'>
                {loading ? <span className='loading loading-spinner'></span> : <IoSearchSharp className='w-6 h-6 outline-none' />}
            </button>
        </form>
    )
}

export default searchInput
