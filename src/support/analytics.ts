import { useEffect } from "react";

const isGoatCounterAvailable = () =>
  typeof window !== 'undefined' &&
  window.goatcounter &&
  !window.goatcounter.no_onload;

export function useAnalytics() {
  useEffect(() => {
    if (isGoatCounterAvailable()) {
      window.goatcounter.bind_events();
    } else {
      console.warn('GoatCounter analytics not available or in development mode');
    }
  }, []);
}

export function recordEvent(name: string) {
  if (isGoatCounterAvailable()) {
    window.goatcounter.count({ path: name, title: name, event: true });
  } else {
    console.warn(`Failed to record event: ${name}. GoatCounter not available or in development mode`);
  }
}