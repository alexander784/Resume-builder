import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
// import ResumeDetails from './ResumeDetails'; // Import ResumeDetails component

const Resume = () => {
  const navigate = useNavigate();
  const [resumeData, setResumeData] = useState(null);

  // Check for the authentication token
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const formik = useFormik({
    initialValues: {
      name: '',
      profile: '',
      experience: '',
      education: '',
      skills: '',
      certificates: '',
      projects: '',
      languages: '',
      createdAt: '',
    },
    onSubmit: async (values) => {
      // Retrieve access token
      const token = localStorage.getItem('access_token');

      try {
        const response = await fetch('http://localhost:5000/resume/resume', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(values),
        });
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        console.log('Form submitted successfully:', data);
        setResumeData(data); // Update the state with the submitted data
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('access_token');

      try {
        const response = await fetch('http://127.0.0.1:5000/resume/resume', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        
        // Update formik values with fetched data
        formik.setValues({
          name: data.name,
          profile: data.profile,
          experience: data.experience,
          education: data.education,
          skills: data.skills,
          certificates: data.certificates,
          projects: data.projects,
          languages: data.languages,
          createdAt: data.createdAt,
        });
        setResumeData(data); // Update the state with the fetched data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <form onSubmit={formik.handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            name="name"
            type="text"
            placeholder="Enter Name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="profile">
            Profile
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="profile"
            name="profile"
            placeholder="Enter Profile"
            value={formik.values.profile}
            onChange={formik.handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="experience">
            Experience
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="experience"
            name="experience"
            placeholder="Enter Experience"
            value={formik.values.experience}
            onChange={formik.handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="education">
            Education
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="education"
            name="education"
            placeholder="Enter Education"
            value={formik.values.education}
            onChange={formik.handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="skills">
            Skills
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="skills"
            name="skills"
            placeholder="Enter Skills"
            value={formik.values.skills}
            onChange={formik.handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="certificates">
            Certificates
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="certificates"
            name="certificates"
            placeholder="Enter Certificates"
            value={formik.values.certificates}
            onChange={formik.handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="projects">
            Projects
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="projects"
            name="projects"
            placeholder="Enter Projects"
            value={formik.values.projects}
            onChange={formik.handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="languages">
            Languages
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="languages"
            name="languages"
            placeholder="Enter Languages"
            value={formik.values.languages}
            onChange={formik.handleChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
      
      {/* Render ResumeDetails component with resumeData */}
      {/* <ResumeDetails resume={Resume} /> */}
    </div>
  );
};

export default Resume;
