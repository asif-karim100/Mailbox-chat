// import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';


function App() {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
   
      </Routes>
    
  );
}

export default App;