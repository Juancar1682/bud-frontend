import { NavLink } from 'react-router-dom';
import Button from './Button';

type TabIcon = 'home' | 'mood' | 'moves' | 'insight' | 'journal';

const navItems = [
  { label: 'Dashboard', mobileLabel: 'Home', path: '/dashboard', icon: 'home' as TabIcon },
  { label: 'Mood', mobileLabel: 'Mood', path: '/mood', icon: 'mood' as TabIcon },
  { label: 'Exercises', mobileLabel: 'Moves', path: '/exercises', icon: 'moves' as TabIcon },
  { label: 'Insights', mobileLabel: 'Insight', path: '/insights', icon: 'insight' as TabIcon },
  { label: 'Journal', mobileLabel: 'Journal', path: '/journal', icon: 'journal' as TabIcon }
];

function TabIconGlyph({ icon }: { icon: TabIcon }) {
  switch (icon) {
    case 'home':
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 10.5 12 3l9 7.5" />
          <path d="M5.5 9.5V21h13V9.5" />
        </svg>
      );
    case 'mood':
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="8.5" />
          <circle cx="9" cy="10" r="1" fill="currentColor" />
          <circle cx="15" cy="10" r="1" fill="currentColor" />
          <path d="M8.5 14c1 .9 2.1 1.5 3.5 1.5s2.5-.6 3.5-1.5" />
        </svg>
      );
    case 'moves':
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="5" r="2" />
          <path d="M8 21l2.5-6 2.5 2.5L16 21" />
          <path d="M7.5 13.5l3.5-3 4.5 1.5" />
        </svg>
      );
    case 'insight':
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 3a7 7 0 0 0-4.5 12.4c.7.6 1.2 1.4 1.3 2.3h6.4c.1-.9.6-1.7 1.3-2.3A7 7 0 0 0 12 3Z" />
          <path d="M9.5 21h5" />
        </svg>
      );
    case 'journal':
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 4h10a2 2 0 0 1 2 2v14H8a2 2 0 0 0-2 2V4Z" />
          <path d="M8 8h7" />
          <path d="M8 12h7" />
        </svg>
      );
  }
}

function SettingsGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="2.5" />
      <path d="M19 12a7 7 0 0 0-.1-1l2-1.5-2-3.4-2.4 1a7 7 0 0 0-1.7-1l-.3-2.6h-4l-.3 2.6a7 7 0 0 0-1.7 1l-2.4-1-2 3.4 2 1.5a7 7 0 0 0 0 2l-2 1.5 2 3.4 2.4-1a7 7 0 0 0 1.7 1l.3 2.6h4l.3-2.6a7 7 0 0 0 1.7-1l2.4 1 2-3.4-2-1.5c.1-.3.1-.7.1-1Z" />
    </svg>
  );
}

function BudMark() {
  return (
    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-bud-primary text-xs font-semibold text-white">
      b
    </span>
  );
}

function Navbar() {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-xl px-2 py-2 text-center text-[11px] font-medium transition-colors md:px-3 md:text-sm ${
      isActive
        ? 'bg-bud-primary text-white'
        : 'text-bud-darkBg/80 hover:bg-black/5 dark:text-bud-lightBg/80 dark:hover:bg-white/10'
    }`;

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-black/5 bg-bud-lightBg/95 backdrop-blur-sm dark:border-white/10 dark:bg-bud-darkBg/95">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="inline-flex items-center gap-2">
            <NavLink to="/dashboard" className="inline-flex items-center text-base font-semibold text-bud-primary dark:text-bud-primarySoft">
              <BudMark />
            </NavLink>
            <p className="text-sm font-medium text-bud-darkBg/70 dark:text-bud-lightBg/70">Bud User</p>
          </div>

          <NavLink
            to="/settings"
            className="inline-flex items-center rounded-xl p-2 text-bud-darkBg/80 hover:bg-black/5 dark:text-bud-lightBg/80 dark:hover:bg-white/10"
            aria-label="Settings"
          >
            <SettingsGlyph />
          </NavLink>
        </div>

        <div className="mx-auto hidden max-w-6xl items-center justify-between gap-3 px-4 pb-3 sm:px-6 md:flex">
          <nav className="flex items-center gap-2">
            {navItems.map((item) => (
              <NavLink key={item.path} to={item.path} className={navLinkClass}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <NavLink to="/mood">
            <Button variant="secondary">Log Mood</Button>
          </NavLink>
        </div>
      </header>

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-black/10 bg-bud-lightBg/95 px-2 py-2 backdrop-blur-sm md:hidden dark:border-white/10 dark:bg-bud-darkBg/95">
        <div className="mx-auto grid max-w-xl grid-cols-5 gap-1">
          {navItems.map((item) => (
            <NavLink key={item.path} to={item.path} className={navLinkClass}>
              <span className="flex flex-col items-center justify-center gap-1">
                <TabIconGlyph icon={item.icon} />
                <span>{item.mobileLabel}</span>
              </span>
            </NavLink>
          ))}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
