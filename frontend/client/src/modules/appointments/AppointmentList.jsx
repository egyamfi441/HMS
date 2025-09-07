import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/appointments');
      const data = await response.json();
      if (response.ok) {
        setAppointments(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch appointments:', error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/appointments/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          // Refresh the list after deletion
          fetchAppointments();
        } else {
          console.error('Failed to delete appointment');
        }
      } catch (error) {
        console.error('Error deleting appointment:', error);
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Appointments</h2>
        <Link to="/dashboard/appointments/new" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          New Appointment
        </Link>
      </div>
      <div className="bg-white shadow-md rounded overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left">Patient ID</th>
              <th className="px-4 py-2 text-left">Doctor ID</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Reason</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{appointment.patient_id}</td>
                <td className="px-4 py-2">{appointment.doctor_id}</td>
                <td className="px-4 py-2">{new Date(appointment.appointment_date).toLocaleString()}</td>
                <td className="px-4 py-2">{appointment.reason}</td>
                <td className="px-4 py-2">{appointment.status}</td>
                <td className="px-4 py-2">
                  <Link to={`/dashboard/appointments/${appointment.id}/edit`} className="text-blue-600 hover:underline mr-4">
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(appointment.id)} className="text-red-600 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentList;
