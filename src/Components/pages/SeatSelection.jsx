import React, { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../Styles/SeatSelection.css';
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
    <div className="seat-page">
      <div className="seat-shell">
        <section className="seat-overview-card">
          <button type="button" className="seat-back-btn" onClick={() => navigate(-1)}>
            <ArrowLeft size={16} />
            Back
          </button>

          <span className="seat-eyebrow">Seat selection</span>
          <h1>Select the seats for your journey.</h1>
          <p>
            Choose exactly {requiredSeatCount} seat{requiredSeatCount > 1 ? 's' : ''} to
            continue to payment and confirmation.
          </p>

          <div className="seat-summary-cards">
            <div className="seat-summary-card">
              <span>Service</span>
              <strong>{routeTitle}</strong>
            </div>
            <div className="seat-summary-card">
              <span>Passenger</span>
              <strong>{getPassengerSummary(bookingData)}</strong>
            </div>
            <div className="seat-summary-card">
              <span>Selected seats</span>
              <strong>{selectedSeats.length ? selectedSeats.join(', ') : 'None yet'}</strong>
            </div>
          </div>
        </section>

        <section className="seat-layout-card">
          <div className="seat-layout-header">
            <div>
              <span className="seat-label">Choose seats</span>
              <h2>Available seat map</h2>
            </div>
            <div className="seat-legend">
              <span><i className="seat-dot seat-dot-available" />Available</span>
              <span><i className="seat-dot seat-dot-selected" />Selected</span>
              <span><i className="seat-dot seat-dot-booked" />Booked</span>
            </div>
          </div>

          <div className="seat-grid-wrapper">
            <div className="seat-screen">Front</div>
            <div className="seat-grid">
              {seatRows.map((row, rowIndex) => (
                <div key={rowIndex} className="seat-row">
                  {row.map((seat) => {
                    if (!seat) {
                      return <div key={`${rowIndex}-gap`} className="seat-gap" />;
                    }

                    const isBooked = bookedSeats.has(seat);
                    const isSelected = selectedSeats.includes(seat);

                    return (
                      <button
                        key={seat}
                        type="button"
                        className={`seat-tile ${
                          isBooked ? 'seat-tile-booked' : isSelected ? 'seat-tile-selected' : ''
                        }`}
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

          <div className="seat-action-bar">
            <div className="seat-action-copy">
              <Ticket size={16} />
              <span>
                {selectedSeats.length} of {requiredSeatCount} seat(s) selected
              </span>
            </div>

            <button
              type="button"
              className="seat-continue-btn"
              onClick={handleContinue}
              disabled={!canContinue}
            >
              <CreditCard size={16} />
              Continue to Payment
            </button>
          </div>

          <div className="seat-note">
            <CheckCircle2 size={16} />
            <span>Select the required number of seats to unlock the next step.</span>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SeatSelection;
