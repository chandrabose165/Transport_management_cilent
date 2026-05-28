import React from 'react';
import '../Styles/Admin.css';
import { useNavigate } from 'react-router-dom';

const Admin = () => {

  const navigate = useNavigate();

  // LOGOUT
  const handleLogout = () => {

    localStorage.removeItem('userEmail');

    localStorage.removeItem('username');

    navigate('/login');
  };

  // SAMPLE USERS
  const users = [

    {
      username: 'Rahul',
      email: 'rahul@gmail.com',
      status: 'Active',
    },

    {
      username: 'Priya',
      email: 'priya@gmail.com',
      status: 'Active',
    },

    {
      username: 'Kiran',
      email: 'kiran@gmail.com',
      status: 'Pending',
    },
  ];

  // SAMPLE BOOKINGS
  const bookings = [

    {
      route: 'Hyderabad → Bengaluru',
      ticket: 'Confirmed',
    },

    {
      route: 'Chennai → Mumbai',
      ticket: 'Waiting',
    },

    {
      route: 'Delhi → Kolkata',
      ticket: 'Cancelled',
    },
  ];

  return (
    <div className="admin-page">

      {/* HEADER */}

      <div className="admin-header">
        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

      {/* TITLE */}

      <h1 className="admin-title">
        Admin Dashboard
      </h1>

      {/* DASHBOARD CARDS */}

      <div className="admin-cards">

        <div className="admin-card">
          <h2>Users</h2>
          <p>120</p>
        </div>

        <div className="admin-card">
          <h2>Bookings</h2>
          <p>340</p>
        </div>

        <div className="admin-card">
          <h2>Payments</h2>
          <p>₹ 2,50,000</p>
        </div>

        <div className="admin-card">
          <h2>Reports</h2>
          <p>18</p>
        </div>

      </div>

      {/* USER LOGIN DETAILS */}

      <div className="admin-section">

        <h2>
          New User Login Details
        </h2>

        <div className="table-container">

          <table>

            <thead>

              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Status</th>
              </tr>

            </thead>

            <tbody>

              {users.map((user, index) => (

                <tr key={index}>

                  <td>{user.username}</td>

                  <td>{user.email}</td>

                  <td>{user.status}</td>

                </tr>
              ))}

            </tbody>

          </table>
        </div>
      </div>

      {/* BOOKING STATUS */}

      <div className="admin-section">

        <h2>
          Booking Ticket Status
        </h2>

        <div className="table-container">

          <table>

            <thead>

              <tr>
                <th>Route</th>
                <th>Ticket Status</th>
              </tr>

            </thead>

            <tbody>

              {bookings.map((booking, index) => (

                <tr key={index}>

                  <td>{booking.route}</td>

                  <td>{booking.ticket}</td>

                </tr>
              ))}

            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;