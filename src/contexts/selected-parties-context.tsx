import React, { createContext, useContext, useCallback, useState, useEffect } from 'react';
import { Party } from 'types/schema';
import { getItem, setItem } from 'data/storage';

const SELECTED_PARTIES = 'selectedParties';
const isFrenchCA = navigator.language.startsWith("fr-CA");
const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone
const isQuebecTimezone = ["America/Montreal", "America/Blanc-Sablon"].includes(userTimezone);
const isEasternCanada = userTimezone === "America/Toronto";
const DEFAULT_PARTIES = new Set([
  Party.Conservative,
  Party.Liberal,
  Party.NDP,
  ...(isQuebecTimezone || (isFrenchCA && isEasternCanada) ? [Party.Bloc] : [])
]);

interface SelectedPartiesContextType {
  selectedParties: Set<Party>;
  updateSelectedParties: (parties: Party[]) => void;
  availableParties: Set<Party>;
  setAvailableParties: (parties: Set<Party>) => void;
}

const SelectedPartiesContext = createContext<SelectedPartiesContextType | undefined>(undefined);

export function SelectedPartiesProvider({ children }: { children: React.ReactNode }) {
  const [availableParties, setAvailableParties] = useState<Set<Party>>(new Set());
  
  const getDefaultSelections = useCallback(() => {
    if (availableParties.size <= 3) {
      return Array.from(availableParties);
    }
    const [defaultParties, remainingParties] = Array.from(availableParties).reduce(
      ([def, rem], party) => 
        DEFAULT_PARTIES.has(party) ? [[...def, party], rem] : [def, [...rem, party]],
      [[] as Party[], [] as Party[]]
    );
    const remainingSlots = 3 - defaultParties.length;
    return [...defaultParties, ...remainingParties.slice(0, remainingSlots)];
  }, [availableParties]);

  const [selectedParties, setSelectedParties] = useState<Set<Party>>(new Set(getDefaultSelections()));

  const updateSelectedParties = useCallback((parties: Party[]) => {
    if (parties.length > 0) {
      setItem(SELECTED_PARTIES, parties, 'session');
    }
    const validParties = parties.filter(party => availableParties.has(party));
    setSelectedParties(new Set(validParties));
  }, [availableParties]);

  useEffect(() => {
    const parties = getItem<Party[]>(SELECTED_PARTIES, getDefaultSelections, 'session');
    updateSelectedParties(parties);
  }, [availableParties, getDefaultSelections, updateSelectedParties]);

  return (
    <SelectedPartiesContext.Provider value={{ 
      selectedParties, 
      updateSelectedParties, 
      availableParties, 
      setAvailableParties 
    }}>
      {children}
    </SelectedPartiesContext.Provider>
  );
}

export function useSelectedPartiesContext() {
  const context = useContext(SelectedPartiesContext);
  if (!context) {
    throw new Error('useSelectedPartiesContext must be used within a SelectedPartiesProvider');
  }
  return context;
}
