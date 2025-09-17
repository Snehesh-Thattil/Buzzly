import React from 'react'
import SearchInput from './SearchInput'
import Conversations from './Conversations'
import LogoutButton from './LogoutButton'
import useSearching from '../../zustand/useSearching'
import SearchResults from '../search/SearchResults'

function Sidebar() {
    const { users } = useSearching()

    return (
        <div className='flex min-w-[35%] h-[60%] sm:h-full flex-col border-r-2 border-slate-500 p-4'>
            <SearchInput />

            <div className='divider px-3' />

            {users ? <SearchResults users={users} /> : <Conversations />}
            <LogoutButton />
        </div>
    )
}

export default Sidebar
