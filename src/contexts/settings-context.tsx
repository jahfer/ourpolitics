import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { isEqual } from 'lodash-es';

interface Setting {
  key: string;
  element: ReactNode;
  fillSpace: boolean;
}

interface SettingsContextProps {
  settings: Setting[];
  registerSetting: (key: string, elementFn: (setState: React.Dispatch<React.SetStateAction<any>>) => ReactNode, fillSpace?: boolean) => void;
  unregisterSetting: (key: string) => void;
  subscribeToSetting: (key: string, callback: () => void) => void;
  unsubscribeFromSetting: (key: string, callback: () => void) => void;
}

const SettingsContext = createContext<SettingsContextProps | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<Setting[]>([]);
  const [subscribers, setSubscribers] = useState<Map<string, Set<() => void>>>(new Map());

  const notifySubscribers = useCallback((key: string) => {
    const settingSubscribers = subscribers.get(key);
    if (settingSubscribers) {
      settingSubscribers.forEach(callback => callback());
    }
  }, [subscribers]);

  const registerSetting = (key: string, elementFn: (setState: React.Dispatch<any>) => ReactNode, fillSpace: boolean = false) => {
    setSettings((prevSettings) => {
      const existingSettingIndex = prevSettings.findIndex(setting => setting.key === key);
      const element = elementFn(() => notifySubscribers(key));
      if (existingSettingIndex !== -1) {
        if (!isEqual(prevSettings[existingSettingIndex].element, element)) {
          const updatedSettings = [...prevSettings];
          updatedSettings[existingSettingIndex] = { key, element, fillSpace };
          return updatedSettings;
        }
        return prevSettings;
      }
      notifySubscribers(key);
      return [...prevSettings, { key, element, fillSpace }];
    });
  };

  const unregisterSetting = (key: string) => {
    setSettings((prevSettings) => prevSettings.filter(setting => setting.key !== key));
    notifySubscribers(key);
  };

  const subscribeToSetting = (key: string, callback: () => void) => {
    setSubscribers((prevSubscribers) => {
      const settingSubscribers = prevSubscribers.get(key) || new Set();
      settingSubscribers.add(callback);
      return new Map(prevSubscribers).set(key, settingSubscribers);
    });
  };

  const unsubscribeFromSetting = (key: string, callback: () => void) => {
    setSubscribers((prevSubscribers) => {
      const settingSubscribers = prevSubscribers.get(key);
      if (settingSubscribers) {
        settingSubscribers.delete(callback);
        if (settingSubscribers.size === 0) {
          prevSubscribers.delete(key);
        }
        return new Map(prevSubscribers);
      }
      return prevSubscribers;
    });
  };

  return (
    <SettingsContext.Provider value={{ settings, registerSetting, unregisterSetting, subscribeToSetting, unsubscribeFromSetting }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};