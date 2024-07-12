import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Template = () => {
  const [resumeData, setResumeData] = useState({
    name: 'Your Name',
    profile: 'A brief profile summary.',
    aboutMe: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    experience: [
      {
        company: 'Company Name',
        position: 'Position',
        duration: 'Duration',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      },
    ],
    education: [
      {
        school: 'School Name',
        degree: 'Degree',
        duration: 'Duration',
      },
    ],
    skills: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    certificates: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    projects: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    languages: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    profileImage: '',
  });

  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get('http://127.0.0.1:5000/resume/resume', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const resume = response.data.resumes;
          if (resume) {
            setResumeData({
              ...resume,
              experience: JSON.parse(resume.experience),
              education: JSON.parse(resume.education),
            });
          } else {
            console.error('No resume found.');
          }
        }
      } catch (error) {
        console.error('Error fetching resume data:', error);
      }
    };

    fetchResumeData();
  }, []);

  const handleChange = (field, value) => {
    setResumeData(prevData => ({ ...prevData, [field]: value }));
  };

  const handleExperienceChange = (index, field, value) => {
    const newExperience = resumeData.experience.map((exp, i) =>
      i === index ? { ...exp, [field]: value } : exp
    );
    setResumeData(prevData => ({ ...prevData, experience: newExperience }));
  };

  const handleEducationChange = (index, field, value) => {
    const newEducation = resumeData.education.map((edu, i) =>
      i === index ? { ...edu, [field]: value } : edu
    );
    setResumeData(prevData => ({ ...prevData, education: newEducation }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setResumeData(prevData => ({ ...prevData, profileImage: reader.result }));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleView = () => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/viewresume');
    } else {
      navigate('/login');
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const dataToSave = {
          ...resumeData,
          experience: JSON.stringify(resumeData.experience),
          education: JSON.stringify(resumeData.education),
        };
        const response = await axios.post('http://127.0.0.1:5000/resume/resume', dataToSave, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Resume saved successfully:', response.data);
      } else {
        console.error('No token found in localStorage');
        navigate('/login');
      }
    } catch (error) {
      console.error('Error saving resume:', error);
    }
  };

  if (!localStorage.getItem('token')) {
    navigate('/login');
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto p-12 bg-gray-200 shadow-xl">
      <div className="flex">
        <div className="w-1/3 p-4 bg-gray-500">
          <div className="flex flex-col items-center mb-6">
            <img
              src={resumeData.profileImage || ''}
              alt="Profile"
              className="w-32 h-32 object-cover rounded-full shadow-lg cursor-pointer mb-4"
              onClick={() => fileInputRef.current.click()}
            />
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
            <h1
              className="text-4xl font-bold text-center"
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => handleChange('name', e.target.innerText)}
            >
              {resumeData.name}
            </h1>
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
              className="p-2 border"
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
              className="p-2 border"
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => handleChange('certificates', e.target.innerText)}
            >
              {resumeData.certificates}
            </p>
          </div>
        </div>
        <div className="w-2/3 p-4 bg-white">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">About Me</h2>
            <p
              className="p-2 border"
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => handleChange('aboutMe', e.target.innerText)}
            >
              {resumeData.aboutMe}
            </p>
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
            <h2 className="text-2xl font-bold mb-2">Projects</h2>
            <p
              className="p-2 border"
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
              className="p-2 border"
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => handleChange('languages', e.target.innerText)}
            >
              {resumeData.languages}
            </p>
          </div>
          
        </div>
      </div>
      <button onClick={handleView} className="mr-4">
            View Resume
          </button>
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
