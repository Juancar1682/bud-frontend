import { PropsWithChildren } from 'react';

type CardProps = PropsWithChildren<{
  title?: string;
  subtitle?: string;
  className?: string;
}>;

function Card({ title, subtitle, className = '', children }: CardProps) {
  return (
    <section className={`rounded-2xl border border-black/5 bg-white p-5 shadow-calm dark:border-white/10 dark:bg-white/5 ${className}`}>
      {title ? <h2 className="text-lg font-semibold">{title}</h2> : null}
      {subtitle ? <p className="mt-1 text-sm text-bud-darkBg/70 dark:text-bud-lightBg/70">{subtitle}</p> : null}
      <div className={title || subtitle ? 'mt-4' : ''}>{children}</div>
    </section>
  );
}

export default Card;
