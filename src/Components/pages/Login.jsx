import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] =
    useState(false);

  const [data, setData] = useState({
    email: '',
    password: '',
  });

  // HANDLE INPUT

  const handleChange = (e) => {

    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  // LOGIN FUNCTION

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response = await fetch(
        'https://transport-management-server-548v.onrender.com/login',
        {
          method: 'POST',

          headers: {
            'Content-Type':
              'application/json',
          },

          body: JSON.stringify(data),
        }
      );

      const result =
        await response.json();

      if (result.success) {

        // STORE SESSION

        localStorage.setItem(
          'userEmail',
          result.user.email
        );

        localStorage.setItem(
          'username',
          result.user.username
        );

        alert(result.message);

        // ADMIN LOGIN

        if (

          result.user.email ===
            'admin@gmail.com' &&

          result.user.password ===
            'admin@123'

        ) {

          navigate('/admin');

        }

        // USER LOGIN

        else {

          navigate('/');
        }

      } else {

        alert(result.message);
      }

    } catch (error) {

      console.log(error);

      alert('Server Error');
    }
  };

  return (
    <div className="grid min-h-screen place-items-center bg-transport-account bg-cover bg-center px-4 py-12">

      <form
        className="w-full max-w-md rounded-3xl border border-white/60 bg-white p-7 shadow-2xl shadow-black/20 sm:p-10"
        onSubmit={handleLogin}
      >

        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 rounded-lg py-2 text-sm font-semibold text-slate-500 transition hover:text-brand-700"
        >
          <span aria-hidden="true">←</span>
          Back to home
        </Link>

        <div className="mb-8">
          <Link to="/" className="text-sm font-bold text-brand-700">TransportHub</Link>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950">Welcome back</h1>
          <p className="mt-2 text-sm leading-6 text-slate-500">Sign in to manage your journeys and bookings.</p>
        </div>

        {/* EMAIL */}

        <input
          type="email"
          name="email"
          placeholder="name@example.com"
          value={data.email}
          onChange={handleChange}
          required
          autoComplete="email"
          className="mb-4 h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-100"
        />

        {/* PASSWORD */}

        <div className="relative mb-5">

          <input
            type={
              showPassword
                ? 'text'
                : 'password'
            }

            name="password"

            placeholder="Enter your password"

            value={data.password}

            onChange={handleChange}

            required
            autoComplete="current-password"
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

        {/* BUTTON */}

        <button type="submit" className="h-12 w-full rounded-xl bg-brand-600 font-bold text-white shadow-lg shadow-brand-600/20 transition hover:bg-brand-700 focus:outline-none focus:ring-4 focus:ring-brand-100">
          Sign in
        </button>

        {/* REGISTER LINK */}

        <p className="mt-6 text-center text-sm text-slate-500">
          Don&apos;t have an account?{' '}
          <Link className="font-bold text-brand-700 hover:text-brand-900" to="/register">
            Create one
          </Link>
        </p>

      </form>
    </div>
  );
};

export default Login;
