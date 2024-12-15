import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Dashboard';
import Login from './pages/Login';
import FillForm from './components/survey/surveySample';


function App() {
  return <>
  <Router>
    <Routes>
      <Route path='/' element={<Home/>} ></Route>
      <Route path='login' element={<Login/>}></Route>
      <Route path='survey' element={<FillForm/>}></Route>
    </Routes>
  </Router>
  </>
}

export default App;
