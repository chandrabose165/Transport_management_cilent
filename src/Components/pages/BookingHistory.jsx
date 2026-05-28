
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/BookingHistory.css';

// Simulate fetching booking history from localStorage or API
const getBookings = () => {
  // Try to get from localStorage
  const data = localStorage.getItem('bookingHistory');
  if (data) return JSON.parse(data);
  return [];
};

// Simulate temperature registration
const getTemperature = () => {
  // Random temperature between 20 and 40
  return Math.floor(Math.random() * 21) + 20;
};


const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // On mount, fetch bookings
    const history = getBookings();
    // If there are bookings but no temperature, add it
    if (history.length > 0) {
      const withTemp = history.map((b) => ({
        ...b,
        temperature: b.temperature || getTemperature(),
      }));
      setBookings(withTemp);
      // Save back with temperature
      localStorage.setItem('bookingHistory', JSON.stringify(withTemp));
    } else {
      setBookings([]);
    }
  }, []);

  return (
    <div className="booking-history-container">
      <button
        className="back-btn"
        style={{ marginBottom: '20px', padding: '8px 18px', background: '#2d3a4b', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
        onClick={() => navigate('/dashboard')}
      >
        ← Back to Dashboard
      </button>
      <h2>Booking History</h2>
      {bookings && bookings.length > 0 ? (
        <table className="booking-history-table">
          <thead>
            <tr>
              <th>Transport</th>
              <th>Date</th>
              <th>Temperature</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, idx) => (
              <tr key={idx}>
                <td>{booking.transport}</td>
                <td>{booking.date}</td>
                <td>{booking.temperature}&#8451;</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="no-bookings">No bookings are available.</div>
      )}
    </div>
  );
};

export default BookingHistory;
