import * as React from 'react';
import { createContext, useContext, useState } from 'react';
import * as Policy from 'data/policy';
import { Party } from "types/schema";
import PolicyModal from 'components/policy_table/policy-modal';
import { useURL } from 'contexts/router-context';

interface PolicyModalProviderProps {
  children: React.ReactNode;
}

type PolicyModalContextType = {
  modalPolicy: Policy.T | null,
  policyModalVisible: boolean,
}

export const PolicyModalContext = createContext<PolicyModalContextType>({
  modalPolicy: null,
  policyModalVisible: false,
});

export function usePolicyModal() {
  return useContext(PolicyModalContext);
}

function partyHexColour(party: Party) {
  switch (party) {
    case Party.Liberal: return "#D71920";
    case Party.NDP: return "#F37021";
    case Party.Conservative: return "#1A4782";
    case Party.Green: return "#3d9b35";
  }
}

function setMobileHeadingTheme(colour: string) {
  document.getElementById("meta--theme-color")?.setAttribute("content", colour);
}

export function PolicyModalProvider({ children }: PolicyModalProviderProps) {
  const { history } = useURL();

  const [modalPolicy, setModalPolicy] = useState<Policy.T | null>(() => null);
  const [policyModalVisible, setPolicyModalVisibility] = useState(!!modalPolicy);
  const policyModalValue = { modalPolicy, policyModalVisible };

  React.useEffect(() => {
    const currentState = history[0]?.state;
    if (currentState && "policy" in currentState && currentState.policy) {
      const policy = currentState.policy as Policy.T;
      setTimeout(() => setMobileHeadingTheme(partyHexColour(policy.party)), 0);
      setModalPolicy(policy);
      setPolicyModalVisibility(true);
    } else {
      setTimeout(() => setMobileHeadingTheme(""), 0);
      setModalPolicy(null);
      setPolicyModalVisibility(false);
    }
  }, [history]);

  return (
    <PolicyModalContext.Provider value={policyModalValue}>
      <PolicyModal />
      {children}
    </PolicyModalContext.Provider>
  );
}