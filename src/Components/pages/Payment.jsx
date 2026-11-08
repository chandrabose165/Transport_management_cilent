import React, { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BookingProgress from '../BookingProgress';
import { ArrowLeft, Building2, CreditCard, QrCode, ShieldCheck, Smartphone, Ticket } from 'lucide-react';

const paymentMethods = [
  { id: 'card', label: 'Card', icon: CreditCard },
  { id: 'netbanking', label: 'Net Banking', icon: Building2 },
  { id: 'upi', label: 'UPI', icon: Smartphone },
  { id: 'qr', label: 'QR', icon: QrCode },
];

const qrImagePath = '/payment-qr.png';

const getPassengerSummary = (bookingData) => {
  const names = bookingData?.passengers?.map((passenger) => passenger.passengerName).filter(Boolean) || [];

  if (!names.length) {
    return 'Passenger details';
  }

  return names.length === 1 ? names[0] : `${names[0]} + ${names.length - 1} more`;
};

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const bookingData = location.state?.bookingData;
  const selectedOption = location.state?.selectedOption;
  const selectedSeats = location.state?.selectedSeats || [];
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [qrImageAvailable, setQrImageAvailable] = useState(true);

  const priceLabel = selectedOption?.fare || 'Rs. 0';
  const tripLabel = useMemo(() => {
    if (!selectedOption) {
      return 'Booking payment';
    }

    return `${selectedOption.id} · ${selectedOption.name}`;
  }, [selectedOption]);

  return (
    <main className="min-h-screen bg-transport-surface bg-cover bg-center bg-fixed px-4 py-8 text-slate-900 sm:px-8">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <section className="rounded-3xl bg-transport-hero bg-cover bg-center p-6 text-white shadow-soft sm:p-8">
          <button type="button" className="mb-8 inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-bold text-slate-200 transition hover:bg-white/10" onClick={() => navigate(-1)}>
            <ArrowLeft size={16} />
            Back
          </button>

          <span className="text-xs font-bold uppercase tracking-[0.18em] text-brand-100">Secure payment</span>
          <h1 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight">Complete your booking.</h1>
          <p className="mt-3 leading-7 text-slate-300">
            Use card, net banking, UPI, or QR payment to finish the reservation
            securely and continue to confirmation.
          </p>
          <BookingProgress currentStep={4} />

          <div className="mt-7 grid gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Service</span>
              <strong className="mt-1 block text-sm text-white">{tripLabel}</strong>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Passenger</span>
              <strong className="mt-1 block text-sm text-white">{getPassengerSummary(bookingData)}</strong>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Seats</span>
              <strong className="mt-1 block text-sm text-white">{selectedSeats.length ? selectedSeats.join(', ') : 'Not selected'}</strong>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-brand-100/20 bg-brand-600/20 p-4">
              <span className="text-sm font-semibold text-slate-200">Total fare</span>
              <strong className="text-xl font-extrabold text-white">{priceLabel}</strong>
            </div>
          </div>

          <div className="mt-5 flex items-center gap-2 rounded-xl bg-white/5 px-4 py-3 text-sm text-slate-300">
            <ShieldCheck size={16} />
            <span>All transactions are processed through a protected payment flow.</span>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          <div className="mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-brand-700">Payment options</span>
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950">Select a method</h2>
            </div>
            <p className="mt-2 text-sm text-slate-500">Pick your preferred method and enter the required details.</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {paymentMethods.map((method) => {
              const Icon = method.icon;
              const isActive = paymentMethod === method.id;

              return (
                <button
                  key={method.id}
                  type="button"
                  className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-3.5 text-sm font-bold transition ${isActive ? 'border-brand-600 bg-brand-50 text-brand-700 ring-2 ring-brand-100' : 'border-slate-200 bg-white text-slate-600 hover:border-brand-200 hover:bg-slate-50'}`}
                  onClick={() => setPaymentMethod(method.id)}
                >
                  <Icon size={18} />
                  <span>{method.label}</span>
                </button>
              );
            })}
          </div>

          <form className="mt-6 grid gap-5">
            {paymentMethod === 'card' && (
              <div className="grid gap-4">
                <label className="grid gap-2 text-sm font-semibold text-slate-700">
                  Card number
                  <input className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 font-normal outline-none transition focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-100" type="text" placeholder="1234 5678 9012 3456" required />
                </label>
                <label className="grid gap-2 text-sm font-semibold text-slate-700">
                  Card holder name
                  <input className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 font-normal outline-none transition focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-100" type="text" placeholder="Name on card" required />
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <label className="grid gap-2 text-sm font-semibold text-slate-700">Expiry<input className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 font-normal outline-none transition focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-100" type="text" placeholder="MM/YY" required /></label>
                  <label className="grid gap-2 text-sm font-semibold text-slate-700">CVV<input className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 font-normal outline-none transition focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-100" type="password" placeholder="CVV" required /></label>
                </div>
              </div>
            )}

            {paymentMethod === 'netbanking' && (
              <div className="grid gap-4">
                <label className="grid gap-2 text-sm font-semibold text-slate-700">Select bank
                  <select className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 font-normal outline-none transition focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-100" required defaultValue="">
                    <option value="" disabled>
                      Choose your bank
                    </option>
                    <option value="sbi">State Bank</option>
                    <option value="hdfc">HDFC Bank</option>
                    <option value="icici">ICICI Bank</option>
                    <option value="axis">Axis Bank</option>
                  </select>
                </label>
                <label className="grid gap-2 text-sm font-semibold text-slate-700">Account holder name<input className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 font-normal outline-none transition focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-100" type="text" placeholder="Name on account" required /></label>
              </div>
            )}

            {paymentMethod === 'upi' && (
              <div className="grid gap-4">
                <label className="grid gap-2 text-sm font-semibold text-slate-700">UPI ID<input className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 font-normal outline-none transition focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-100" type="text" placeholder="example@upi" required /></label>
                <div className="flex items-center gap-2 rounded-xl bg-brand-50 px-4 py-3 text-sm text-brand-700">
                  <Smartphone size={16} />
                  <span>Approve the payment request in your UPI app after submission.</span>
                </div>
              </div>
            )}

            {paymentMethod === 'qr' && (
              <div className="grid gap-4">
                <div className="mx-auto grid max-w-sm justify-items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center">
                  {qrImageAvailable ? (
                    <img
                      src={qrImagePath}
                      alt="Payment QR code"
                      className="h-48 w-48 rounded-xl object-contain"
                      onError={() => setQrImageAvailable(false)}
                    />
                  ) : (
                    <>
                      <QrCode size={82} />
                      <span className="text-xs text-slate-500">
                        QR image not found at <code>/public/payment-qr.png</code>
                      </span>
                    </>
                  )}
                  <strong className="text-lg font-extrabold text-slate-950">Scan to pay</strong>
                  <span className="text-sm leading-6 text-slate-500">
                    Use any UPI-enabled app to scan this QR and complete payment.
                  </span>
                </div>
              </div>
            )}

            <div className="flex flex-col justify-between gap-4 border-t border-slate-100 pt-5 sm:flex-row sm:items-center">
              <div className="inline-flex items-center gap-2 text-sm font-bold text-slate-700">
                <Ticket size={16} />
                <span>Total payable: {priceLabel}</span>
              </div>

              <button type="submit" className="rounded-xl bg-brand-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-700 focus:outline-none focus:ring-4 focus:ring-brand-100">
                Pay Now
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
};

export default Payment;
