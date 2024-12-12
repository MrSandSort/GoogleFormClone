import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Dashboard';
import Login from './pages/Login';


function App() {
  return <>
  <Router>
    <Routes>
      <Route path='/' element={<Home/>} ></Route>
      <Route path='login' element={<Login/>}></Route>
    </Routes>
  </Router>
  </>
}

export default App;
