import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './App.scss';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import CreateTrip from '@/pages/CreateTrip';
import Hotel from '@/pages/Hotel';
import Flight from '@/pages/Flight';
import Car from '@/pages/Car';

function App() {
  // Create a router configuration
  const router = createBrowserRouter([
    {
      path: '/',
      // loader: () => fetchPaintings(),
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: 'create-trip', element: <CreateTrip /> },
        { path: 'hotel', element: <Hotel /> },
        { path: 'flight', element: <Flight /> },
        { path: 'car', element: <Car /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
