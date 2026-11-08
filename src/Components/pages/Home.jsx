import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Bus,
  CalendarDays,
  Clock3,
  Headphones,
  MapPin,
  Package,
  Plane,
  Search,
  ShieldCheck,
  Train,
} from 'lucide-react';

const placeSuggestions = [
  'Chennai',
  'Bengaluru',
  'Hyderabad',
  'Mumbai',
  'Pune',
  'Kochi',
  'Delhi',
  'Kolkata',
  'Goa',
  'Andhrapradesh',
  'Tamilnadu',
];

const transportDetails = {
  flights: {
    label: 'Flights',
    icon: Plane,
    fields: [
      { label: 'From', placeholder: 'Departure city' },
      { label: 'To', placeholder: 'Destination city' },
      { label: 'Depart', placeholder: 'Select date', type: 'date' },
    ],
  },
  trains: {
    label: 'Trains',
    icon: Train,
    fields: [
      { label: 'From', placeholder: 'Departure station' },
      { label: 'To', placeholder: 'Destination station' },
      { label: 'Date', placeholder: 'Select date', type: 'date' },
    ],
  },
  buses: {
    label: 'Buses',
    icon: Bus,
    fields: [
      { label: 'From', placeholder: 'Start point' },
      { label: 'To', placeholder: 'End point' },
      { label: 'Date', placeholder: 'Select date', type: 'date' },
    ],
  },
  cargo: {
    label: 'Cargo',
    icon: Package,
    fields: [
      { label: 'From', placeholder: 'Pickup location' },
      { label: 'To', placeholder: 'Delivery location' },
      { label: 'Weight', placeholder: 'Enter weight (kg)', type: 'number' },
    ],
  },
};

const getFieldName = (label) => {
  if (label === 'From') return 'from';
  if (label === 'To') return 'to';
  if (label === 'Depart') return 'depart';
  if (label === 'Date') return 'date';
  return 'weightKg';
};

const Home = () => {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('userEmail');
  const username = localStorage.getItem('username');
  const [activeTab, setActiveTab] = useState('trains');
  const [suggestionField, setSuggestionField] = useState(null);
  const [searchValues, setSearchValues] = useState({
    flights: { from: '', to: '', depart: '' },
    trains: { from: '', to: '', date: '' },
    buses: { from: '', to: '', date: '' },
    cargo: { from: '', to: '', weightKg: '' },
  });

  const current = transportDetails[activeTab];
  const currentSearch = searchValues[activeTab];
  const minDate = new Date().toISOString().split('T')[0];

  const suggestionsFor = (query) => {
    const search = query.trim().toLowerCase();
    if (search.length < 2) return [];
    return placeSuggestions.filter((place) => place.toLowerCase().includes(search));
  };

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('username');
    navigate('/login');
  };

  const handleSearchValueChange = (fieldName, value) => {
    setSearchValues((previous) => ({
      ...previous,
      [activeTab]: { ...previous[activeTab], [fieldName]: value },
    }));
  };

  const handleSearchRedirect = (event) => {
    event.preventDefault();
    navigate('/booking', {
      state: { transportType: activeTab, searchData: currentSearch },
    });
  };

  return (
    <div className="min-h-screen bg-transport-surface bg-cover bg-center bg-fixed text-slate-900">
      <nav className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-2 px-4 py-3 sm:flex-row sm:gap-4 sm:px-8 sm:py-4">
          <Link to="/" className="flex items-center gap-3 text-xl font-extrabold tracking-tight text-slate-950">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-brand-600 text-white">
              <Train size={21} />
            </span>
            Transport<span className="text-brand-600">Hub</span>
          </Link>
          <div className="flex w-full items-center justify-between gap-1 sm:w-auto sm:justify-end sm:gap-2">
            <Link to="/dashboard" className="rounded-xl px-2.5 py-2.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-950 sm:px-4 sm:text-sm">
              Dashboard
            </Link>
            {userEmail ? (
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-2 pr-3 shadow-sm">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 font-bold text-brand-700">
                  {(username || userEmail).charAt(0).toUpperCase()}
                </div>
                <div className="hidden sm:block">
                  <p className="text-xs text-slate-500">Welcome back</p>
                  <p className="max-w-36 truncate text-sm font-bold text-slate-900">{username || userEmail}</p>
                </div>
                <button onClick={handleLogout} className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-rose-50 hover:text-rose-700">
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="rounded-xl px-2.5 py-2.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-950 sm:px-4 sm:text-sm">
                  Login
                </Link>
                <Link to="/register" className="rounded-xl bg-slate-900 px-3 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-brand-700 sm:px-4 sm:text-sm">
                  Create account
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <main>
        <section className="relative overflow-hidden bg-transport-hero bg-cover bg-center">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_5%,rgba(15,155,142,0.3),transparent_40%)]" />
          <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-100">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                One platform for every journey
              </span>
              <h1 className="mt-7 text-4xl font-black leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
                Travel and logistics, <span className="text-brand-100">made simple.</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
                Compare services, plan your route, and manage passenger or cargo bookings from one reliable place.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  [ShieldCheck, 'Trusted bookings'],
                  [Clock3, 'Live availability'],
                  [Headphones, 'Dedicated support'],
                ].map(([Icon, label]) => (
                  <span key={label} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-sm font-medium text-slate-200">
                    <Icon size={16} className="text-brand-100" />
                    {label}
                  </span>
                ))}
              </div>
            </div>

            <section className="rounded-3xl border border-white/70 bg-white p-4 shadow-2xl shadow-black/20 sm:p-6">
              <div>
                <p className="text-sm font-bold text-brand-700">Plan your journey</p>
                <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-950">Where would you like to go?</h2>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-2 rounded-2xl bg-slate-100 p-1.5 sm:grid-cols-4">
                {Object.entries(transportDetails).map(([key, transport]) => {
                  const Icon = transport.icon;
                  const active = activeTab === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setActiveTab(key)}
                      className={`flex items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-bold transition ${active ? 'bg-white text-brand-700 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
                    >
                      <Icon size={17} />
                      {transport.label}
                    </button>
                  );
                })}
              </div>

              <form className="mt-5 grid gap-4 sm:grid-cols-2" onSubmit={handleSearchRedirect}>
                {current.fields.map((field) => {
                  const fieldName = getFieldName(field.label);
                  const isTrainText = activeTab === 'trains' && ['From', 'To'].includes(field.label);
                  const InputIcon = isTrainText ? MapPin : CalendarDays;
                  return (
                    <label key={fieldName} className={`relative grid gap-2 ${field.type === 'number' ? 'sm:col-span-2' : ''}`}>
                      <span className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                        <InputIcon size={15} className="text-brand-600" />
                        {field.label}
                      </span>
                      <input
                        type={field.type || 'text'}
                        placeholder={field.placeholder}
                        value={currentSearch[fieldName]}
                        min={field.type === 'date' ? minDate : undefined}
                        onChange={(event) => {
                          const value = event.target.value;
                          handleSearchValueChange(fieldName, value);
                          if (isTrainText) setSuggestionField(value.trim().length >= 2 ? fieldName : null);
                        }}
                        onFocus={() => {
                          if (isTrainText && currentSearch[fieldName].trim().length >= 2) setSuggestionField(fieldName);
                        }}
                        onBlur={() => setTimeout(() => setSuggestionField(null), 200)}
                        required
                        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-100"
                      />
                      {isTrainText && suggestionField === fieldName && (
                        <div className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl">
                          {suggestionsFor(currentSearch[fieldName]).length === 0 ? (
                            <p className="px-3 py-2 text-sm text-slate-500">No matching locations</p>
                          ) : suggestionsFor(currentSearch[fieldName]).map((place) => (
                            <button
                              key={place}
                              type="button"
                              onMouseDown={() => {
                                handleSearchValueChange(fieldName, place);
                                setSuggestionField(null);
                              }}
                              className="block w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-700 hover:bg-brand-50 hover:text-brand-700"
                            >
                              {place}
                            </button>
                          ))}
                        </div>
                      )}
                    </label>
                  );
                })}
                <button type="submit" className="flex h-12 items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 font-bold text-white shadow-lg shadow-brand-600/20 transition hover:bg-brand-700 focus:outline-none focus:ring-4 focus:ring-brand-100 sm:col-span-2">
                  <Search size={17} />
                  Search availability
                  <ArrowRight size={16} />
                </button>
              </form>
              <p className="mt-4 text-center text-xs text-slate-500">Your trip details can be reviewed before booking.</p>
            </section>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-brand-700">Travel inspiration</p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950">Popular routes</h2>
            </div>
            <p className="text-sm text-slate-500">Plan your next journey with confidence.</p>
          </div>
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {[
              ['Hyderabad', 'Bengaluru', 'Fastest and most booked route'],
              ['Chennai', 'Mumbai', 'Affordable daily transport'],
              ['Delhi', 'Kolkata', 'A premium travel experience'],
            ].map(([from, to, detail]) => (
              <article key={from} className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-brand-200 hover:shadow-soft">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-500">
                  <MapPin size={16} className="text-brand-600" />
                  Recommended route
                </div>
                <h3 className="mt-5 text-xl font-extrabold text-slate-950">{from} <span className="text-brand-600">→</span> {to}</h3>
                <p className="mt-2 text-sm text-slate-500">{detail}</p>
                <div className="mt-5 flex items-center gap-2 text-sm font-bold text-brand-700">
                  Start planning <ArrowRight size={15} className="transition group-hover:translate-x-1" />
                </div>
              </article>
            ))}
          </div>

          <div className="mt-14 rounded-3xl bg-brand-50 px-6 py-8 sm:px-9">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-brand-700">Across the country</p>
                <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950">Popular destinations</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Hyderabad', 'Bengaluru', 'Chennai', 'Mumbai'].map((city) => (
                  <span key={city} className="rounded-full border border-brand-100 bg-white px-4 py-2 text-sm font-semibold text-slate-700">{city}</span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-slate-200 bg-white px-5 py-6 text-center text-sm text-slate-500">
        © Chandrabose 2026 · TransportHub
      </footer>
    </div>
  );
};

export default Home;
