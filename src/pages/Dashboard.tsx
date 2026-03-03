import { useEffect, useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';
import TrendChart, { TrendPoint } from '../components/TrendChart';
import { apiGet } from '../services/apiClient';
import type { InsightResponse, MoodListResponse } from '../types/api';

function toTrendPoints(entries: MoodListResponse['entries']): TrendPoint[] {
  const sorted = [...entries]
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
    .slice(-30);

  return sorted.map((entry) => ({
    day: new Date(entry.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    mood: entry.score
  }));
}

const fallbackTrend: TrendPoint[] = [
  { day: 'D-6', mood: 6 },
  { day: 'D-5', mood: 6 },
  { day: 'D-4', mood: 7 },
  { day: 'D-3', mood: 7 },
  { day: 'D-2', mood: 8 },
  { day: 'D-1', mood: 8 },
  { day: 'Today', mood: 7 }
];

function Dashboard() {
  const [trend, setTrend] = useState<TrendPoint[]>(fallbackTrend);
  const [todayMood, setTodayMood] = useState<number>(7.5);
  const [reflection, setReflection] = useState('Loading daily reflection...');
  const [prediction, setPrediction] = useState('Loading daily prediction...');

  useEffect(() => {
    const load = async () => {
      const [moodResponse, insightResponse] = await Promise.all([
        apiGet<MoodListResponse>('/api/mood'),
        apiGet<InsightResponse>('/api/insights')
      ]);

      if (moodResponse.success && moodResponse.data.entries.length > 0) {
        setTrend(toTrendPoints(moodResponse.data.entries));
      }

      if (insightResponse.success) {
        setTodayMood(insightResponse.data.todayMood);
        setReflection(insightResponse.data.insight.yesterdayReflection);
        setPrediction(insightResponse.data.insight.todayPrediction);
      }
    };

    void load();
  }, []);

  const todayMoodText = useMemo(() => `${todayMood.toFixed(1)} / 10`, [todayMood]);

  return (
    <div className="space-y-5">
      <Card>
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <p className="text-base font-medium">Need a quick check-in?</p>
            <p className="text-sm text-bud-darkBg/70 dark:text-bud-lightBg/70">Log mood or start guided journaling in under a minute.</p>
          </div>
          <div className="flex w-full gap-2 sm:w-auto">
            <NavLink to="/mood" className="w-full sm:w-auto">
              <Button fullWidth>Log Mood</Button>
            </NavLink>
            <NavLink to="/journal" className="w-full sm:w-auto">
              <Button variant="secondary" fullWidth>
                Journal
              </Button>
            </NavLink>
          </div>
        </div>
      </Card>

      <TrendChart points={trend} />

      <div className="grid gap-4 md:grid-cols-3">
        <Card title="Today's Status" subtitle="Current mood baseline">
          <p className="text-3xl font-semibold text-bud-primary">{todayMoodText}</p>
          <p className="mt-2 text-sm text-bud-darkBg/70 dark:text-bud-lightBg/70">Based on today's entries and 30-day weighted trend.</p>
        </Card>

        <Card title="Daily Reflection Insight">
          <p className="text-sm leading-relaxed text-bud-darkBg/80 dark:text-bud-lightBg/80">{reflection}</p>
        </Card>

        <Card title="Daily Prediction Insight">
          <p className="text-sm leading-relaxed text-bud-darkBg/80 dark:text-bud-lightBg/80">{prediction}</p>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;
