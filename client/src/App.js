import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Resume from './Pages/Resume';

function App() {
  return (
    <>
    <Router>
       <Navbar />
       {/* <Hero /> */}
       <Resume />
       {/* <Routes>
        <Route path="/Resume" element={ <Resume />}/>
       </Routes> */}
    </Router>
    </>
  );
}

export default App;
