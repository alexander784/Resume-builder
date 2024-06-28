import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirm_password: "",
    },

    onSubmit: (values, { resetForm }) => {
      console.log(values);

      fetch("http://127.0.0.1:5000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(values),
      })
      // Get response
        .then((response) => {
          if (response.ok) {
            resetForm();
            return response.json();
          }
        })
        // retrieve the data
        .then((data) => {
          console.log(data);
          if (data.error) {
            setError(data.error);
          } else {
            setError(null);
            navigate("/login");
          }
        })
        // Catch the error
        .catch((err) => {
          console.log("Error in registering user", err);
        });
    },
  });

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-md'>
        <h2 className='text-2xl font-bold mb-6 text-center'>Sign Up</h2>
        {error && <div className='mb-4 text-red-500'>{error}</div>}
        <form onSubmit={formik.handleSubmit} className='space-y-4'>
          <div>
            <label htmlFor='username' className='block text-gray-700'>Username</label>
            <input
              type='text'
              id='username'
              name='username'
              onChange={formik.handleChange}
              value={formik.values.username}
              className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>
          <div>
            <label htmlFor='email' className='block text-gray-700'>Email</label>
            <input
              type='email'
              id='email'
              name='email'
              onChange={formik.handleChange}
              value={formik.values.email}
              className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>
          <div>
            <label htmlFor='password' className='block text-gray-700'>Password</label>
            <input
              type='password'
              id='password'
              name='password'
              onChange={formik.handleChange}
              value={formik.values.password}
              className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>
          <div>
            <label htmlFor='confirm_password' className='block text-gray-700'>Confirm Password</label>
            <input
              type='password'
              id='confirm_password'
              name='confirm_password'
              onChange={formik.handleChange}
              value={formik.values.confirm_password}
              className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>
          <button
            type='submit'
            className='w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
