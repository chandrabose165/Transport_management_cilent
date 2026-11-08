import React, { useState } from 'react';
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

  const isPasswordValid = (password) => {
    const passwordPattern = /^(?=.*\d)(?=.*[^A-Za-z0-9])[A-Z]\S*$/;
    return passwordPattern.test(password);
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

    if (!isPasswordValid(data.password)) {
      alert(
        'Password must start with an uppercase letter, include at least one number, and contain a special character.'
      );
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
    <div className="grid min-h-screen place-items-center bg-transport-account bg-cover bg-center px-4 py-10">

      <form
        className="w-full max-w-lg rounded-3xl border border-white/60 bg-white p-7 shadow-2xl shadow-black/20 sm:p-10"
        onSubmit={handleRegister}
      >

        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 rounded-lg py-2 text-sm font-semibold text-slate-500 transition hover:text-brand-700"
        >
          <span aria-hidden="true">←</span>
          Back to home
        </Link>

        <div className="mb-7">
          <Link to="/" className="text-sm font-bold text-brand-700">TransportHub</Link>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950">Create your account</h1>
          <p className="mt-2 text-sm leading-6 text-slate-500">A few details and you&apos;ll be ready to plan your next trip.</p>
        </div>

        {/* USERNAME */}

        <input
          type="text"
          name="username"
          placeholder="Full name"
          value={data.username}
          onChange={handleChange}
          required
          autoComplete="username"
          className="mb-3 h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-100"
        />

        {/* EMAIL */}

        <input
          type="email"
          name="email"
          placeholder="name@example.com"
          value={data.email}
          onChange={handleChange}
          required
          autoComplete="email"
          className="mb-3 h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-100"
        />

        {/* PHONE */}

        <input
          type="tel"
          name="phone"
          placeholder="Phone number"
          value={data.phone}
          onChange={handleChange}
          required
          autoComplete="tel"
          className="mb-3 h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-100"
        />

        {/* PASSWORD */}

        <div className="relative mb-3">

          <input
            type={
              showPassword
                ? 'text'
                : 'password'
            }

            name="password"

            placeholder="Create a password"

            value={data.password}

            onChange={handleChange}

            required
            autoComplete="new-password"
            className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 pr-16 text-sm outline-none transition focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-100"
          />

          <button
            type="button"
            className="absolute inset-y-0 right-3 my-auto h-8 px-2 text-xs font-bold text-slate-500 hover:text-brand-700"
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
          </button>

        </div>

        {/* CONFIRM PASSWORD */}

        <div className="relative mb-5">

          <input
            type={
              showConfirmPassword
                ? 'text'
                : 'password'
            }

            name="confirmPassword"

            placeholder="Confirm password"

            value={data.confirmPassword}

            onChange={handleChange}

            required
            autoComplete="new-password"
            className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 pr-16 text-sm outline-none transition focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-100"
          />

          <button
            type="button"
            className="absolute inset-y-0 right-3 my-auto h-8 px-2 text-xs font-bold text-slate-500 hover:text-brand-700"
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
          </button>

        </div>

        {/* BUTTON */}

        <button type="submit" className="h-12 w-full rounded-xl bg-brand-600 font-bold text-white shadow-lg shadow-brand-600/20 transition hover:bg-brand-700 focus:outline-none focus:ring-4 focus:ring-brand-100">
          Register
        </button>

        {/* LOGIN LINK */}

        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{' '}
          <Link className="font-bold text-brand-700 hover:text-brand-900" to="/login">
            Login
          </Link>
        </p>

      </form>
    </div>
  );
};

export default Register;