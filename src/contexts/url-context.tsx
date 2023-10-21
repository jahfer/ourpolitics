import { createContext, useContext, useState } from 'react';
import * as React from 'react';

type URLContextType = {
  historyState: object,
  setURL: (state: object, url?: string) => void,
  setURLToPrevious: () => void,
  updateURLState: (state: object) => void
}

export const URLContext = createContext<URLContextType>({
  historyState: {},
  setURL: () => {},
  setURLToPrevious: () => {},
  updateURLState: () => {},
});

export function useURL() {
  return useContext(URLContext);
}

interface URLProviderProps {
  children: React.ReactNode;
}

export function URLProvider({ children }: URLProviderProps) {
  const [historyState, setHistoryState] = useState(() => history.state || {});
  const setURLToPrevious = () => history.back();
  const setURL = (state: object, url?: string) => {
    history.pushState(state, "", url);
    console.log("setting history state");
    setHistoryState(state);
  }

  const updateURLState = (state: object) => {
    history.replaceState(state, "");
    console.log("replacing history state");
    setHistoryState(state);
  }

  const value = { setURL, historyState, setURLToPrevious, updateURLState };

  React.useEffect(() => {
    const handler = (event: PopStateEvent) => {
      setHistoryState(event.state || {});
    }

    addEventListener("popstate", handler);
    return (() => removeEventListener("popstate", handler))
  }, []);

  return (
    <URLContext.Provider value={value}>
      {children}
    </URLContext.Provider>
  );
}