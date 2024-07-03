import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ViewResume = () => {
  const [resumeData, setResumeData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get('http://127.0.0.1:5000/resume/resume', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('Fetched resume data:', response.data);

        const resume = response.data.resumes[0];

        if (resume) {
          setResumeData({
            ...resume,
            experience: resume.experience,
            education: resume.education,
          });
        } else {
          console.error('No resume found.');
        }
      } catch (error) {
        console.error('Error fetching resume data:', error);
      }
    };

    fetchResumeData();
  }, [navigate]);

  if (!resumeData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="text-center max-w-4xl mx-auto p-4 bg-white shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <div className="bg-yellow-300">
          <h1 className="text-4xl font-bold">{resumeData.name}</h1>
          <p className="text-lg mt-2">{resumeData.profile}</p>
        </div>
        <div>
          <img
            src={resumeData.profileImage || ''}
            alt="Profile"
            className="w-32 h-32 object-cover rounded-full shadow-lg"
          />
        </div>
      </div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Experience</h2>
        {resumeData.experience.map((exp, index) => (
          <div key={index} className="mb-4">
            <h3 className="font-bold">{exp.company}</h3>
            <p>{exp.position}</p>
            <p>{exp.duration}</p>
            <p>{exp.description}</p>
          </div>
        ))}
      </div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Education</h2>
        {resumeData.education.map((edu, index) => (
          <div key={index} className="mb-4">
            <h3 className="font-bold">{edu.school}</h3>
            <p>{edu.degree}</p>
            <p>{edu.duration}</p>
          </div>
        ))}
      </div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Skills</h2>
        <p className="w-full p-2 border">{resumeData.skills}</p>
      </div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Certificates</h2>
        <p className="w-full p-2 border">{resumeData.certificates}</p>
      </div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Projects</h2>
        <p className="w-full p-2 border">{resumeData.projects}</p>
      </div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Languages</h2>
        <p className="w-full p-2 border">{resumeData.languages}</p>
      </div>
    </div>
  );
};

export default ViewResume;
