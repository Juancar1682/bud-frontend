import { useEffect, useState } from 'react';
import Button from '../components/Button';
import Card from '../components/Card';
import { journalStyleOptions, type JournalStyle } from '../constants/journalStyles';
import { apiGet, apiPatch } from '../services/apiClient';
import type { SettingsResponse } from '../types/api';
import type { ThemeMode } from '../types/theme';

type SettingsProps = {
  theme: ThemeMode;
  onToggleTheme: () => void;
};

function Settings({ theme, onToggleTheme }: SettingsProps) {
  const [journalStyle, setJournalStyle] = useState<JournalStyle>('friendly');
  const [loadingStyle, setLoadingStyle] = useState(true);
  const [savingStyle, setSavingStyle] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    const loadSettings = async () => {
      const response = await apiGet<SettingsResponse>('/api/settings');
      if (response.success) {
        setJournalStyle(response.data.user.journalStyle);
      }
      setLoadingStyle(false);
    };

    void loadSettings();
  }, []);

  const saveStyle = async (nextStyle: JournalStyle) => {
    setSavingStyle(true);
    setStatusMessage('');

    const response = await apiPatch<SettingsResponse, { journalStyle: JournalStyle }>('/api/settings', {
      journalStyle: nextStyle
    });

    setSavingStyle(false);

    if (!response.success) {
      setStatusMessage('Unable to save journal style right now.');
      return;
    }

    setJournalStyle(response.data.user.journalStyle);
    setStatusMessage('Journal style updated.');
  };

  return (
    <div className="space-y-4">
      <Card title="Theme" subtitle="Choose the visual mode that feels best">
        <div className="flex items-center justify-between">
          <p className="text-sm text-bud-darkBg/80 dark:text-bud-lightBg/80">Current mode: {theme}</p>
          <Button type="button" variant="secondary" onClick={onToggleTheme}>
            Toggle Theme
          </Button>
        </div>
      </Card>

      <Card title="Journal Style" subtitle="Pick how Bud responds during journal sessions">
        <div className="space-y-2">
          {journalStyleOptions.map((option) => {
            const isActive = journalStyle === option.value;

            return (
              <button
                key={option.value}
                type="button"
                disabled={loadingStyle || savingStyle}
                onClick={() => void saveStyle(option.value)}
                className={`w-full rounded-xl border px-3 py-3 text-left transition-colors ${
                  isActive
                    ? 'border-bud-primary bg-bud-primary/10'
                    : 'border-black/10 bg-white/70 hover:bg-black/5 dark:border-white/15 dark:bg-white/5 dark:hover:bg-white/10'
                }`}
              >
                <p className="text-sm font-semibold">{option.label}</p>
                <p className="mt-1 text-xs text-bud-darkBg/70 dark:text-bud-lightBg/70">{option.description}</p>
              </button>
            );
          })}
        </div>

        {loadingStyle ? <p className="mt-3 text-xs text-bud-darkBg/65 dark:text-bud-lightBg/65">Loading current style...</p> : null}
        {savingStyle ? <p className="mt-3 text-xs text-bud-darkBg/65 dark:text-bud-lightBg/65">Saving style...</p> : null}
        {statusMessage ? <p className="mt-3 text-xs text-bud-primaryDeep dark:text-bud-primarySoft">{statusMessage}</p> : null}
      </Card>

      <Card title="Export Data" subtitle="Future-ready">
        <p className="text-sm text-bud-darkBg/70 dark:text-bud-lightBg/70">Export options will be added once backend persistence is enabled.</p>
      </Card>

      <Card title="Account Management" subtitle="Future-ready">
        <p className="text-sm text-bud-darkBg/70 dark:text-bud-lightBg/70">Authentication and profile settings will be introduced in a dedicated account module.</p>
      </Card>
    </div>
  );
}

export default Settings;
