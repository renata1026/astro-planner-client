import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.scss';

import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import CreateTrip from '@/pages/CreateTrip';
import Hotel from '@/pages/Hotel';
import Flight from '@/pages/Flight';
import Car from '@/pages/Car';
import NotFound from '@/pages/NotFound';

// Create a router configuration
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'create-trip', element: <CreateTrip /> },
      { path: 'hotel/:tripId', element: <Hotel /> },
      { path: 'flight/:tripId', element: <Flight /> },
      { path: 'car/:tripId', element: <Car /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
