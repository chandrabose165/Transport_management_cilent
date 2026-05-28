import React, { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../Styles/Payment.css';
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
    <div className="payment-page">
      <div className="payment-shell">
        <section className="payment-overview">
          <button type="button" className="payment-back-btn" onClick={() => navigate(-1)}>
            <ArrowLeft size={16} />
            Back
          </button>

          <span className="payment-eyebrow">Secure payment</span>
          <h1>Choose your payment method and complete the booking.</h1>
          <p>
            Use card, net banking, UPI, or QR payment to finish the reservation
            securely and continue to confirmation.
          </p>

          <div className="payment-summary-list">
            <div className="payment-summary-card">
              <span>Service</span>
              <strong>{tripLabel}</strong>
            </div>
            <div className="payment-summary-card">
              <span>Passenger</span>
              <strong>{getPassengerSummary(bookingData)}</strong>
            </div>
            <div className="payment-summary-card">
              <span>Seats</span>
              <strong>{selectedSeats.length ? selectedSeats.join(', ') : 'Not selected'}</strong>
            </div>
            <div className="payment-summary-card">
              <span>Total fare</span>
              <strong>{priceLabel}</strong>
            </div>
          </div>

          <div className="payment-note">
            <ShieldCheck size={16} />
            <span>All transactions are processed through a protected payment flow.</span>
          </div>
        </section>

        <section className="payment-panel">
          <div className="payment-panel-header">
            <div>
              <span className="payment-label">Payment options</span>
              <h2>Select a method</h2>
            </div>
            <p>Pick the method you prefer and enter the required details.</p>
          </div>

          <div className="payment-method-grid">
            {paymentMethods.map((method) => {
              const Icon = method.icon;
              const isActive = paymentMethod === method.id;

              return (
                <button
                  key={method.id}
                  type="button"
                  className={`payment-method-card ${isActive ? 'payment-method-card-active' : ''}`}
                  onClick={() => setPaymentMethod(method.id)}
                >
                  <Icon size={18} />
                  <span>{method.label}</span>
                </button>
              );
            })}
          </div>

          <form className="payment-form">
            {paymentMethod === 'card' && (
              <div className="payment-fields">
                <div className="payment-field">
                  <span>Card Number</span>
                  <input type="text" placeholder="1234 5678 9012 3456" required />
                </div>
                <div className="payment-field">
                  <span>Card Holder Name</span>
                  <input type="text" placeholder="Enter card holder name" required />
                </div>
                <div className="payment-row">
                  <div className="payment-field">
                    <span>Expiry</span>
                    <input type="text" placeholder="MM/YY" required />
                  </div>
                  <div className="payment-field">
                    <span>CVV</span>
                    <input type="password" placeholder="CVV" required />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'netbanking' && (
              <div className="payment-fields">
                <div className="payment-field">
                  <span>Select Bank</span>
                  <select required defaultValue="">
                    <option value="" disabled>
                      Choose your bank
                    </option>
                    <option value="sbi">State Bank</option>
                    <option value="hdfc">HDFC Bank</option>
                    <option value="icici">ICICI Bank</option>
                    <option value="axis">Axis Bank</option>
                  </select>
                </div>
                <div className="payment-field">
                  <span>Account Holder Name</span>
                  <input type="text" placeholder="Enter account holder name" required />
                </div>
              </div>
            )}

            {paymentMethod === 'upi' && (
              <div className="payment-fields">
                <div className="payment-field">
                  <span>UPI ID</span>
                  <input type="text" placeholder="example@upi" required />
                </div>
                <div className="payment-inline-note">
                  <Smartphone size={16} />
                  <span>Approve the payment request in your UPI app after submission.</span>
                </div>
              </div>
            )}

            {paymentMethod === 'qr' && (
              <div className="payment-fields">
                <div className="qr-box">
                  {qrImageAvailable ? (
                    <img
                      src={qrImagePath}
                      alt="Payment QR code"
                      className="qr-image"
                      onError={() => setQrImageAvailable(false)}
                    />
                  ) : (
                    <>
                      <QrCode size={82} />
                      <span className="qr-missing-note">
                        QR image not found at <code>/public/payment-qr.png</code>
                      </span>
                    </>
                  )}
                  <strong>Scan to pay</strong>
                  <span>
                    Use any UPI-enabled app to scan this QR and complete payment.
                  </span>
                </div>
              </div>
            )}

            <div className="payment-footer">
              <div className="payment-total">
                <Ticket size={16} />
                <span>Total payable: {priceLabel}</span>
              </div>

              <button type="submit" className="pay-btn">
                Pay Now
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Payment;
