import { useEffect } from "react";
import ReactGA from "react-ga4";

const GA_MEASUREMENT_ID = "G-NX280VJHW2";

export function useGoogleAnalytics() {
  useEffect(() => {
    ReactGA.initialize(GA_MEASUREMENT_ID);
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
  }, []);
}
