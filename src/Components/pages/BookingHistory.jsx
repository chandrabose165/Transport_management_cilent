
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Bus, Package, Plane, Train } from 'lucide-react';

const transportIcons = {
  trains: Train,
  buses: Bus,
  flights: Plane,
  cargo: Package,
};

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
    <main className="min-h-screen bg-transport-surface bg-cover bg-center bg-fixed px-4 py-8 text-slate-900 sm:px-8">
      <section className="mx-auto max-w-5xl rounded-3xl border border-white/70 bg-white/95 p-5 shadow-soft backdrop-blur sm:p-8">
      <button
        className="mb-8 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-600 transition hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700"
        onClick={() => navigate('/dashboard')}
      >
        ← Back to dashboard
      </button>
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-brand-700">Your journeys</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950">Booking history</h1>
          <p className="mt-2 text-sm text-slate-500">A record of your recent booking activity.</p>
        </div>
        {bookings.length > 0 && (
          <span className="rounded-full bg-brand-50 px-3 py-1.5 text-xs font-bold text-brand-700">
            {bookings.length} {bookings.length === 1 ? 'booking' : 'bookings'}
          </span>
        )}
      </div>
      {bookings && bookings.length > 0 ? (
        <div className="overflow-x-auto rounded-2xl border border-slate-200">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-5 py-4 font-semibold">Transport</th>
              <th className="px-5 py-4 font-semibold">Date</th>
              <th className="px-5 py-4 font-semibold">Temperature</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {bookings.map((booking, idx) => (
              <tr key={idx} className="text-slate-600">
                <td className="px-5 py-4">
                  <span className="inline-flex items-center gap-3 font-bold capitalize text-slate-900">
                    <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-50 text-brand-700">
                      {React.createElement(transportIcons[booking.transport] || Package, { size: 17 })}
                    </span>
                    {booking.transport}
                  </span>
                </td>
                <td className="px-5 py-4">{booking.date}</td>
                <td className="px-5 py-4">{booking.temperature}&#8451;</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-14 text-center">
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-brand-700"><Package size={22} /></span>
          <p className="mt-4 text-lg font-bold text-slate-900">No bookings yet</p>
          <p className="mt-2 text-sm text-slate-500">Your completed booking activity will appear here.</p>
          <button
            type="button"
            onClick={() => navigate('/booking')}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-brand-700"
          >
            Start a booking <ArrowRight size={16} />
          </button>
        </div>
      )}
      </section>
    </main>
  );
};

export default BookingHistory;
