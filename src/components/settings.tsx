import React, { useEffect, useId, useState, useCallback } from 'react';
import { useTranslation } from 'contexts/language-context';
import { useSettings } from 'contexts/settings-context';
import { Icon, IconInlinePosition } from 'components/system/icon';
import { fill } from 'lodash-es';

interface SettingProps {
  label: string;
  className?: string;
  children: React.ReactNode;
}

export function Setting ({label, children, className}: SettingProps) {
  return (
    <div className={`setting ${className || ''}`}>
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

  React.useEffect(() => {
    settingsPanelRef.current?.classList.add('settings-panel--closed');
  }, [settings]);

  if (isCollapsed) {
    settingsPanelRef.current?.addEventListener('transitionend', () => {
      settingsPanelRef.current?.classList.add('settings-panel--closed');
      console.log("animation complete")
  }, { once: true });
  }

  const togglePanel = useCallback(() => {
    setIsCollapsed(prevState => !prevState);
  }, []);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (settingsPanelRef.current && !settingsPanelRef.current.contains(event.target as Node)) {
      setIsCollapsed(true);
    }
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
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  if (settings.length === 0) {
    return null;
  }

  return (
    <aside ref={settingsPanelRef} className={`settings-panel ${isCollapsed ? 'collapsed' : 'expanded'}`} id={settingsPanelId}>
      <nav className="flex flex-row container flex-justify-end">
        <a href="#" tabIndex={0} className='btn btn-primary btn-compact select-disabled uppercase' onClick={togglePanel}>
          <Icon name="cog" inline={IconInlinePosition.Left} />{t('settings')}
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
