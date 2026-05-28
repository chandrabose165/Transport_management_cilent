import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './Components/pages/Home';
import Login from './Components/pages/Login';
import Register from './Components/pages/Register';
import Dashboard from './Components/pages/Dashboard';
import Booking from './Components/pages/Booking';
import Availability from './Components/pages/Availability';
import SeatSelection from './Components/pages/SeatSelection';
import Payment from './Components/pages/Payment';
import Admin from './Components/pages/Admin';
import BookingHistory from './Components/pages/BookingHistory';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/booking' element={<Booking />} />
        <Route path='/availability' element={<Availability />} />
        <Route path='/seat-selection' element={<SeatSelection />} />
        <Route path='/payment' element={<Payment />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/BookingHistory' element={<BookingHistory />} />
        </Routes>
    </BrowserRouter>
  );
};

export default App;
