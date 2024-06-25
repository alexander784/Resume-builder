import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

function App() {
  return (
    <>
    <Router>
       <Navbar />
       <Hero />
    </Router>
    </>
  );
}

export default App;
