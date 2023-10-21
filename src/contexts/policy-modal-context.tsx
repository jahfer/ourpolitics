import * as React from 'react';
import { createContext, useContext, useState } from 'react';
import { Policy } from 'types/schema';
import PolicyModal from 'components/policy_table/policy-modal';
import { useURL } from 'contexts/url-context';

interface PolicyModalProviderProps {
  children: React.ReactNode;
}

type PolicyModalContextType = {
  modalPolicy: Policy | null
}

export const PolicyModalContext = createContext<PolicyModalContextType>({
  modalPolicy: null
});

export function usePolicyModal() {
  return useContext(PolicyModalContext);
}

type PolicyModalVisibilityContextType = {
  policyModalVisible: boolean,
  setPolicyModalVisibility: (visible: boolean) => void
}

export const PolicyModalVisibilityContext = createContext<PolicyModalVisibilityContextType>({
  policyModalVisible: false,
  setPolicyModalVisibility: () => {}
});

export function usePolicyModalVisiblity() {
  return useContext(PolicyModalVisibilityContext);
}

export function PolicyModalProvider({ children }: PolicyModalProviderProps) {
  const { historyState } = useURL();

  const [modalPolicy, setModalPolicy] = useState<Policy | null>(() => null);
  const policyModalValue = { modalPolicy };

  const [policyModalVisible, setPolicyModalVisibility] = useState(!!modalPolicy);
  const policyModalVisibilityValue = { policyModalVisible, setPolicyModalVisibility };

  React.useEffect(() => {
    if ("policy" in historyState && historyState.policy) {
      console.log("Setting modal policy from history state", historyState.policy);
      setModalPolicy(historyState.policy as Policy);
    } else {
      console.log("Clearing modal policy since it does not exist in history state");
      setModalPolicy(null);
    }
  }, [historyState]);

  return (
    <PolicyModalContext.Provider value={policyModalValue}>
      <PolicyModalVisibilityContext.Provider value={policyModalVisibilityValue}>
        <PolicyModal />
        {children}
      </PolicyModalVisibilityContext.Provider>
    </PolicyModalContext.Provider>
  );
}