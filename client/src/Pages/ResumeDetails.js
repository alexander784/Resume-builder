import React from 'react';

const ResumeDetails = (resume) => {
    if(!resume) {
        return null;
    }
  return (
    <div className="mt-8 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <h2 className="text-2xl font-bold mb-6 text-center">Resume Details</h2>
    <p><strong>Name:</strong> {resume.name}</p>
    <p><strong>Profile:</strong> {resume.profile}</p>
    <p><strong>Experience:</strong> {resume.experience}</p>
    <p><strong>Education:</strong> {resume.education}</p>
    <p><strong>Skills:</strong> {resume.skills}</p>
    <p><strong>Certificates:</strong> {resume.certificates}</p>
    <p><strong>Projects:</strong> {resume.projects}</p>
    <p><strong>Languages:</strong> {resume.languages}</p>
    <p><strong>Created At:</strong> {resume.createdAt}</p>
  </div>
  )
}

export default ResumeDetails;