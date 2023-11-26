import * as React from 'react';
import { createContext, useContext, useState } from 'react';
import { Policy } from 'types/schema';
import PolicyModal from 'components/policy_table/policy-modal';
import { useURL } from 'contexts/router-context';

interface PolicyModalProviderProps {
  children: React.ReactNode;
}

type PolicyModalContextType = {
  modalPolicy: Policy | null,
  policyModalVisible: boolean,
}

export const PolicyModalContext = createContext<PolicyModalContextType>({
  modalPolicy: null,
  policyModalVisible: false,
});

export function usePolicyModal() {
  return useContext(PolicyModalContext);
}

export function PolicyModalProvider({ children }: PolicyModalProviderProps) {
  const { history } = useURL();

  const [modalPolicy, setModalPolicy] = useState<Policy | null>(() => null);
  const [policyModalVisible, setPolicyModalVisibility] = useState(!!modalPolicy);
  const policyModalValue = { modalPolicy, policyModalVisible };

  React.useEffect(() => {
    const currentState = history[0]?.state;
    if (currentState && "policy" in currentState && currentState.policy) {
      console.log("Setting modal policy from history state", currentState.policy);
      setModalPolicy(currentState.policy as Policy);
      setPolicyModalVisibility(true);
    } else {
      console.log("Policy not set in history state, clearing modal policy");
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