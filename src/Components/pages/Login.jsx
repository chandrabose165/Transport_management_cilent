
import React, { useState } from 'react';
import '../Styles/Login.css';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {

  const navigate = useNavigate();

  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {

    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };


  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response = await fetch(
        'https://transport-management-server-548v.onrender.com/login',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (result.success) {

        // STORE USER SESSION

        localStorage.setItem(
          'userEmail',
          result.user.email
        );

        localStorage.setItem(
          'username',
          result.user.username
        );

        alert(result.message);
        if (

          result.user.email ===
            'admin@gmail.com' &&

          result.user.password ===
            'admin@123'

        ) {

          navigate('/admin');

        }

        else {

          navigate('/');
        }

      }

      

      else {

        alert(result.message);
      }

    }

    catch (error) {

      console.log(error);

      alert('Server Error');
    }
  };

  return (
    <div className="login-container">

      <form
        className="login-form"
        onSubmit={handleLogin}
      >

        <h1>Login</h1>


        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={data.email}
          onChange={handleChange}
          required
        />


        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={data.password}
          onChange={handleChange}
          required
        />

        {/* LOGIN BUTTON */}

        <button type="submit">
          Login
        </button>

        {/* REGISTER LINK */}

        <p>
          Don't have an account?

          <Link to="/register">
            Register
          </Link>
        </p>

      </form>
    </div>
  );
};

export default Login;
