import React from 'react'

const Services = () => {
  return (
   <section className="hero min-h-screen bg-gray-400 text-black flex items-center">
    <div className="container mx-auto">
        <div className="grid grid-flow-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-400 p-6  rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Create your best Resume</h2>
                <p className="text-black">Ralphy resume is the best</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Service 2</h2>
            <p className="text-gray-700">Description of Service 2. Provide some details here as well.</p>
          </div>
          
          {/* Column 3 */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Service 3</h2>
            <p className="text-gray-700">Description of Service 3. Include relevant information here.</p>

            </div>
        </div>
        

    </div>

   </section>
  )
}

export default Services;