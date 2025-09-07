import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardLayout from './components/DashboardLayout';
import PatientList from './modules/patients/PatientList';
import PatientDetail from './modules/patients/PatientDetail';
import PatientForm from './modules/patients/PatientForm';
import AppointmentList from './modules/appointments/AppointmentList';
import AppointmentForm from './modules/appointments/AppointmentForm';
import BillingList from './modules/billing/BillingList';
import BillingForm from './modules/billing/BillingForm';
import ReportsPage from './modules/reports/ReportsPage';
import PaymentPage from './pages/PaymentPage';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentCancel from './pages/PaymentCancel';

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
                  <Route path="appointments" element={<AppointmentList />} />
                  <Route path="appointments/new" element={<AppointmentForm />} />
                  <Route path="appointments/:id/edit" element={<AppointmentForm />} />
                  <Route path="billing" element={<BillingList />} />
                  <Route path="billing/new" element={<BillingForm />} />
                  <Route path="reports" element={<ReportsPage />} />
                  <Route path="payment" element={<PaymentPage />} />
                  <Route path="payment-success" element={<PaymentSuccess />} />
                  <Route path="payment-cancel" element={<PaymentCancel />} />
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
