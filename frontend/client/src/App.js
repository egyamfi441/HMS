import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardLayout from './components/DashboardLayout';
import PatientList from './modules/patients/PatientList';
import PatientDetail from './modules/patients/PatientDetail';
import PatientForm from './modules/patients/PatientForm';

// A simple protected route component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Routes>
                  <Route path="patients" element={<PatientList />} />
                  <Route path="patients/new" element={<PatientForm />} />
                  <Route path="patients/:id" element={<PatientDetail />} />
                  <Route path="patients/:id/edit" element={<PatientForm />} />
                  <Route path="/" element={<h2 className="text-3xl font-bold">Welcome to the Dashboard!</h2>} />
                </Routes>
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        {/* Redirect root path to dashboard or login */}
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
}

export default App;
