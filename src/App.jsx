import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Auth } from './context/Auth';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import TaskList from './pages/TaskList';
import Navbar from './components/Navbar';

function App() {
  const { isLoggedIn } = useContext(Auth);

  return (
    <Router>
      <div className="min-vh-100 bg-light">
        <Navbar />
        <div className="container mt-2">
          <Routes>
            <Route
              path="/"
              element={!isLoggedIn ? <Login /> : <Navigate to="/dashboard" />}
            />
            <Route
              path="/dashboard"
              element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />}
            />
            <Route
              path="/task-list"
              element={isLoggedIn ? <TaskList /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
