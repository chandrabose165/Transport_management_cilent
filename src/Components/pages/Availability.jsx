import React, { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BookingProgress from '../BookingProgress';
import { ArrowLeft, Box, Bus, Clock3, MapPin, Plane, Train, Users } from 'lucide-react';

const availabilityData = {
  trains: [
    { id: 'TR101', name: 'Express Rail 101', depart: '06:45 AM', arrive: '11:20 AM', duration: '4h 35m', fare: 'Rs. 1,240' },
    { id: 'TR204', name: 'Coastal Intercity', depart: '10:15 AM', arrive: '03:10 PM', duration: '4h 55m', fare: 'Rs. 1,480' },
    { id: 'TR315', name: 'Nightline Premium', depart: '08:30 PM', arrive: '01:40 AM', duration: '5h 10m', fare: 'Rs. 1,760' },
  ],
  flights: [
    { id: 'FL220', name: 'SkyJet 220', depart: '07:20 AM', arrive: '09:10 AM', duration: '1h 50m', fare: 'Rs. 8,950' },
    { id: 'FL441', name: 'AeroConnect 441', depart: '01:10 PM', arrive: '03:05 PM', duration: '1h 55m', fare: 'Rs. 9,420' },
    { id: 'FL818', name: 'CloudAir 818', depart: '06:30 PM', arrive: '08:15 PM', duration: '1h 45m', fare: 'Rs. 10,150' },
  ],
  buses: [
    { id: 'BS12', name: 'GreenLine Sleeper', depart: '05:30 AM', arrive: '12:30 PM', duration: '7h 00m', fare: 'Rs. 780' },
    { id: 'BS27', name: 'Metro Travels', depart: '11:15 AM', arrive: '06:45 PM', duration: '7h 30m', fare: 'Rs. 720' },
    { id: 'BS44', name: 'Comfort Express', depart: '09:00 PM', arrive: '04:15 AM', duration: '7h 15m', fare: 'Rs. 860' },
  ],
  cargo: [
    { id: 'CG11', name: 'Rapid Freight Express', depart: '07:00 AM', arrive: '03:00 PM', duration: '8h 00m', fare: 'Rs. 2,450' },
    { id: 'CG24', name: 'Metro Cargo Connect', depart: '11:30 AM', arrive: '08:00 PM', duration: '8h 30m', fare: 'Rs. 2,780' },
    { id: 'CG39', name: 'Night Cargo Line', depart: '09:30 PM', arrive: '05:00 AM', duration: '7h 30m', fare: 'Rs. 3,120' },
  ],
};

const transportMeta = {
  trains: { label: 'Trains', icon: Train },
  flights: { label: 'Flights', icon: Plane },
  buses: { label: 'Buses', icon: Bus },
  cargo: { label: 'Cargo', icon: Box },
};

const Availability = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const bookingData = location.state?.bookingData;
  const initialType = bookingData?.transportType || 'trains';
  const [activeType, setActiveType] = useState(initialType);

  const activeMeta = transportMeta[activeType];
  const ActiveIcon = activeMeta.icon;

  const selectedOptions = useMemo(() => availabilityData[activeType] || [], [activeType]);

  const handleOptionContinue = (option) => {
    if (activeType === 'cargo') {
      navigate('/payment', {
        state: {
          bookingData: {
            ...bookingData,
            transportType: activeType,
          },
          selectedOption: option,
          selectedSeats: [],
        },
      });
      return;
    }

    navigate('/seat-selection', {
      state: {
        bookingData: {
          ...bookingData,
          transportType: activeType,
        },
        selectedOption: option,
      },
    });
  };

  return (
    <main className="min-h-screen bg-transport-surface bg-cover bg-center bg-fixed px-4 py-8 text-slate-900 sm:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <section className="overflow-hidden rounded-3xl bg-transport-hero bg-cover bg-center p-6 text-white shadow-soft sm:p-9">
          <button type="button" className="mb-8 inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-bold text-slate-200 transition hover:bg-white/10" onClick={() => navigate(-1)}>
            <ArrowLeft size={16} />
            Back
          </button>

          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-brand-100">Available options</span>
            <h1 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">Choose the right service for your journey.</h1>
            <p className="mt-3 max-w-2xl leading-7 text-slate-300">
              Review schedules, fares, and service details before moving to seat
              selection and payment.
            </p>
            <BookingProgress currentStep={2} />
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200">
              <Users size={16} />
              <span>{bookingData?.passengerCount || 1} passenger(s)</span>
            </div>
            {(bookingData?.origin || bookingData?.destination) && (
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200">
                <MapPin size={16} />
                <span>
                  {bookingData?.origin || 'From'} to {bookingData?.destination || 'To'}
                </span>
              </div>
            )}
            {bookingData?.transportType === 'buses' && bookingData?.departure && bookingData?.arrival && (
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200">
                <MapPin size={16} />
                <span>
                  {bookingData.departure} to {bookingData.arrival}
                </span>
              </div>
            )}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="mb-7 flex flex-col gap-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-brand-700">Transport options</span>
              <h2 className="mt-2 flex items-center gap-2 text-xl font-extrabold tracking-tight text-slate-950">
                <ActiveIcon size={20} />
                {activeMeta.label} available now
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {Object.entries(transportMeta).map(([key, value]) => {
                const Icon = value.icon;
                return (
                  <button
                    key={key}
                    type="button"
                    className={`inline-flex items-center justify-center gap-2 rounded-xl border px-3 py-3 text-sm font-bold transition ${activeType === key ? 'border-brand-600 bg-brand-600 text-white shadow-sm' : 'border-slate-200 bg-white text-slate-600 hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700'}`}
                    onClick={() => setActiveType(key)}
                  >
                    <Icon size={16} />
                    {value.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid gap-4">
            {selectedOptions.map((option) => (
              <article key={option.id} className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-brand-200 hover:shadow-md sm:p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-500">{option.id}</span>
                    <h3 className="mt-3 text-lg font-extrabold text-slate-950">{option.name}</h3>
                  </div>
                  <strong className="text-xl font-extrabold text-brand-700">{option.fare}</strong>
                </div>

                <div className="mt-5 grid gap-4 border-y border-slate-100 py-5 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="grid gap-1">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Departure</span>
                    <strong className="text-sm text-slate-800">{option.depart}</strong>
                  </div>
                  <div className="grid gap-1">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Arrival</span>
                    <strong className="text-sm text-slate-800">{option.arrive}</strong>
                  </div>
                  <div className="grid gap-1">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Duration</span>
                    <strong className="inline-flex items-center gap-1 text-sm text-slate-800">
                      <Clock3 size={14} />
                      {option.duration}
                    </strong>
                  </div>
                  {activeType === 'buses' && bookingData?.departure && bookingData?.arrival && (
                    <div className="grid gap-1">
                      <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Route</span>
                      <strong className="text-sm text-slate-800">
                        {bookingData.departure} - {bookingData.arrival}
                      </strong>
                    </div>
                  )}
                  {activeType !== 'buses' && (bookingData?.origin || bookingData?.destination) && (
                    <div className="grid gap-1">
                      <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Route</span>
                      <strong className="text-sm text-slate-800">
                        {bookingData?.origin || 'From'} - {bookingData?.destination || 'To'}
                      </strong>
                    </div>
                  )}
                </div>

                <div className="mt-5 flex justify-end">
                  <button className="rounded-xl bg-brand-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-brand-700 focus:outline-none focus:ring-4 focus:ring-brand-100" type="button" onClick={() => handleOptionContinue(option)}>
                    {activeType === 'cargo' ? 'Continue to Payment' : 'Select Seats'}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Availability;
