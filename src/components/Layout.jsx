import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Layout = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const [user, setUser] = useState(null);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  return (
    <>
      <div>
        {window.innerWidth < 768 ? (
          <Navigation
            handleShowNavbar={handleShowNavbar}
            user={user}
            setUser={setUser}
          />
        ) : (
          <Navigation
            handleShowNavbar={handleShowNavbar}
            user={user}
            setUser={setUser}
          />
        )}
      </div>
      <main>
        <Outlet context={{ user, setUser }} />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
