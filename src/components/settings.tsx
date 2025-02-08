import React, { useEffect, useId, useState, useCallback } from 'react';
import { useTranslation } from 'contexts/language-context';
import { useSettings } from 'contexts/settings-context';
import { Icon } from 'components/system/icon';
import { fill } from 'lodash-es';

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
  const [isCollapsed, setIsCollapsed] = useState(collapsed);
  const settingsPanelRef = React.useRef<HTMLElement>(null);

  const togglePanel = useCallback(() => {
    setIsCollapsed(prevState => !prevState);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (settingsPanelRef.current) {
        const rect = settingsPanelRef.current.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) {
          setIsCollapsed(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (settings.length === 0) {
    return null;
  }

  return (
    <aside ref={settingsPanelRef} className={`settings-panel ${isCollapsed ? 'collapsed' : 'expanded'}`} id={settingsPanelId}>
      <nav className="flex flex-row container flex-justify-end">
        <a className='btn btn-primary btn-compact' onClick={togglePanel}>
          <Icon name="cog" inline />{t('settings')}
        </a>
      </nav>
      <div className="settings-panel--content container">
        <ul className="list-plain flex flex-row-reverse settings-panel--settings flex-justify-end flex-wrap">
          {settings.map(({key, element, fillSpace}) => (
            fillSpace ?
            <li key={key} className="flex-grow">{element}</li> :
            <li key={key}>{element}</li>
          ))}
        </ul>
      </div>
    </aside>
  );
}