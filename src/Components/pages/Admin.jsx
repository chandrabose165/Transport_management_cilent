import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, CalendarCheck2, CreditCard, LogOut, Users } from 'lucide-react';

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
    <main className="min-h-screen bg-transport-surface bg-cover bg-center bg-fixed px-4 py-8 text-slate-900 sm:px-8">
      <div className="mx-auto max-w-7xl">

      {/* HEADER */}

      <div className="mb-9 flex items-center justify-between rounded-3xl border border-white/70 bg-white/95 p-5 shadow-soft backdrop-blur sm:p-7">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-950 text-white"><Activity size={20} /></span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-700">Operations</p>
              <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-950">Admin overview</h1>
            </div>
          </div>
        </div>
        <button
          className="inline-flex items-center gap-2 rounded-xl border border-rose-100 bg-rose-50 px-4 py-2.5 text-sm font-bold text-rose-700 transition hover:bg-rose-100 focus:outline-none focus:ring-4 focus:ring-rose-100"
          onClick={handleLogout}
        >
          <LogOut size={16} />
          Logout
        </button>

      </div>

      {/* TITLE */}

      {/* DASHBOARD CARDS */}

      <div className="mb-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-2xl border border-slate-200/80 bg-white/95 p-6 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md">
          <div className="flex items-center justify-between"><h2 className="text-sm font-semibold text-slate-600">Users</h2><span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-700"><Users size={19} /></span></div>
          <p className="mt-4 text-4xl font-extrabold tracking-tight text-slate-950">120</p>
          <p className="mt-2 text-sm font-medium text-brand-700">Registered accounts</p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white/95 p-6 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md">
          <div className="flex items-center justify-between"><h2 className="text-sm font-semibold text-slate-600">Bookings</h2><span className="grid h-10 w-10 place-items-center rounded-xl bg-sky-50 text-sky-700"><CalendarCheck2 size={19} /></span></div>
          <p className="mt-4 text-4xl font-extrabold tracking-tight text-slate-950">340</p>
          <p className="mt-2 text-sm font-medium text-brand-700">All transport services</p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white/95 p-6 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md">
          <div className="flex items-center justify-between"><h2 className="text-sm font-semibold text-slate-600">Payments</h2><span className="grid h-10 w-10 place-items-center rounded-xl bg-violet-50 text-violet-700"><CreditCard size={19} /></span></div>
          <p className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950">₹ 2,50,000</p>
          <p className="mt-2 text-sm font-medium text-brand-700">Total processed</p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white/95 p-6 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md">
          <div className="flex items-center justify-between"><h2 className="text-sm font-semibold text-slate-600">Reports</h2><span className="grid h-10 w-10 place-items-center rounded-xl bg-amber-50 text-amber-700"><Activity size={19} /></span></div>
          <p className="mt-4 text-4xl font-extrabold tracking-tight text-slate-950">18</p>
          <p className="mt-2 text-sm font-medium text-brand-700">Ready for review</p>
        </div>

      </div>

      {/* USER LOGIN DETAILS */}

      <section className="mb-6 rounded-2xl border border-slate-200/80 bg-white/95 p-5 shadow-sm backdrop-blur sm:p-7">

        <h2 className="mb-5 text-lg font-extrabold tracking-tight text-slate-950">
          New user login details
        </h2>

        <div className="overflow-x-auto">

          <table className="w-full min-w-[560px] text-left text-sm">

            <thead className="border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500">

              <tr>
                <th className="px-4 py-3 font-semibold">Username</th>
                <th className="px-4 py-3 font-semibold">Email</th>
                <th className="px-4 py-3 font-semibold">Status</th>
              </tr>

            </thead>

            <tbody className="divide-y divide-slate-100">

              {users.map((user, index) => (

                <tr key={index} className="text-slate-700">

                  <td className="px-4 py-4 font-semibold text-slate-900">{user.username}</td>

                  <td className="px-4 py-4">{user.email}</td>

                  <td className="px-4 py-4"><span className={`rounded-full px-3 py-1 text-xs font-bold ${user.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>{user.status}</span></td>

                </tr>
              ))}

            </tbody>

          </table>
        </div>
      </section>

      {/* BOOKING STATUS */}

      <section className="rounded-2xl border border-slate-200/80 bg-white/95 p-5 shadow-sm backdrop-blur sm:p-7">

        <h2 className="mb-5 text-lg font-extrabold tracking-tight text-slate-950">
          Booking ticket status
        </h2>

        <div className="overflow-x-auto">

          <table className="w-full min-w-[560px] text-left text-sm">

            <thead className="border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500">

              <tr>
                <th className="px-4 py-3 font-semibold">Route</th>
                <th className="px-4 py-3 font-semibold">Ticket status</th>
              </tr>

            </thead>

            <tbody className="divide-y divide-slate-100">

              {bookings.map((booking, index) => (

                <tr key={index} className="text-slate-700">

                  <td className="px-4 py-4 font-semibold text-slate-900">{booking.route}</td>

                  <td className="px-4 py-4"><span className={`rounded-full px-3 py-1 text-xs font-bold ${booking.ticket === 'Confirmed' ? 'bg-emerald-50 text-emerald-700' : booking.ticket === 'Waiting' ? 'bg-amber-50 text-amber-700' : 'bg-rose-50 text-rose-700'}`}>{booking.ticket}</span></td>

                </tr>
              ))}

            </tbody>

          </table>
        </div>
      </section>
      </div>
    </main>
  );
};

export default Admin;