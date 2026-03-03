import { useState } from 'react';
import Button from '../components/Button';
import Card from '../components/Card';

type Exercise = {
  id: string;
  title: string;
  duration: string;
};

const exerciseList: Exercise[] = [
  { id: 'breathwork', title: 'Breathwork Reset', duration: '5 min' },
  { id: 'walk', title: 'Mindful Walk', duration: '15 min' },
  { id: 'stretch', title: 'Mobility Stretch', duration: '10 min' }
];

function Exercises() {
  const [completed, setCompleted] = useState<Record<string, boolean>>({});

  const toggleComplete = (id: string) => {
    setCompleted((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {exerciseList.map((exercise) => (
        <Card key={exercise.id} title={exercise.title} subtitle={exercise.duration}>
          <p className="text-sm text-bud-darkBg/70 dark:text-bud-lightBg/70">Calm, simple routine aligned with daily energy.</p>
          <div className="mt-4 flex items-center justify-between">
            <Button type="button" onClick={() => toggleComplete(exercise.id)}>
              Start Session
            </Button>
            <span className={`rounded-full px-3 py-1 text-xs font-medium ${completed[exercise.id] ? 'bg-bud-primary text-white' : 'bg-black/5 text-bud-darkBg dark:bg-white/10 dark:text-bud-lightBg'}`}>
              {completed[exercise.id] ? 'Completed' : 'Pending'}
            </span>
          </div>
        </Card>
      ))}
    </div>
  );
}

export default Exercises;
