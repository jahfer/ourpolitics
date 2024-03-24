import { useEffect } from "react";

export function useAnalytics() {
  useEffect(() => {
    window.goatcounter.bind_events();
  }, []);
}

export function recordEvent(name: string) {
  window.goatcounter.count({ path: name, title: name, event: true });
}