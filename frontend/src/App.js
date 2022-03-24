import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import Login from './Components/Login/Login'
import AdminLogin from './Components/Login/AdminLogin';
import StudentLogin from './Components/Login/StudentLogin';
import ProfessorLogin from './Components/Login/ProfessorLogin';
import AdminDashboard from './Components/Dashboard/AdminDashboard';
import UserContextProvider from './Components/Contexts/UserContext';
import AddStudent from './Components/Dashboard/Add Entity/AddStudent';

function App() {


  return (
    <div className="App">
      <UserContextProvider> {/* Passes the user around all the routes */}
        <Router>
          <Routes>

            <Route path="/" element={<Login />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/student" element={<StudentLogin />} />
            <Route path="/professor" element={<ProfessorLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/add/student" element={<AddStudent />} />

          </Routes>
        </Router>
      </UserContextProvider>
      
    </div>
  );
}

export default App;