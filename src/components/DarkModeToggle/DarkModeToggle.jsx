import React, { useState, useEffect } from 'react';

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
<div className="cursor-pointer">
  <i
    onClick={() => setDarkMode(!darkMode)}
    className={`fa-solid fa-moon text-2xl transition-colors duration-300 ${
      darkMode ? 'text-white' : 'text-gray-700'
    }`}
  />
</div>
  );
}
