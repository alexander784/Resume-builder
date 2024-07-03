import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Resume from './Pages/Resume';
import Signup from './components/Signup';
import Login from './components/Login';
// import ResumeDetails from './Pages/ResumeDetails';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Template from './templates/Template';
import ViewResume from './Pages/ViewResume';

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
       {/* <Template /> */}
       
       <Routes>
        <Route path='/' element={<Hero />}/>
        {/* <Route path="/Resume" element={ <Resume />}/> */}
        <Route path='/Signup' element={ <Signup />}/>
        <Route path='/Login' element={ <Login setUsername={setUsername} />} />
        <Route path='/ViewResume' element={<ViewResume />}/>
        {/* <Route path='/ResumeDetails' element={ <ResumeDetails /> }/> */}
        <Route path='/template' element={localStorage.getItem('access_token') ? <Template /> : <Navigate to='/login' />} />
        {/* <Route path='/Template' element={ <Template />}/> */}
       </Routes >
    </Router>
    </>
  );
}

export default App;
