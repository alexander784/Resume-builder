import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Resume from './Pages/Resume';
import Signup from './components/Signup';
import Login from './components/Login';

function App() {
  return (
    <>
    <Router>
       <Navbar />
       {/* <Hero /> */}
       {/* <Resume /> */}
       <Routes>
        <Route path='/' element={<Hero />}/>
        <Route path="/Resume" element={ <Resume />}/>
        <Route path='/Signup' element={ <Signup />}/>
        <Route path='/Login' element={ <Login />}/>
       </Routes>
    </Router>
    </>
  );
}

export default App;
