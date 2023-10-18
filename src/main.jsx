import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.scss";

import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import CreateTrip from "@/pages/CreateTrip";
import Hotel from "@/pages/Hotel";
import Flight from "@/pages/Flight";
import Car from "@/pages/Car";
import NotFound from "@/pages/NotFound";
import Confirmation from "@/pages/Confirmation";
import Profile from "@/pages/Profile";
import FlightReservation from "@/pages/edit/FlightReservation";
import HotelReservation from "@/pages/edit/HotelReservation";
import Faq from "@/pages/Faq";

// Create a router configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "create-trip", element: <CreateTrip /> },
      { path: "hotel/:tripId", element: <Hotel /> },
      { path: "flight/:tripId", element: <Flight /> },
      { path: "car/:tripId", element: <Car /> },
      { path: "confirmation/:tripId", element: <Confirmation /> },
      {
        path: "edit/hotel/reservation/:reservationId",
        element: <HotelReservation />,
      },
      {
        path: "edit/flight/reservation/:reservationId",
        element: <FlightReservation />,
      },
      // {
      //   path: "edit/car/reservation/:reservationId",
      //   element: <FlightReservation />,
      // },
      { path: "profile", element: <Profile /> },
      { path: "faq", element: <Faq /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
