import { FormEvent, useMemo, useState } from 'react';
import Button from '../components/Button';
import Card from '../components/Card';
import { apiPatch, apiPost } from '../services/apiClient';
import type { JournalMessageDto, JournalTurnResponse } from '../types/api';

function Journal() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<JournalMessageDto[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [disclaimer, setDisclaimer] = useState('Bud is not a crisis service and is not a replacement for medical or mental health care.');

  const hasActiveSession = Boolean(sessionId);

  const sortedMessages = useMemo(
    () => [...messages].sort((a, b) => a.createdAt.localeCompare(b.createdAt)),
    [messages]
  );

  const startSession = async () => {
    setIsLoading(true);
    const response = await apiPost<JournalTurnResponse, { message: string }>('/api/journal', {
      message: 'I want to begin a guided reflection session.'
    });
    setIsLoading(false);

    if (!response.success) {
      return;
    }

    setSessionId(response.data.sessionId);
    setMessages(response.data.messages);
    setDisclaimer(response.data.disclaimer);
  };

  const endSession = async () => {
    if (!sessionId) {
      return;
    }

    setIsLoading(true);
    await apiPatch<{ session: { id: string } }, { sessionId: string }>('/api/journal', { sessionId });
    setIsLoading(false);

    setSessionId(null);
  };

  const sendMessage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = input.trim();

    if (!trimmed || isLoading) {
      return;
    }

    setIsLoading(true);
    const response = await apiPost<JournalTurnResponse, { message: string; sessionId?: string }>('/api/journal', {
      message: trimmed,
      sessionId: sessionId ?? undefined
    });
    setIsLoading(false);

    if (!response.success) {
      return;
    }

    setInput('');
    setSessionId(response.data.sessionId);
    setMessages(response.data.messages);
    setDisclaimer(response.data.disclaimer);
  };

  return (
    <div className="space-y-4">
      <Card title="AI Journal" subtitle="Structured, grounded reflection sessions">
        <p className="text-xs text-bud-darkBg/70 dark:text-bud-lightBg/70">{disclaimer}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          <Button type="button" onClick={startSession} disabled={isLoading || hasActiveSession}>
            Start Session
          </Button>
          <Button type="button" variant="ghost" onClick={endSession} disabled={isLoading || !hasActiveSession}>
            End Session
          </Button>
        </div>
      </Card>

      <Card title="Conversation" subtitle="Evidence-based coping focused prompts">
        <div className="space-y-3">
          <div className="max-h-[52vh] space-y-3 overflow-y-auto rounded-xl border border-black/10 bg-white/60 p-3 dark:border-white/10 dark:bg-white/5">
            {sortedMessages.length === 0 ? (
              <p className="text-sm text-bud-darkBg/65 dark:text-bud-lightBg/65">Start a session to begin guided journaling.</p>
            ) : (
              sortedMessages.map((message) => (
                <div
                  key={`${message.role}-${message.createdAt}`}
                  className={`max-w-[88%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                    message.role === 'assistant'
                      ? 'bg-bud-primary/12 text-bud-darkBg dark:text-bud-lightBg'
                      : 'ml-auto bg-bud-secondary/20 text-bud-darkBg dark:text-bud-lightBg'
                  }`}
                >
                  <p className="mb-1 text-[11px] font-medium uppercase tracking-wide opacity-70">{message.role === 'assistant' ? 'Bud' : 'You'}</p>
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
              ))
            )}
          </div>

          <form onSubmit={sendMessage} className="space-y-2">
            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              className="min-h-24 w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm focus:border-bud-primary focus:outline-none dark:border-white/20 dark:bg-white/10"
              placeholder="Write what you are noticing right now..."
              disabled={isLoading}
            />
            <Button type="submit" fullWidth disabled={isLoading}>
              {isLoading ? 'Thinking...' : 'Send'}
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}

export default Journal;
