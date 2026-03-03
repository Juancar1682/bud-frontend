import { useEffect, useState } from 'react';
import Card from '../components/Card';
import { apiGet } from '../services/apiClient';
import type { InsightResponse } from '../types/api';

function Insights() {
  const [insight, setInsight] = useState<InsightResponse['insight'] | null>(null);

  useEffect(() => {
    const load = async () => {
      const response = await apiGet<InsightResponse>('/api/insights');
      if (response.success) {
        setInsight(response.data.insight);
      }
    };

    void load();
  }, []);

  return (
    <div className="space-y-4">
      <Card title="Yesterday’s Reflection">
        <p className="text-sm leading-relaxed text-bud-darkBg/80 dark:text-bud-lightBg/80">
          {insight?.yesterdayReflection ?? 'Loading reflection insight...'}
        </p>
      </Card>

      <Card title="Today’s Prediction">
        <p className="text-sm leading-relaxed text-bud-darkBg/80 dark:text-bud-lightBg/80">
          {insight?.todayPrediction ?? 'Loading prediction insight...'}
        </p>
      </Card>

      <Card title="How to Read This">
        <p className="text-sm leading-relaxed text-bud-darkBg/80 dark:text-bud-lightBg/80">
          {insight?.explanation ?? 'Insights remain stable during the day to support consistent reflection.'}
        </p>
      </Card>
    </div>
  );
}

export default Insights;
