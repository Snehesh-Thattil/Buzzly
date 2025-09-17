import React from 'react'
import Conversation from '../sidebar/Conversation'
import { getRandomEmoji } from '../../utils/emojis'
import useSearching from '../../zustand/useSearching'

function SearchResults({ users }) {
    const { setUsers } = useSearching()

    return (
        <div className='flex flex-col bg-black bg-opacity-10 w-full h-[60%] sm:h-[75%] mb-1 rounded-lg p-1'>

            <div className='flex items-center justify-between p-1'>
                <p className='text-left pb-3 text-slate-300 font-bold'>Search Results:</p>
                <button onClick={() => setUsers(null)} className='font-bold rounded-md bg-white bg-opacity-50 hover:bg-opacity-75 px-2'> ❌ </button>
            </div>

            <div className='overflow-auto flex flex-col h-full'>
                {(!users || users.length === 0) ? (
                    <span className='mx-auto  text-slate-200 m-auto'>No user found</span>
                ) : (
                    users.map((user, index) => (
                        <Conversation
                            key={user._id}
                            conversation={user}
                            emoji={getRandomEmoji()}
                            lastIndex={index === users.length - 1}
                        />
                    ))
                )}
            </div>

        </div>
    )
}

export default SearchResults
