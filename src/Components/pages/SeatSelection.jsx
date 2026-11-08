import React, { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BookingProgress from '../BookingProgress';
import { Armchair, ArrowLeft, CheckCircle2, CreditCard, Ticket } from 'lucide-react';

const seatRows = [
  ['A1', 'A2', null, 'A3', 'A4'],
  ['B1', 'B2', null, 'B3', 'B4'],
  ['C1', 'C2', null, 'C3', 'C4'],
  ['D1', 'D2', null, 'D3', 'D4'],
  ['E1', 'E2', null, 'E3', 'E4'],
];

const bookedSeats = new Set(['A2', 'C3', 'D1']);

const getPassengerSummary = (bookingData) => {
  const names = bookingData?.passengers?.map((passenger) => passenger.passengerName).filter(Boolean) || [];

  if (!names.length) {
    return 'Passenger details';
  }

  return names.length === 1 ? names[0] : `${names[0]} + ${names.length - 1} more`;
};

const SeatSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const bookingData = location.state?.bookingData;
  const selectedOption = location.state?.selectedOption;

  const requiredSeatCount = Number(bookingData?.passengerCount || 1);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const canContinue = selectedSeats.length === requiredSeatCount;

  const routeTitle = useMemo(() => {
    if (!selectedOption) {
      return 'Selected service';
    }

    return `${selectedOption.id} · ${selectedOption.name}`;
  }, [selectedOption]);

  const handleSeatToggle = (seat) => {
    if (bookedSeats.has(seat)) {
      return;
    }

    setSelectedSeats((current) => {
      if (current.includes(seat)) {
        return current.filter((entry) => entry !== seat);
      }

      if (current.length >= requiredSeatCount) {
        return current;
      }

      return [...current, seat];
    });
  };

  const handleContinue = () => {
    navigate('/payment', {
      state: {
        bookingData,
        selectedOption,
        selectedSeats,
      },
    });
  };

  return (
    <main className="min-h-screen bg-transport-surface bg-cover bg-center bg-fixed px-4 py-8 text-slate-900 sm:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <section className="rounded-3xl bg-transport-hero bg-cover bg-center p-6 text-white shadow-soft sm:p-9">
          <button type="button" className="mb-8 inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-bold text-slate-200 transition hover:bg-white/10" onClick={() => navigate(-1)}>
            <ArrowLeft size={16} />
            Back
          </button>

          <span className="text-xs font-bold uppercase tracking-[0.18em] text-brand-100">Seat selection</span>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">Select the seats for your journey.</h1>
          <p className="mt-3 max-w-2xl leading-7 text-slate-300">
            Choose exactly {requiredSeatCount} seat{requiredSeatCount > 1 ? 's' : ''} to
            continue to payment and confirmation.
          </p>
          <BookingProgress currentStep={3} />

          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Service</span>
              <strong className="mt-2 block text-sm text-white">{routeTitle}</strong>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Passenger</span>
              <strong className="mt-2 block text-sm text-white">{getPassengerSummary(bookingData)}</strong>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Selected seats</span>
              <strong className="mt-2 block text-sm text-white">{selectedSeats.length ? selectedSeats.join(', ') : 'None yet'}</strong>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-brand-700">Choose seats</span>
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950">Available seat map</h2>
            </div>
            <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-500">
              <span className="inline-flex items-center gap-2"><i className="h-3 w-3 rounded bg-slate-100 ring-1 ring-slate-300" />Available</span>
              <span className="inline-flex items-center gap-2"><i className="h-3 w-3 rounded bg-brand-600" />Selected</span>
              <span className="inline-flex items-center gap-2"><i className="h-3 w-3 rounded bg-slate-300" />Booked</span>
            </div>
          </div>

          <div className="mx-auto max-w-md rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-8">
            <div className="mb-7 rounded-t-[50%] border-t-4 border-brand-200 py-3 text-center text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Front</div>
            <div className="grid gap-3">
              {seatRows.map((row, rowIndex) => (
                <div key={rowIndex} className="grid grid-cols-[1fr_1fr_2rem_1fr_1fr] gap-2">
                  {row.map((seat) => {
                    if (!seat) {
                      return <div key={`${rowIndex}-gap`} />;
                    }

                    const isBooked = bookedSeats.has(seat);
                    const isSelected = selectedSeats.includes(seat);

                    return (
                      <button
                        key={seat}
                        type="button"
                        aria-label={`Seat ${seat}${isBooked ? ', booked' : isSelected ? ', selected' : ', available'}`}
                        className={`flex aspect-square flex-col items-center justify-center gap-1 rounded-xl border text-xs font-bold transition disabled:cursor-not-allowed ${isBooked ? 'border-slate-300 bg-slate-200 text-slate-400' : isSelected ? 'border-brand-600 bg-brand-600 text-white shadow-md shadow-brand-600/20' : 'border-slate-200 bg-white text-slate-600 hover:border-brand-400 hover:bg-brand-50 hover:text-brand-700'}`}
                        onClick={() => handleSeatToggle(seat)}
                        disabled={isBooked}
                      >
                        <Armchair size={16} />
                        <span>{seat}</span>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-7 flex flex-col justify-between gap-4 border-t border-slate-100 pt-5 sm:flex-row sm:items-center">
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600">
              <Ticket size={16} />
              <span>
                {selectedSeats.length} of {requiredSeatCount} seat(s) selected
              </span>
            </div>

            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
              onClick={handleContinue}
              disabled={!canContinue}
            >
              <CreditCard size={16} />
              Continue to Payment
            </button>
          </div>

          <div className="mt-4 flex items-center gap-2 rounded-xl bg-brand-50 px-4 py-3 text-sm text-brand-700">
            <CheckCircle2 size={16} />
            <span>Select the required number of seats to unlock the next step.</span>
          </div>
        </section>
      </div>
    </main>
  );
};

export default SeatSelection;
