import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom'; // Import Navigate from react-router-dom

const Template = () => {
  const [resumeData, setResumeData] = useState({
    name: 'Your Name',
    profile: 'A brief profile summary.',
    experience: [
      {
        company: 'Company Name',
        position: 'Position',
        duration: 'Duration',
        description: 'Description of responsibilities and achievements.',
      },
    ],
    education: [
      {
        school: 'School Name',
        degree: 'Degree',
        duration: 'Duration',
      },
    ],
    skills: 'List your skills here.',
    certificates: 'List your certificates here.',
    projects: 'List your projects here.',
    languages: 'List the languages you speak here.',
    // profileImage: '',
  });

  const fileInputRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    // console.log('Token:', token);
    if (token) {
      axios.get('http://127.0.0.1:5000/resume/resume', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }).then(response => {
        setResumeData(response.data);
      }).catch(error => {
        console.error('Error fetching resume data:', error);
      });
    }
  }, []);

  const handleChange = (field, value) => {
    setResumeData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleExperienceChange = (index, field, value) => {
    const newExperience = resumeData.experience.map((exp, i) =>
      i === index ? { ...exp, [field]: value } : exp
    );
    setResumeData((prevData) => ({ ...prevData, experience: newExperience }));
  };

  const handleEducationChange = (index, field, value) => {
    const newEducation = resumeData.education.map((edu, i) =>
      i === index ? { ...edu, [field]: value } : edu
    );
    setResumeData((prevData) => ({ ...prevData, education: newEducation }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setResumeData((prevData) => ({ ...prevData, profileImage: reader.result }));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const token = localStorage.getItem('token');
    console.log('Saving resume data:', resumeData);
    if (token) {
      axios.post('http://127.0.0.1:5000/resume/resume', resumeData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        console.log('Resume saved successfully:', response.data);
      }).catch((error) => {
        console.error('Error saving resume:', error);
      });
    } else {
      console.error('No token found in localStorage');
      // You can redirect to the login page or handle the error as per your application flow
      // Example of redirect using Navigate from react-router-dom
      // return <Navigate to="/login" />;
    }
  };

  if (!localStorage.getItem('token')) {
    // Redirect to login or display an error message
    return <Navigate to="/login" />;
  }

  return (
    <div className="text-center max-w-4xl mx-auto p-4 bg-white shadow-lg justify-center">
      <div className="flex justify-between items-center mb-6">
        <div className="bg-yellow-300">
          <h1
            className="text-4xl font-bold"
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => handleChange('name', e.target.innerText)}
          >
            {resumeData.name}
          </h1>
          <p
            className="text-lg mt-2"
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => handleChange('profile', e.target.innerText)}
          >
            {resumeData.profile}
          </p>
        </div>
        <div>
          <img
            src={resumeData.profileImage || ''}
            alt="Profile"
            className="w-32 h-32 object-cover rounded-full shadow-lg cursor-pointer"
            onClick={() => fileInputRef.current.click()}
          />
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />
        </div>
      </div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Experience</h2>
        {resumeData.experience.map((exp, index) => (
          <div key={index} className="mb-4">
            <h3
              className="font-bold"
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => handleExperienceChange(index, 'company', e.target.innerText)}
            >
              {exp.company}
            </h3>
            <p
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => handleExperienceChange(index, 'position', e.target.innerText)}
            >
              {exp.position}
            </p>
            <p
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => handleExperienceChange(index, 'duration', e.target.innerText)}
            >
              {exp.duration}
            </p>
            <p
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => handleExperienceChange(index, 'description', e.target.innerText)}
            >
              {exp.description}
            </p>
          </div>
        ))}
      </div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Education</h2>
        {resumeData.education.map((edu, index) => (
          <div key={index} className="mb-4">
            <h3
              className="font-bold"
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => handleEducationChange(index, 'school', e.target.innerText)}
            >
              {edu.school}
            </h3>
            <p
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => handleEducationChange(index, 'degree', e.target.innerText)}
            >
              {edu.degree}
            </p>
            <p
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => handleEducationChange(index, 'duration', e.target.innerText)}
            >
              {edu.duration}
            </p>
          </div>
        ))}
      </div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Skills</h2>
        <p
          className="w-full p-2 border"
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => handleChange('skills', e.target.innerText)}
        >
          {resumeData.skills}
        </p>
      </div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Certificates</h2>
        <p
          className="w-full p-2 border"
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => handleChange('certificates', e.target.innerText)}
        >
          {resumeData.certificates}
        </p>
      </div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Projects</h2>
        <p
          className="w-full p-2 border"
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => handleChange('projects', e.target.innerText)}
        >
          {resumeData.projects}
        </p>
      </div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Languages</h2>
        <p
          className="w-full p-2 border"
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => handleChange('languages', e.target.innerText)}
        >
          {resumeData.languages}
        </p>
      </div>
      <button
        onClick={handleSave}
        className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
      >
        Save
      </button>
    </div>
  );
};

export default Template;
