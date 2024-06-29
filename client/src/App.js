import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Resume from './Pages/Resume';
import Signup from './components/Signup';
import Login from './components/Login';
import ResumeDetails from './Pages/ResumeDetails';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

function App() {

  const [username, setUsername] = useState('');

  const handleLogout =() => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    setUsername("");

    return <Navigate to="/hero" />
  }
  return (
    <>
    <Router>
       <Navbar username={username} onLogout={handleLogout}/>
       {/* <Hero /> */}
       {/* <Resume /> */}
       <Routes>
        <Route path='/' element={<Hero />}/>
        <Route path="/Resume" element={ <Resume />}/>
        <Route path='/Signup' element={ <Signup />}/>
        <Route path='/Login' element={ <Login setUsername={setUsername} />} />
        <Route path='/ResumeDetails' element={ <ResumeDetails /> }/>
       </Routes>
    </Router>
    </>
  );
}

export default App;
