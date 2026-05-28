import React, { useState } from 'react';
import '../Styles/Register.css';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword
  ] = useState(false);

  const [data, setData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  // HANDLE INPUT

  const handleChange = (e) => {

    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  // REGISTER FUNCTION

  const handleRegister = async (e) => {

    e.preventDefault();

    // PASSWORD CHECK

    if (
      data.password !==
      data.confirmPassword
    ) {

      alert('Passwords do not match');

      return;
    }

    // USER OBJECT

    const userData = {
      username: data.username,
      email: data.email,
      phone: data.phone,
      password: data.password,
    };

    try {

      const response = await fetch(
        'https://transport-management-server-548v.onrender.com/register',
        {
          method: 'POST',

          headers: {
            'Content-Type':
              'application/json',
          },

          body: JSON.stringify(userData),
        }
      );

      const result =
        await response.json();

      if (result.success) {

        alert(result.message);

        navigate('/login');

      } else {

        alert(result.message);
      }

    } catch (error) {

      console.log(error);

      alert('Server Error');
    }
  };

  return (
    <div className="register-container">

      <form
        className="register-form"
        onSubmit={handleRegister}
      >

        <h1>Register</h1>

        {/* USERNAME */}

        <input
          type="text"
          name="username"
          placeholder="Enter Username"
          value={data.username}
          onChange={handleChange}
          required
        />

        {/* EMAIL */}

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={data.email}
          onChange={handleChange}
          required
        />

        {/* PHONE */}

        <input
          type="tel"
          name="phone"
          placeholder="Enter Phone Number"
          value={data.phone}
          onChange={handleChange}
          required
        />

        {/* PASSWORD */}

        <div className="password-box">

          <input
            type={
              showPassword
                ? 'text'
                : 'password'
            }

            name="password"

            placeholder="Enter Password"

            value={data.password}

            onChange={handleChange}

            required
          />

          <span
            className="show-password"

            onClick={() =>
              setShowPassword(
                !showPassword
              )
            }
          >
            {
              showPassword
                ? 'Hide'
                : 'Show'
            }
          </span>

        </div>

        {/* CONFIRM PASSWORD */}

        <div className="password-box">

          <input
            type={
              showConfirmPassword
                ? 'text'
                : 'password'
            }

            name="confirmPassword"

            placeholder="Confirm Password"

            value={data.confirmPassword}

            onChange={handleChange}

            required
          />

          <span
            className="show-password"

            onClick={() =>
              setShowConfirmPassword(
                !showConfirmPassword
              )
            }
          >
            {
              showConfirmPassword
                ? 'Hide'
                : 'Show'
            }
          </span>

        </div>

        {/* BUTTON */}

        <button type="submit">
          Register
        </button>

        {/* LOGIN LINK */}

        <p>
          Already have an account?

          <Link to="/login">
            Login
          </Link>
        </p>

      </form>
    </div>
  );
};

export default Register;