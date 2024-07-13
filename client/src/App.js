import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Import Navigate from react-router-dom
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Signup from './components/Signup';
import Login from './components/Login';
import { useState } from 'react';
import Template from './templates/Template';
import ViewResume from './Pages/ViewResume';

function App() {
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUsername("");
  };

  return (
    <>
      <Router>
        <Navbar username={username} onLogout={handleLogout} />
        <Routes>
          <Route path='/' element={<Hero />} />
          <Route path='/Signup' element={<Signup />} />
          <Route path='/Login' element={<Login setUsername={setUsername} />} />
          <Route path='/ViewResume' element={<ViewResume />} />
          <Route path='/template' element={localStorage.getItem('access_token') ? <Template /> : <Navigate to='/login' />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
