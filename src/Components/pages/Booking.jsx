import React, { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../Styles/Booking.css';
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
    <div className="booking-page">
      <div className="booking-shell">
        <section className="booking-intro">
          <button type="button" className="back-btn" onClick={() => navigate(-1)}>
            <ArrowLeft size={16} />
            Back
          </button>

          <span className="booking-eyebrow">Booking workspace</span>
          <h1>Complete your reservation with a cleaner, faster booking flow.</h1>
          <p>
            Choose your transport type, enter passenger details, and continue to
            live availability with a more guided reservation experience.
          </p>

          <div className="booking-info-grid">
            <div className="info-card">
              <div className="info-icon">
                <Ticket size={18} />
              </div>
              <div>
                <strong>Live availability</strong>
                <span>Search routes and confirm seats in real time.</span>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon">
                <ShieldCheck size={18} />
              </div>
              <div>
                <strong>Trusted checkout</strong>
                <span>Protected booking flow with clear confirmation steps.</span>
              </div>
            </div>
          </div>

          <div className="booking-benefits">
            {bookingBenefits.map((benefit) => (
              <div key={benefit} className="benefit-line">
                <span className="benefit-dot" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="booking-panel">
          <div className="panel-header">
            <div>
              <span className="panel-label">Reservation form</span>
              <h2>Book your ticket</h2>
            </div>
            <p>All fields are required before moving to available options.</p>
          </div>

          <form className="booking-form" onSubmit={handleSubmit}>
            <div className="form-section-heading">
              <h3>Passenger details</h3>
              <p>Provide traveller information to continue with the reservation.</p>
            </div>

            <div className="transport-type-row">
              {transportOptions.map((option) => {
                const Icon = option.icon;
                const isActive = formData.transportType === option.value;

                return (
                  <label
                    key={option.value}
                    className={`transport-choice ${isActive ? 'transport-choice-active' : ''}`}
                  >
                    <input
                      type="radio"
                      name="transportType"
                      value={option.value}
                      checked={isActive}
                      onChange={handleChange}
                    />
                    <Icon size={18} />
                    <span>{option.label}</span>
                  </label>
                );
              })}
            </div>

            <div className="form-grid">
              <label className="field-group">
                <span>Passenger Count</span>
                <div className="field-input">
                  <UserRound size={16} />
                  <input
                    type="number"
                    name="passengerCount"
                    min="1"
                    placeholder="Number of passengers"
                    value={formData.passengerCount}
                    onChange={handleChange}
                    required
                  />
                </div>
              </label>

              {formData.transportType === 'buses' && (
                <>
                  <label className="field-group">
                    <span>Departure Place</span>
                    <div className="field-input">
                      <MapPin size={16} />
                      <input
                        name="departure"
                        required
                        value={formData.departure}
                        onChange={handleChange}
                        onFocus={() => setActivePlaceField('departure')}
                        onBlur={() => setTimeout(() => setActivePlaceField(''), 120)}
                        placeholder="Type 3 letters for departure"
                      />
                    </div>
                    {activePlaceField === 'departure' &&
                      getBusPlaceMatches(formData.departure, formData.arrival).length > 0 && (
                        <div className="booking-suggestion-box">
                          {getBusPlaceMatches(formData.departure, formData.arrival).map((place) => (
                            <button
                              key={place}
                              type="button"
                              className="booking-suggestion-item"
                              onMouseDown={() => handleBusPlaceSelect('departure', place)}
                            >
                              {place}
                            </button>
                          ))}
                        </div>
                      )}
                  </label>

                  <label className="field-group">
                    <span>Arrival Place</span>
                    <div className="field-input">
                      <MapPin size={16} />
                      <input
                        name="arrival"
                        required
                        value={formData.arrival}
                        onChange={handleChange}
                        onFocus={() => setActivePlaceField('arrival')}
                        onBlur={() => setTimeout(() => setActivePlaceField(''), 120)}
                        placeholder="Type 3 letters for arrival"
                      />
                    </div>
                    {activePlaceField === 'arrival' &&
                      getBusPlaceMatches(formData.arrival, formData.departure).length > 0 && (
                        <div className="booking-suggestion-box">
                          {getBusPlaceMatches(formData.arrival, formData.departure).map((place) => (
                            <button
                              key={place}
                              type="button"
                              className="booking-suggestion-item"
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

            <div className="passenger-stack">
              {formData.passengers.map((passenger, index) => (
                <section key={index} className="passenger-card">
                  <div className="passenger-card-header">
                    <h4>Passenger {index + 1}</h4>
                    <span>Fill in the traveller details</span>
                  </div>

                  <div className="form-grid">
                    <label className="field-group">
                      <span>Passenger Name</span>
                      <div className="field-input">
                        <UserRound size={16} />
                        <input
                          type="text"
                          placeholder="Enter passenger full name"
                          value={passenger.passengerName}
                          onChange={(e) =>
                            handlePassengerDetailChange(index, 'passengerName', e.target.value)
                          }
                          required
                        />
                      </div>
                    </label>

                    <label className="field-group">
                      <span>Passenger Type</span>
                      <div className="field-input">
                        <UserRound size={16} />
                        <select
                          required
                          value={passenger.passengerType}
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

                    <label className="field-group">
                      <span>Gender</span>
                      <div className="field-input">
                        <UserRound size={16} />
                        <select
                          required
                          value={passenger.gender}
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

            <div className="booking-summary">
              <div className="summary-card">
                <span>Selected service</span>
                <strong>{activeTransport.label}</strong>
              </div>
              <div className="summary-card">
                <span>Payment</span>
                <strong>
                  <CreditCard size={16} />
                  Secure checkout
                </strong>
              </div>
            </div>

            <button type="submit" className="confirm-btn">
              View Available Options
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Booking;
