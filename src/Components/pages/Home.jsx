import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Styles/Home.css';

import {
  Plane,
  Train,
  Bus,
  Package,
  MapPin,
  Calendar,
  Search,
  Clock,
  Zap,
  Percent,
  ArrowRight,
  ShieldCheck,
  Headphones,
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
];

const Home = () => {

  const navigate = useNavigate();

  // USER DATA
  const userEmail =
    localStorage.getItem('userEmail');

  const username =
    localStorage.getItem('username');

  // LOGOUT
  const handleLogout = () => {

    localStorage.removeItem('userEmail');

    localStorage.removeItem('username');

    navigate('/login');
  };

  const [activeTab, setActiveTab] =
    useState('trains');

  const [searchValues, setSearchValues] =
    useState({
      flights: {
        from: '',
        to: '',
        depart: '',
      },

      trains: {
        from: '',
        to: '',
        date: '',
      },

      buses: {
        from: '',
        to: '',
        date: '',
      },

      cargo: {
        from: '',
        to: '',
        weightKg: '',
      },
    });

  const transportDetails = {

    flights: {
      label: 'Flights',
      icon: Plane,
      fields: [
        {
          label: 'From',
          placeholder: 'Departure City',
        },

        {
          label: 'To',
          placeholder: 'Destination City',
        },

        {
          label: 'Depart',
          placeholder: 'Select Date',
          type: 'date',
        },
      ],
    },

    trains: {
      label: 'Trains',
      icon: Train,
      fields: [
        {
          label: 'From',
          placeholder: 'Departure Station',
        },

        {
          label: 'To',
          placeholder: 'Destination Station',
        },

        {
          label: 'Date',
          placeholder: 'Select Date',
          type: 'date',
        },
      ],
    },

    buses: {
      label: 'Buses',
      icon: Bus,
      fields: [
        {
          label: 'From',
          placeholder: 'Start Point',
        },

        {
          label: 'To',
          placeholder: 'End Point',
        },

        {
          label: 'Date',
          placeholder: 'Select Date',
          type: 'date',
        },
      ],
    },

    cargo: {
      label: 'Cargo',
      icon: Package,
      fields: [
        {
          label: 'From',
          placeholder: 'Pickup Location',
        },

        {
          label: 'To',
          placeholder: 'Delivery Location',
        },

        {
          label: 'Weight',
          placeholder: 'Enter Weight',
          type: 'number',
        },
      ],
    },
  };

  const current =
    transportDetails[activeTab];

  const currentSearch =
    searchValues[activeTab];

  const getFieldName = (field) => {

    if (field.label === 'From')
      return 'from';

    if (field.label === 'To')
      return 'to';

    if (field.label === 'Depart')
      return 'depart';

    if (field.label === 'Date')
      return 'date';

    return 'weightKg';
  };

  const handleSearchValueChange =
    (fieldName, value) => {

      setSearchValues((prev) => ({
        ...prev,

        [activeTab]: {
          ...prev[activeTab],

          [fieldName]: value,
        },
      }));
    };

  const handleSearchRedirect = (e) => {

    e.preventDefault();

    navigate('/booking', {
      state: {
        transportType: activeTab,
        searchData: currentSearch,
      },
    });
  };

  return (
    <div className="homepage">

      {/* NAVBAR */}

      <nav className="navbar">

        <div className="logo-section">
          <h1>TransportHub</h1>
        </div>

        <div className="nav-links">

          <Link to="/dashboard">
            Dashboard
          </Link>

          {userEmail ? (

            <div className="home-profile">

              <div className="home-profile-icon">
                👤
              </div>

              <div className="home-profile-details">

                <span>
                  Welcome
                </span>

                <h4>{username}</h4>

                <p>{userEmail}</p>

                <button
                  className="home-logout-btn"
                  onClick={handleLogout}
                >
                  Logout
                </button>

              </div>
            </div>

          ) : (

            <>
              <Link to="/login">
                Login
              </Link>

              <Link to="/register">
                Register
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* HERO */}

      <div className="hero-section">

        <div className="hero-copy">

          <span className="eyebrow">
            One platform for every trip
          </span>

          <h1>
            Professional transport booking
            for modern travel and logistics.
          </h1>

          <p>
            Compare routes, book tickets,
            and manage cargo services easily.
          </p>

          <div className="hero-highlights">

            <div className="highlight-pill">
              <ShieldCheck size={16} />
              Trusted bookings
            </div>

            <div className="highlight-pill">
              <Clock size={16} />
              Live availability
            </div>

            <div className="highlight-pill">
              <Headphones size={16} />
              Fast support
            </div>

          </div>
        </div>

        {/* BOOKING BOX */}

        <div className="booking-box">

          <div className="tabs">

            {Object.entries(
              transportDetails
            ).map(([key, transport]) => {

              const Icon = transport.icon;

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() =>
                    setActiveTab(key)
                  }
                  className={
                    activeTab === key
                      ? 'tab-active'
                      : ''
                  }
                >
                  <Icon size={18} />

                  {transport.label}
                </button>
              );
            })}
          </div>

          <form
            className="search-grid"
            onSubmit={handleSearchRedirect}
          >

            {current.fields.map((field, idx) => {

              const fieldName =
                getFieldName(field);

              return (

                <div
                  key={idx}
                  className="input-box"
                >

                  <div className="input-top">

                    {(field.label === 'From' ||
                      field.label === 'To') ? (

                      <MapPin size={16} />

                    ) : (

                      <Calendar size={16} />
                    )}

                    <span className="field-label">
                      {field.label}
                    </span>
                  </div>

                  <input
                    type={field.type || 'text'}
                    placeholder={
                      field.placeholder
                    }
                    value={
                      currentSearch[fieldName]
                    }
                    onChange={(e) =>
                      handleSearchValueChange(
                        fieldName,
                        e.target.value
                      )
                    }
                    required
                  />
                </div>
              );
            })}

            <button
              className="search-btn"
              type="submit"
            >
              <Search size={16} />
              Search
            </button>

          </form>
        </div>

        {/* BEST ROUTES */}

        <div className="extra-section">

          <div className="section-title">
            <h2>Best Routes</h2>

            <p>
              Most booked and recommended routes
            </p>
          </div>

          <div className="route-grid">

            <div className="route-card">
              <h3>
                Hyderabad → Bengaluru
              </h3>

              <span>
                Fastest and most booked route
              </span>
            </div>

            <div className="route-card">
              <h3>
                Chennai → Mumbai
              </h3>

              <span>
                Affordable daily transport
              </span>
            </div>

            <div className="route-card">
              <h3>
                Delhi → Kolkata
              </h3>

              <span>
                Premium travel experience
              </span>
            </div>

          </div>
        </div>

        {/* POPULAR CITIES */}

        <div className="extra-section">

          <div className="section-title">

            <h2>
              Most Popular Cities
            </h2>

            <p>
              Top preferred destinations
            </p>

          </div>

          <div className="city-grid">

            <div className="city-card">
              <h3>Hyderabad</h3>
              <span>1200+ Bookings</span>
            </div>

            <div className="city-card">
              <h3>Bengaluru</h3>
              <span>980+ Bookings</span>
            </div>

            <div className="city-card">
              <h3>Chennai</h3>
              <span>870+ Bookings</span>
            </div>

            <div className="city-card">
              <h3>Mumbai</h3>
              <span>760+ Bookings</span>
            </div>

          </div>
        </div>
      </div>

      <footer id="footerpage">
        © Chandrabose 2026 • Transport Hub
      </footer>
    </div>
  );
};

export default Home;
