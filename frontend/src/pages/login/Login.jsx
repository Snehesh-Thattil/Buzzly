import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useLogin from '../../hooks/useLogin'

function login() {
    const [inputs, setInputs] = useState({ username: '', password: '' })

    const { loading, login } = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(inputs)
    }

    // BODY
    return (
        <div className='flex items-center justify-center mx-auto min-w-max border-2 rounded-md'>

            <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding
             backdrop-filter backdrop-blur-lg bg-opacity-0'>

                <h1 className='text-3xl font-semibold text-center text-gray-300'>
                    Login
                    <span className='text-green-200'> Buzzly</span>
                </h1>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Username</span>
                        </label>
                        <input
                            type="text"
                            placeholder='Enter username'
                            className='w-full input input-bordered h-10 placeholder:opacity-35 focus:outline-none'
                            value={inputs.username}
                            onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className='label'>
                            <span className='text-base label-text'>Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder='Enter password'
                            className='w-full input input-bordered h-10 placeholder:opacity-35 focus:outline-none'
                            value={inputs.password}
                            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                        />
                    </div>

                    <div>
                        <button type='submit' className='btn btn-block btn-sm mt-4 border
                         border-slate-700 transition-colors duration-500 hover:bg-green-600' disabled={loading}>
                            {loading ? <span className='loading loading-spinner'></span> : "Login"}
                        </button>
                    </div>

                    <Link to="/signup" className='text-sm hower:underline text-slate-300 hover:text-white mt-3 inline-block'>
                        Don't have an account?
                    </Link>
                </form>

            </div>
        </div>
    )
}

export default login
