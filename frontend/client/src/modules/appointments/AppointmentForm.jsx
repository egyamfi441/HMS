import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    patient_id: '',
    doctor_id: '',
    appointment_date: '',
    reason: '',
    status: 'scheduled',
  });
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = !id;

  useEffect(() => {
    if (!isNew) {
      const fetchAppointment = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/appointments/${id}`);
          const data = await response.json();
          if (response.ok) {
            setFormData(data.data);
          }
        } catch (error) {
          console.error('Failed to fetch appointment:', error);
        }
      };
      fetchAppointment();
    }
  }, [id, isNew]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isNew ? 'http://localhost:5000/api/appointments' : `http://localhost:5000/api/appointments/${id}`;
    const method = isNew ? 'POST' : 'PUT';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        navigate('/dashboard/appointments');
      } else {
        console.error('Failed to save appointment');
      }
    } catch (error) {
      console.error('Error saving appointment:', error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">{isNew ? 'New Appointment' : 'Edit Appointment'}</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700">Patient ID</label>
          <input
            type="text"
            name="patient_id"
            value={formData.patient_id}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Doctor ID</label>
          <input
            type="text"
            name="doctor_id"
            value={formData.doctor_id}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Appointment Date</label>
          <input
            type="datetime-local"
            name="appointment_date"
            value={formData.appointment_date}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Reason</label>
          <input
            type="text"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Status</label>
          <select name="status" value={formData.status} onChange={handleChange} className="w-full p-2 border rounded">
            <option value="scheduled">Scheduled</option>
            <option value="completed">Completed</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {isNew ? 'Create' : 'Update'}
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;
