import React from 'react'
import { BiLogOut } from 'react-icons/bi'
import useLogout from '../../hooks/useLogout'

function LogoutButton() {
    const { loading, logout } = useLogout()

    return (
        <div className='mt-auto'>
            {!loading ?
                < BiLogOut className='w-6 h-6 text-center cursor-pointer rounded-full
                 hover:text-slate-600 transition-colors duration-300' onClick={logout} />
                :
                <span className='loading loading-spinner'></span>}
        </div>
    )
}

export default LogoutButton
