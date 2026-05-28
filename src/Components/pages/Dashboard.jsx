import React from 'react';
import '../Styles/Dashboard.css';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  // Get logged in user email
  const userEmail = localStorage.getItem('userEmail');

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    navigate('/login');
  };

  return (
    <div className='dashboard'>

      {/* Top Header */}
      <div className='dashboard-header'>
        <button
          className='back-btn'
          onClick={() => navigate('/')}
        >
          ← Back to Home
        </button>

        <div className='profile-section'>
          <div className='profile-icon'>👤</div>

          <div className='profile-details'>
            <span className='welcome-text'>Welcome</span>
            <h3>{userEmail}</h3>

            <button
              className='logout-btn'
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <h1>User Dashboard</h1>

      <button
        className='history-btn'
        style={{
          marginBottom: '20px',
          padding: '10px 20px',
          background: '#2d3a4b',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}
        onClick={() => navigate('/BookingHistory')}
      >
        View Booking History
      </button>

      <div className='card-container'>
        <div className='card'>
          <h2>Total Bookings</h2>
          <p>120</p>
        </div>

        <div className='card'>
          <h2>Payments</h2>
          <p>Rs. 5,000</p>
        </div>

        <div className='card'>
          <h2>Trips</h2>
          <p>35</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;