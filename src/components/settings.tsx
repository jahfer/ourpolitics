import React, { useEffect, useId, useState, useCallback } from 'react';
import { useTranslation } from 'contexts/language-context';
import { useSettings } from 'contexts/settings-context';
import { Icon } from 'components/system/icon';

interface SettingProps {
  label: string;
  children: React.ReactNode;
}

export function Setting ({label, children}: SettingProps) {
  return (
    <div className="setting">
      <h2>{label}</h2>
      {children}
    </div>
  );
}

interface SettingsPanelProps {
  collapsed?: boolean,
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({collapsed = true}) => {
  const { t } = useTranslation();
  const { settings } = useSettings();
  const settingsPanelId = useId();
  const [$settingsPanel, setSettingsPanel] = useState<HTMLDivElement | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(collapsed);

  useEffect(() => {
    const panel = document.getElementById(settingsPanelId);
    setSettingsPanel(panel as HTMLDivElement);
  }, [settingsPanelId]);

  const handleMouseEnter = useCallback(() => {
    setIsCollapsed(false);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsCollapsed(true);
  }, []);

  useEffect(() => {
    if (!$settingsPanel) {
      return;
    }

    $settingsPanel.addEventListener('mouseenter', handleMouseEnter);
    $settingsPanel.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      $settingsPanel.removeEventListener('mouseenter', handleMouseEnter);
      $settingsPanel.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [$settingsPanel, handleMouseEnter, handleMouseLeave]);

  useEffect(() => {
    console.log('Settings changed:', settings);
  }, [settings]);

  // if (settings.length === 0) {
  //   return null;
  // }

  return (
    <aside className={`settings-panel ${isCollapsed ? 'collapsed' : 'expanded'}`} id={settingsPanelId}>
      <nav className="flex flex-row container">
      <h1><Icon name="cog" inline />{t('settings')}</h1>
      </nav>
      <div className="settings-panel--content container">
        <ul className="list-plain flex flex-row settings-panel--settings">
          {settings.map(({key, element}) => (
            <li key={key}>{element}</li>
          ))}
        </ul>
      </div>
    </aside>
  );
}