import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Home from './pages/Home';
import SurveyPage from './pages/surveyPage';
import Register from './pages/Register';
import Question from './pages/Question';
import ProtectedRoute from './pages/ProtectedRoute';

function App() {
  return <>
  <Router>
    <Routes>
      <Route path='/' element={<ProtectedRoute Component={Home} />} ></Route>
      <Route path='addUser' element={< ProtectedRoute Component={Register} />}></Route>
      <Route path='login' element={<Login/>}></Route>
      <Route path='questions' element={<ProtectedRoute Component= {Question}/>}></Route>
      <Route path='survey' element={< ProtectedRoute Component= {SurveyPage}/>}></Route>
      <Route path='dashboard' element={<ProtectedRoute Component={Dashboard}/>}></Route>
    </Routes>
  </Router>
  </>
}

export default App;
