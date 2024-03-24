import { useEffect } from "react";

export function useAnalytics() {
  useEffect(() => {
    window.goatcounter.bind_events();
  }, []);
}

export function recordEvent({ path, title }: { path: string, title: string }) {
  window.goatcounter.count({ path, title, event: true });
}