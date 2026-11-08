import React, { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BookingProgress from '../BookingProgress';
import {
  ArrowLeft,
  Bus,
  CreditCard,
  MapPin,
  Plane,
  ShieldCheck,
  Ticket,
  Train,
  UserRound,
} from 'lucide-react';

const bookingBenefits = [
  'Instant confirmation with clear fare details',
  'Secure traveller information handling',
  'Flexible scheduling for one-way and return plans',
];

const transportOptions = [
  { value: 'trains', label: 'Trains', icon: Train },
  { value: 'flights', label: 'Flights', icon: Plane },
  { value: 'buses', label: 'Buses', icon: Bus },
];

const busStops = ['Chennai', 'Bengaluru', 'Hyderabad', 'Mumbai', 'Pune', 'Kochi'];
const createPassenger = () => ({
  passengerName: '',
  passengerType: '',
  gender: '',
});
const getBusPlaceMatches = (value, excludeValue = '') => {
  if (value.trim().length < 3) {
    return [];
  }

  return busStops
    .filter((place) => place.toLowerCase().includes(value.toLowerCase()))
    .filter((place) => place !== excludeValue)
    .slice(0, 6);
};

const Booking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialTransportType = location.state?.transportType || 'trains';
  const homeSearchData = location.state?.searchData || {};

  const [formData, setFormData] = useState({
    passengerCount: '1',
    passengers: [createPassenger()],
    transportType: initialTransportType,
    origin: homeSearchData.from || '',
    destination: homeSearchData.to || '',
    senderName: homeSearchData.senderName || '',
    receiverName: homeSearchData.receiverName || '',
    weightKg: homeSearchData.weightKg || '',
    departure: initialTransportType === 'buses' ? homeSearchData.from || '' : '',
    arrival: initialTransportType === 'buses' ? homeSearchData.to || '' : '',
  });
  const [activePlaceField, setActivePlaceField] = useState('');

  const activeTransport = useMemo(
    () => transportOptions.find((option) => option.value === formData.transportType) || transportOptions[0],
    [formData.transportType]
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((current) => {
      const nextState = {
        ...current,
        [name]: value,
      };

      if (name === 'passengerCount') {
        const nextCount = Math.max(1, Number(value) || 1);
        nextState.passengerCount = String(nextCount);
        nextState.passengers = Array.from({ length: nextCount }, (_, index) =>
          current.passengers[index] || createPassenger()
        );
      }

      if (name === 'transportType' && value !== 'buses') {
        nextState.departure = '';
        nextState.arrival = '';
      }

      return nextState;
    });
  };

  const handlePassengerDetailChange = (index, field, value) => {
    setFormData((current) => ({
      ...current,
      passengers: current.passengers.map((passenger, passengerIndex) =>
        passengerIndex === index ? { ...passenger, [field]: value } : passenger
      ),
    }));
  };

  const handleBusPlaceSelect = (fieldName, value) => {
    setFormData((current) => ({
      ...current,
      [fieldName]: value,
    }));
    setActivePlaceField('');
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    // Save booking to localStorage for history
    const bookingHistory = JSON.parse(localStorage.getItem('bookingHistory') || '[]');
    // Compose a booking record
    const bookingRecord = {
      transport: formData.transportType,
      date: new Date().toLocaleString(),
      temperature: Math.floor(Math.random() * 21) + 20, // 20-40°C
    };
    localStorage.setItem('bookingHistory', JSON.stringify([...bookingHistory, bookingRecord]));

    navigate('/availability', {
      state: {
        bookingData: formData,
      },
    });
  };

  return (
    <main className="min-h-screen bg-transport-surface bg-cover bg-center bg-fixed px-4 py-8 text-slate-900 sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <section className="rounded-3xl bg-transport-hero bg-cover bg-center p-6 text-white shadow-soft sm:p-8 lg:sticky lg:top-8 lg:self-start">
          <button type="button" className="mb-9 inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-bold text-slate-200 transition hover:bg-white/10" onClick={() => navigate(-1)}>
            <ArrowLeft size={16} />
            Back
          </button>

          <span className="text-xs font-bold uppercase tracking-[0.18em] text-brand-100">Booking workspace</span>
          <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">Make your next reservation with confidence.</h1>
          <p className="mt-4 leading-7 text-slate-300">
            Choose your transport type, enter passenger details, and continue to
            live availability with a more guided reservation experience.
          </p>
          <BookingProgress currentStep={1} />

          <div className="mt-8 grid gap-3">
            <div className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-600/20 text-brand-100">
                <Ticket size={18} />
              </div>
              <div>
                <strong className="block text-sm font-bold text-white">Live availability</strong>
                <span className="mt-1 block text-sm leading-6 text-slate-300">Search routes and confirm seats in real time.</span>
              </div>
            </div>

            <div className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-600/20 text-brand-100">
                <ShieldCheck size={18} />
              </div>
              <div>
                <strong className="block text-sm font-bold text-white">Trusted checkout</strong>
                <span className="mt-1 block text-sm leading-6 text-slate-300">Protected booking flow with clear confirmation steps.</span>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-3">
            {bookingBenefits.map((benefit) => (
              <div key={benefit} className="flex items-center gap-3 text-sm font-medium text-slate-300">
                <span className="h-2 w-2 shrink-0 rounded-full bg-brand-100" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          <div className="mb-7">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-brand-700">Reservation form</span>
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950">Book your ticket</h2>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-500">All fields are required before moving to available options.</p>
          </div>

          <form className="grid gap-6" onSubmit={handleSubmit}>
            <div>
              <h3 className="text-base font-extrabold text-slate-950">Passenger details</h3>
              <p className="mt-1 text-sm leading-6 text-slate-500">Provide traveller information to continue with the reservation.</p>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {transportOptions.map((option) => {
                const Icon = option.icon;
                const isActive = formData.transportType === option.value;

                return (
                  <label
                    key={option.value}
                    className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-2 py-3 text-sm font-bold transition sm:px-4 ${isActive ? 'border-brand-600 bg-brand-600 text-white shadow-md shadow-brand-600/20' : 'border-slate-200 bg-white text-slate-600 hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700'}`}
                  >
                    <input
                      type="radio"
                      name="transportType"
                      value={option.value}
                      checked={isActive}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <Icon size={18} />
                    <span>{option.label}</span>
                  </label>
                );
              })}
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <label className="grid gap-2 text-sm font-semibold text-slate-700">
                  <span>Passenger count</span>
                <div className="flex h-12 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 transition focus-within:border-brand-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-brand-100">
                  <UserRound size={16} />
                  <input
                    type="number"
                    name="passengerCount"
                    min="1"
                    placeholder="Number of passengers"
                    value={formData.passengerCount}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                  />
                </div>
              </label>

              {formData.transportType === 'buses' && (
                <>
                  <label className="relative grid gap-2 text-sm font-semibold text-slate-700">
                  <span>Departure place</span>
                  <div className="flex h-12 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 transition focus-within:border-brand-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-brand-100">
                      <MapPin size={16} />
                      <input
                        name="departure"
                        required
                        value={formData.departure}
                        onChange={handleChange}
                        onFocus={() => setActivePlaceField('departure')}
                        onBlur={() => setTimeout(() => setActivePlaceField(''), 120)}
                        placeholder="Type 3 letters for departure"
                        className="w-full bg-transparent text-sm font-normal outline-none placeholder:text-slate-400"
                      />
                    </div>
                    {activePlaceField === 'departure' &&
                      getBusPlaceMatches(formData.departure, formData.arrival).length > 0 && (
                        <div className="absolute left-0 right-0 top-full z-10 mt-2 grid gap-1 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl">
                          {getBusPlaceMatches(formData.departure, formData.arrival).map((place) => (
                            <button
                              key={place}
                              type="button"
                              className="rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-700 hover:bg-brand-50 hover:text-brand-700"
                              onMouseDown={() => handleBusPlaceSelect('departure', place)}
                            >
                              {place}
                            </button>
                          ))}
                        </div>
                      )}
                  </label>

                  <label className="relative grid gap-2 text-sm font-semibold text-slate-700">
                    <span>Arrival place</span>
                    <div className="flex h-12 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 transition focus-within:border-brand-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-brand-100">
                      <MapPin size={16} />
                      <input
                        name="arrival"
                        required
                        value={formData.arrival}
                        onChange={handleChange}
                        onFocus={() => setActivePlaceField('arrival')}
                        onBlur={() => setTimeout(() => setActivePlaceField(''), 120)}
                        placeholder="Type 3 letters for arrival"
                        className="w-full bg-transparent text-sm font-normal outline-none placeholder:text-slate-400"
                      />
                    </div>
                    {activePlaceField === 'arrival' &&
                      getBusPlaceMatches(formData.arrival, formData.departure).length > 0 && (
                        <div className="absolute left-0 right-0 top-full z-10 mt-2 grid gap-1 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl">
                          {getBusPlaceMatches(formData.arrival, formData.departure).map((place) => (
                            <button
                              key={place}
                              type="button"
                              className="rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-700 hover:bg-brand-50 hover:text-brand-700"
                              onMouseDown={() => handleBusPlaceSelect('arrival', place)}
                            >
                              {place}
                            </button>
                          ))}
                        </div>
                      )}
                  </label>
                </>
              )}
            </div>

            <div className="grid gap-4">
              {formData.passengers.map((passenger, index) => (
                <section key={index} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
                  <div className="mb-4">
                    <h4 className="font-extrabold text-slate-950">Passenger {index + 1}</h4>
                    <span className="mt-1 block text-sm text-slate-500">Fill in the traveller details</span>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="grid gap-2 text-sm font-semibold text-slate-700">
                      <span>Passenger Name</span>
                      <div className="flex h-12 items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 focus-within:border-brand-500 focus-within:ring-4 focus-within:ring-brand-100">
                        <UserRound size={16} />
                        <input
                          type="text"
                          placeholder="Enter passenger full name"
                          value={passenger.passengerName}
                          onChange={(e) =>
                            handlePassengerDetailChange(index, 'passengerName', e.target.value)
                          }
                          required
                          className="w-full bg-transparent text-sm font-normal outline-none placeholder:text-slate-400"
                        />
                      </div>
                    </label>

                    <label className="grid gap-2 text-sm font-semibold text-slate-700">
                      <span>Passenger Type</span>
                      <div className="flex h-12 items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 focus-within:border-brand-500 focus-within:ring-4 focus-within:ring-brand-100">
                        <UserRound size={16} />
                        <select
                          required
                          value={passenger.passengerType}
                          className="w-full bg-transparent text-sm font-normal outline-none"
                          onChange={(e) =>
                            handlePassengerDetailChange(index, 'passengerType', e.target.value)
                          }
                        >
                          <option value="" disabled>
                            Select passenger type
                          </option>
                          <option value="child">Child</option>
                          <option value="adult">Adult</option>
                          <option value="senior">Senior</option>
                        </select>
                      </div>
                    </label>

                    <label className="grid gap-2 text-sm font-semibold text-slate-700">
                      <span>Gender</span>
                      <div className="flex h-12 items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 focus-within:border-brand-500 focus-within:ring-4 focus-within:ring-brand-100">
                        <UserRound size={16} />
                        <select
                          required
                          value={passenger.gender}
                          className="w-full bg-transparent text-sm font-normal outline-none"
                          onChange={(e) =>
                            handlePassengerDetailChange(index, 'gender', e.target.value)
                          }
                        >
                          <option value="" disabled>
                            Select gender
                          </option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                      </div>
                    </label>
                  </div>
                </section>
              ))}
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Selected service</span>
                <strong className="mt-2 block text-sm font-bold text-slate-900">{activeTransport.label}</strong>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Payment</span>
                <strong className="mt-2 flex items-center gap-2 text-sm font-bold text-slate-900">
                  <CreditCard size={16} />
                  Secure checkout
                </strong>
              </div>
            </div>

            <button type="submit" className="h-12 w-full rounded-xl bg-brand-600 px-5 text-sm font-bold text-white shadow-lg shadow-brand-600/20 transition hover:bg-brand-700 focus:outline-none focus:ring-4 focus:ring-brand-100">
              View Available Options
            </button>
          </form>
        </section>
      </div>
    </main>
  );
};

export default Booking;
