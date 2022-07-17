import { useEffect, useState } from "react";

const getWindowDimensions = () => {
    const width = window?.innerWidth;
    const height = window?.innerHeight;

    return {
      width,
      height,
    };
}

const useWindowDimension = () => {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    const handleResize = () => {
        setWindowDimensions(getWindowDimensions());
    }

    useEffect(() => {
      if (window) {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }
    }, [window]);
  
    return windowDimensions;
  }

export default useWindowDimension;