import React, { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../Styles/Availability.css';
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
    <div className="availability-page">
      <div className="availability-shell">
        <section className="availability-header-card">
          <button type="button" className="availability-back-btn" onClick={() => navigate(-1)}>
            <ArrowLeft size={16} />
            Back
          </button>

          <div className="availability-hero">
            <span className="availability-eyebrow">Available options</span>
            <h1>Choose from available trains, flights, buses, and cargo services.</h1>
            <p>
              Review schedules, fares, and service details before moving to seat
              selection and payment.
            </p>
          </div>

          <div className="availability-summary-grid">
            <div className="summary-chip">
              <Users size={16} />
              <span>{bookingData?.passengerCount || 1} passenger(s)</span>
            </div>
            {(bookingData?.origin || bookingData?.destination) && (
              <div className="summary-chip">
                <MapPin size={16} />
                <span>
                  {bookingData?.origin || 'From'} to {bookingData?.destination || 'To'}
                </span>
              </div>
            )}
            {bookingData?.transportType === 'buses' && bookingData?.departure && bookingData?.arrival && (
              <div className="summary-chip">
                <MapPin size={16} />
                <span>
                  {bookingData.departure} to {bookingData.arrival}
                </span>
              </div>
            )}
          </div>
        </section>

        <section className="availability-content-card">
          <div className="availability-toolbar">
            <div>
              <span className="availability-label">Transport options</span>
              <h2>
                <ActiveIcon size={20} />
                {activeMeta.label} available now
              </h2>
            </div>

            <div className="availability-tabs">
              {Object.entries(transportMeta).map(([key, value]) => {
                const Icon = value.icon;
                return (
                  <button
                    key={key}
                    type="button"
                    className={activeType === key ? 'availability-tab-active' : ''}
                    onClick={() => setActiveType(key)}
                  >
                    <Icon size={16} />
                    {value.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="availability-list">
            {selectedOptions.map((option) => (
              <article key={option.id} className="availability-card">
                <div className="availability-main">
                  <div>
                    <span className="availability-id">{option.id}</span>
                    <h3>{option.name}</h3>
                  </div>
                  <strong className="availability-fare">{option.fare}</strong>
                </div>

                <div className="availability-meta">
                  <div>
                    <span>Departure</span>
                    <strong>{option.depart}</strong>
                  </div>
                  <div>
                    <span>Arrival</span>
                    <strong>{option.arrive}</strong>
                  </div>
                  <div>
                    <span>Duration</span>
                    <strong>
                      <Clock3 size={14} />
                      {option.duration}
                    </strong>
                  </div>
                  {activeType === 'buses' && bookingData?.departure && bookingData?.arrival && (
                    <div>
                      <span>Route</span>
                      <strong>
                        {bookingData.departure} - {bookingData.arrival}
                      </strong>
                    </div>
                  )}
                  {activeType !== 'buses' && (bookingData?.origin || bookingData?.destination) && (
                    <div>
                      <span>Route</span>
                      <strong>
                        {bookingData?.origin || 'From'} - {bookingData?.destination || 'To'}
                      </strong>
                    </div>
                  )}
                </div>

                <div className="availability-actions">
                  <button type="button" onClick={() => handleOptionContinue(option)}>
                    {activeType === 'cargo' ? 'Continue to Payment' : 'Select Seats'}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Availability;
