import React from 'react'

const Signup = () => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-md'>
        <h2 className='text-2xl font-bold mb-6 text-center'>Sign Up</h2>
          {/* Form submit */}
          <form className='space-y-4'>
            <div>
              <label>Username</label>
              <input type='text' id='username' value={username} onChange={(e) => setUsername(e.target.value)}
              className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
              />
            </div>

          </form>

      </div>
        
    </div>
  )
}

export default Signup;