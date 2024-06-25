import React from 'react'

const Resume = () => {
  return (
    <div className=''>
        <form>
            <label>Name</label>
            <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Enter Name"
            value={""}
            // onChange={(e) => setName(e.target.value)}
          />
          <div className='mb-4'>
            <label className=''>Profile</label>
            <textarea className='' id='profile' 
            placeholder='ENter profile here..'
            ></textarea>

          </div>
          <div className='mb-4'>
            <label className=''>Experience</label>
            <textarea className='' id='experience' 
            placeholder='ENter experience here..'
            ></textarea>

          </div>
          <div className='mb-4'>
            <label className=''>Education</label>
            <textarea className='' id='education' 
            placeholder='Enter Education...'
            ></textarea>

          </div>
          <div className='mb-4'>
            <label className=''>Skills</label>
            <textarea className='' id='skills' 
            placeholder='Enter skills..'
            ></textarea>
             <div className='mb-4'>
            <label className=''>Certificates</label>
            <textarea className='' id='profile' 
            placeholder='Enter certificates...'
            ></textarea>
             <div className='mb-4'>
            <label className=''>Projects</label>
            <textarea className='' id='projects' 
            placeholder='Enter project...'
            ></textarea>
             <div className='mb-4'>
            <label className=''>Languages</label>
            <textarea className='' id='languages' 
            placeholder='Enter Languages..'
            ></textarea>

          </div>

          </div>

          </div>

          </div>
        </form>

    </div>
  )
}

export default Resume;