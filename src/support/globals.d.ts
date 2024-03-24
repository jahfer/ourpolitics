declare global {
  interface Window {
    goatcounter: GoatCounter;
  }
}

interface GoatCounter {
  count: (event: { path: string, title: string, event: boolean }) => void;
  bind_events: () => void;
}

export {};