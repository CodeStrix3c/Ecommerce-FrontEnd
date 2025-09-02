// hooks/useOnScroll.ts
import { useState, useEffect } from 'react';

const useOnScroll = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // initialize
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollY;
};

export default useOnScroll;
