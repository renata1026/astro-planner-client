import React, { useState, useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import Navbar from "./components/Navbar";
import { API } from "./lib/api-index";

import Footer from "./components/Footer";

const App = () => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  const [trips, setTrips] = useState([]);
  const [reservations, setReservations] = useState([]);

  async function fetchUser() {
    const localToken = localStorage.getItem("token");
    if (localToken) {
      setToken(localToken);
    }
    if (!token) {
      return;
    }
    const res = await fetch(`${API}/users/token`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const info = await res.json();
    if (info.success) {
      setUser(info.user);
    }
  }

  async function fetchTrips() {
    const res = await fetch(`${API}/trips`);
    const info = await res.json();

    if (info.data.success) {
      setTrips(info.data.trip);
    }
  }

  async function fetchReservations() {
    const res = await fetch(`${API}/reservations`);
    const info = await res.json();

    if (info.data.success) {
      setReservations(info.data.reservation);
    }
  }

  useEffect(() => {
    fetchUser();
    fetchTrips();
    fetchReservations();
  }, [token]);

  return (
    <div>
      <Navbar
        user={user}
        setUser={setUser}
        setToken={setToken}
        trips={trips}
        reservations={reservations}
      />
      <Outlet
        context={{
          trips,
          setTrips,
          token,
          fetchTrips,
          setToken,
          user,
          setUser,
          reservations,
          fetchReservations,
        }}
      />

      <Footer />
    </div>
  );
};

export default App;
