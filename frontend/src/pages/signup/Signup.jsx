import React, { useState } from 'react'
import GenderBox from './GenderBox'
import { Link } from 'react-router-dom'
import useSignup from '../../hooks/useSignup'

function Signup() {
  const [inputs, setInputs] = useState({
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    gender: ''
  })

  const { loading, signup } = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(inputs)
  }

  // CALLBACK FOR PASSING ON <GENDERBOX>
  const handleGenderChange = (gender) => {
    setInputs({ ...inputs, gender })
  }

  // BODY
  return (
    <div className='flex items-center justify-center mx-auto min-w-max border-2 rounded-md'>

      <div className='flex flex-col gap-4 w-full p-6 rounded-lg shadow-xl bg-gray-400 bg-clip-padding
       backdrop-filter backdrop-blur-2xl bg-opacity-0'>

        <h1 className='text-3xl font-semibold text-center text-gray-300'>
          SignUp
          <span className='text-green-200'> Buzzly</span>
        </h1>

        <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
          <div>
            <label className='label p-1'>
              <span className='text-base label-text'>Full Name</span>
            </label>
            <input
              type="text"
              placeholder='Snehesh Thattil'
              className='w-full input input-bordered h-10 placeholder:opacity-35 focus:outline-none'
              value={inputs.fullName}
              onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="" className='label p-1'>
              <span className='text-base label-text'>Username</span>
            </label>
            <input
              type="text"
              placeholder='sneheshthattil'
              className='w-full input input-bordered h-10 placeholder:opacity-35 focus:outline-none'
              value={inputs.username}
              onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="" className='label p-1'>
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
            <label htmlFor="" className='label p-1'>
              <span className='text-base label-text'>Confirm Password</span>
            </label>
            <input
              type="password"
              placeholder='Confirm password'
              className='w-full input input-bordered h-10 placeholder:opacity-35 focus:outline-none'
              value={inputs.confirmPassword}
              onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
            />
          </div>

          <GenderBox onCheckboxChange={handleGenderChange} selectedGender={inputs.gender} />

          <div>
            <button className='btn btn-block btn-sm mt-4 border border-slate-700 transition-colors duration-500 hover:bg-green-600' disabled={loading}>
              {loading ? <span className='loading loading-spinner'></span> : "Signup"}
            </button>
          </div>

          <Link to="/login" className='text-sm hower:underline text-slate-300 hover:text-white mt-3 inline-block'>
            Already have an account?
          </Link>
        </form>

      </div>
    </div>
  )
}

export default Signup
