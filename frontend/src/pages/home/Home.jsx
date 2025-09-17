import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import MessageContainer from '../../components/messages/MessageContainer'

function home() {
    return (
        <div className='flex flex-col md:flex-row w-[100%] lg:w-[75%] h-[100%] md:h-[60%] lg:h-[85%]
        overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg
        bg-opacity-0 border-2 rounded-md'>

            <Sidebar />
            <MessageContainer />
        </div>
    )
}

export default home
