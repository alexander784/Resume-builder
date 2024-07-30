import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useGlobalAuthContext } from '../context/authContext';


const Login = ({ setUsername }) => {
  const { dispatchForAuthState } = useGlobalAuthContext();

  const [error, setError] = useState(null);
  const navigate = useNavigate(); 
  
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      dispatchForAuthState({
        type: "FETCH_REQUEST"
      });

      fetch('http://127.0.0.1:5000/auth/login', {
        
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(values),
      })
        .then((response) => {
          if (response.ok) {
            resetForm();
            return response.json();
          } else {
            throw new Error('Login failed');
          }
        })
        .then((data) => {
          console.log(data);
          if (data) {
            // store tokens in local Storage
            localStorage.setItem('token', data.tokens.access); 
            localStorage.setItem('username', data.user.username); 
            // Also store the current user
            setUsername(data.user.username);
            navigate('/template'); 
          }
        })
        .catch((err) => {
          console.log('Error in logging in user', err);
          setError('Login failed. Please check your credentials and try again.');

          dispatchForAuthState({
            type:"FETCH_FAILURE",payload: err
          });
        });
    },
  });

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-md'>
        <h2 className='text-2xl font-bold mb-6 text-center'>Login</h2>
        {
        error && 
        <div className='mb-4 text-red-500'>{error}
        </div>
        }
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
          <button
            type='submit'
            className='w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            Login
          </button>
          <div>
            <p>Don't have an Account? <br />
              <Link to="/Signup" className="bg-blue-600 text-white text-center text-sm w-full px-4 py-2 border border-blue-500 rounded transition duration-300">
                Create one
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
