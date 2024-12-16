import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Home from './pages/Home';
import SurveyPage from './pages/surveyPage';
import Register from './pages/Register';



function App() {
  return <>
  <Router>
    <Routes>
      <Route path='/' element={<Home/>} ></Route>
      <Route path='addUser' element={<Register/>}></Route>
      <Route path='login' element={<Login/>}></Route>
      <Route path='survey' element={<SurveyPage/>}></Route>
      <Route path='dashboard' element={<Dashboard/>}></Route>
    </Routes>
  </Router>
  </>
}

export default App;
