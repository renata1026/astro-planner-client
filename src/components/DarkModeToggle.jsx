import { useState, useEffect } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

const DarkModeToggle = () => {
  const [isDarkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!isDarkMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className="dark-mode-toggle" onClick={toggleDarkMode}>
      {isDarkMode ? (
        <FaSun className="toggle-switch" size={30} />
      ) : (
        <FaMoon className="toggle-switch" size={30} />
      )}
    </div>
  );
};

export default DarkModeToggle;
