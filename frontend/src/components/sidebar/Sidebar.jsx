import React from 'react'
import SearchInput from './SearchInput'
import Conversations from './Conversations'
import LogoutButton from './LogoutButton'

function sidebar() {
    return (
        <div className='flex min-w-[35%] min-h-[50%] flex-col border-r-2 border-slate-500 p-4'>
            <SearchInput />
            <div className='divider px-3' />
            <Conversations />
            <LogoutButton />
        </div>
    )
}

export default sidebar
