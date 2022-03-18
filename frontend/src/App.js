import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import Login from './Components/Login/Login'
import AdminLogin from './Components/Login/AdminLogin';
import StudentLogin from './Components/Login/StudentLogin';
import ProfessorLogin from './Components/Login/ProfessorLogin';
import AdminContextProvider from './Components/Contexts/AdminContext';
import AdminDashboard from './Components/Dashboard/AdminDashboard';

function App() {


  return (
    <div className="App">
      <AdminContextProvider> {/* Passes the admin user around all the routes */}
        <Router>
          <Routes>

            <Route path="/" element={<Login />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/student" element={<StudentLogin />} />
            <Route path="/professor" element={<ProfessorLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />

          </Routes>
        </Router>
      </AdminContextProvider>
      
    </div>
  );
}

export default App;