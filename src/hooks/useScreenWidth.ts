'use client'

import { useState, useEffect } from "react";

export enum ScreenType {
    DSKTOP = 1920,
    TABLET = 744,
    MOBILE = 500
}

const useScreenWidth = () => {
  const [screenWidth, setScreenWidth] = useState(ScreenType.DSKTOP);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => setScreenWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return screenWidth;
};

export default useScreenWidth;