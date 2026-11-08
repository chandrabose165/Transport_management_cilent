import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  Bus,
  CalendarCheck2,
  Check,
  Clock3,
  Compass,
  CreditCard,
  MapPin,
  Plane,
  Sparkles,
  Train,
} from 'lucide-react';

const transportCategories = [
  {
    type: 'trains',
    name: 'Train',
    description: 'Take the scenic route and travel at your own pace.',
    image: '/images/train-category.jpg',
    icon: Train,
    accent: 'bg-amber-400 text-slate-950',
    number: '01',
  },
  {
    type: 'buses',
    name: 'Bus',
    description: 'Find a comfortable ride to your next stop.',
    image: '/images/bus-category.jpg',
    icon: Bus,
    accent: 'bg-cyan-300 text-slate-950',
    number: '02',
  },
  {
    type: 'flights',
    name: 'Flight',
    description: 'Make more of the journey, wherever you’re headed.',
    image: '/images/flight-category.jpg',
    icon: Plane,
    accent: 'bg-violet-300 text-slate-950',
    number: '03',
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('userEmail');
  const displayName = userEmail?.split('@')[0] || 'traveler';
  const initials = displayName.charAt(0).toUpperCase();

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    navigate('/login');
  };

  return (
    <main className="min-h-screen bg-[#f7f8f6] text-slate-900">
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-5 sm:px-7 lg:px-10">
        <header className="mb-7 flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="group inline-flex items-center gap-2 text-sm font-extrabold tracking-tight text-slate-950"
            aria-label="Go to home"
          >
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-brand-700 text-white shadow-lg shadow-brand-900/15 transition group-hover:-rotate-6">
              <Compass size={21} />
            </span>
            <span className="text-lg">go<span className="text-brand-600">route</span></span>
          </button>

          <div className="flex items-center gap-3 rounded-full border border-slate-200/80 bg-white py-1.5 pl-2 pr-3 shadow-sm">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-brand-100 text-sm font-extrabold text-brand-800">
              {initials}
            </div>
            <div className="hidden min-w-0 sm:block">
              <p className="max-w-40 truncate text-sm font-bold text-slate-800">{userEmail || 'Guest'}</p>
              <p className="text-[11px] font-medium text-slate-500">Your account</p>
            </div>
            <span className="mx-1 hidden h-7 w-px bg-slate-200 sm:block" />
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-full px-2 py-1.5 text-xs font-bold text-slate-500 transition hover:bg-rose-50 hover:text-rose-600"
            >
              Log out
            </button>
          </div>
        </header>

        <section className="relative isolate overflow-hidden rounded-[2rem] bg-transport-hero bg-cover bg-center px-6 py-10 text-white shadow-2xl shadow-slate-900/15 sm:px-10 sm:py-12 lg:px-14 lg:py-16">
          <div className="pointer-events-none absolute -right-16 -top-24 -z-10 h-80 w-80 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -right-2 -top-10 -z-10 h-56 w-56 rounded-full border border-white/10" />

          <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="max-w-2xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-2 text-xs font-bold tracking-wide text-white/90 backdrop-blur">
                <Sparkles size={14} className="text-amber-300" />
                YOUR NEXT ADVENTURE STARTS HERE
              </div>
              <h1 className="max-w-xl text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
                The journey is
                <span className="block text-amber-300">yours to make.</span>
              </h1>
              <p className="mt-5 max-w-lg text-base leading-7 text-white/75 sm:text-lg">
                Good to see you, <span className="font-bold text-white">{displayName}</span>. Pick your ride and make your next trip happen.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => navigate('/booking')}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-300 px-5 py-3.5 text-sm font-extrabold text-slate-950 shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:bg-amber-200 focus:outline-none focus:ring-4 focus:ring-amber-200/40"
                >
                  Plan a trip <ArrowRight size={17} />
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/BookingHistory')}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-5 py-3.5 text-sm font-bold text-white backdrop-blur transition hover:bg-white/15 focus:outline-none focus:ring-4 focus:ring-white/20"
                >
                  <CalendarCheck2 size={17} /> My bookings
                </button>
              </div>
            </div>

            <div className="mx-auto w-full max-w-sm lg:ml-auto">
              <div className="rounded-3xl border border-white/20 bg-white/10 p-5 shadow-xl shadow-black/10 backdrop-blur-xl sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/60">A little inspiration</p>
                    <h2 className="mt-1 text-lg font-extrabold">Where to next?</h2>
                  </div>
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-amber-300 text-slate-950">
                    <MapPin size={20} />
                  </span>
                </div>
                <div className="my-6 flex items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/15">
                    <Compass size={18} />
                  </span>
                  <span className="h-px flex-1 border-t border-dashed border-white/30" />
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-amber-300/20 text-amber-200">
                    <MapPin size={18} />
                  </span>
                </div>
                <p className="text-sm leading-6 text-white/75">
                  A new place, a familiar favorite, or somewhere in between. Your next story is just a trip away.
                </p>
                <button
                  type="button"
                  onClick={() => navigate('/booking')}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-amber-300 transition hover:text-amber-200"
                >
                  Find your route <ArrowUpRight size={16} />
                </button>
              </div>
              <div className="mt-4 flex items-center justify-center gap-2 text-xs font-medium text-white/65">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-emerald-400/20 text-emerald-300">
                  <Check size={12} />
                </span>
                Your travel options, all in one place
              </div>
            </div>
          </div>
        </section>

        <section className="mt-12" aria-labelledby="services-heading">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-brand-700">Make it your trip</p>
              <h2 id="services-heading" className="mt-2 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                Choose how you travel
              </h2>
              <p className="mt-2 text-sm text-slate-500 sm:text-base">Three ways to get where you’re going.</p>
            </div>
            <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-500 sm:flex">
              <Clock3 size={14} className="text-brand-600" />
              Your next trip is a few clicks away
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {transportCategories.map(({ type, name, description, image, icon: Icon, accent, number }) => (
              <button
                key={type}
                type="button"
                onClick={() => navigate('/booking', { state: { transportType: type } })}
                className="group relative flex min-h-[19rem] flex-col justify-between overflow-hidden rounded-3xl bg-slate-900 p-5 text-left text-white shadow-lg shadow-slate-900/10 transition duration-300 hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-brand-100 sm:min-h-[21rem] sm:p-6"
              >
                <img
                  src={image}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-gradient-to-b from-slate-950/45 via-slate-950/10 to-slate-950/90" />
                <span className="relative flex items-start justify-between">
                  <span className={`grid h-12 w-12 place-items-center rounded-2xl ${accent}`}>
                    <Icon size={22} />
                  </span>
                  <span className="text-xs font-extrabold tracking-[0.2em] text-white/70">{number} / 03</span>
                </span>
                <span className="relative">
                  <span className="text-2xl font-black tracking-tight sm:text-3xl">{name}</span>
                  <span className="mt-2 block max-w-xs text-sm leading-6 text-white/80">{description}</span>
                  <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-xs font-extrabold backdrop-blur transition group-hover:border-white/40 group-hover:bg-white/20">
                    Explore {name.toLowerCase()}
                    <ArrowRight size={15} className="transition group-hover:translate-x-1" />
                  </span>
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="mt-10 grid gap-4 rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm sm:grid-cols-3 sm:p-6">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-700">
              <Train size={19} />
            </span>
            <div>
              <p className="text-sm font-extrabold text-slate-800">Different ways to go</p>
              <p className="mt-0.5 text-xs text-slate-500">Train, bus, or flight</p>
            </div>
          </div>
          <div className="flex items-center gap-3 border-slate-100 sm:border-l sm:pl-5">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-sky-50 text-sky-700">
              <CreditCard size={19} />
            </span>
            <div>
              <p className="text-sm font-extrabold text-slate-800">Simple booking flow</p>
              <p className="mt-0.5 text-xs text-slate-500">Choose a ride and get going</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => navigate('/BookingHistory')}
            className="group flex items-center gap-3 border-slate-100 text-left sm:border-l sm:pl-5"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-violet-50 text-violet-700">
              <CalendarCheck2 size={19} />
            </span>
            <span className="flex-1">
              <span className="block text-sm font-extrabold text-slate-800">All your bookings</span>
              <span className="mt-0.5 block text-xs text-slate-500">Check your trip history</span>
            </span>
            <ArrowRight size={16} className="text-slate-400 transition group-hover:translate-x-1" />
          </button>
        </section>

        <footer className="mt-8 flex flex-wrap items-center justify-between gap-3 px-1 text-xs font-medium text-slate-400">
          <span>Make every journey count.</span>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="font-bold text-slate-500 transition hover:text-brand-700"
          >
            Back to home
          </button>
        </footer>
      </div>
    </main>
  );
};

export default Dashboard;
