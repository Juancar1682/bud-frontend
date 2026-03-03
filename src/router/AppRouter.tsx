import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from '../components/Layout';
import Dashboard from '../pages/Dashboard';
import Exercises from '../pages/Exercises';
import Insights from '../pages/Insights';
import Journal from '../pages/Journal';
import Mood from '../pages/Mood';
import Settings from '../pages/Settings';
import type { ThemeMode } from '../types/theme';

type AppRouterProps = {
  theme: ThemeMode;
  onToggleTheme: () => void;
};

function AppRouter({ theme, onToggleTheme }: AppRouterProps) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/mood" element={<Mood />} />
          <Route path="/exercises" element={<Exercises />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/settings" element={<Settings theme={theme} onToggleTheme={onToggleTheme} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
