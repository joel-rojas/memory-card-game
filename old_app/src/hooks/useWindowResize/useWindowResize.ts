import React from "react";

import { MCAppScreenSizes } from "@config";

const useWindowResize = () => {
  const calculateScreenType = React.useCallback(
    (width: number): MCAppScreenSizes => {
      if (width < 640) {
        return "mobile";
      } else if (width < 1024) {
        return "tablet";
      } else {
        return "desktop";
      }
    },
    []
  );

  const [screenDimensions, setScreenDimensions] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight,
    type: calculateScreenType(window.innerWidth),
  });

  React.useEffect(() => {
    const handleResize = () => {
      setScreenDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
        type: calculateScreenType(window.innerWidth),
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return screenDimensions;
};

export default useWindowResize;
