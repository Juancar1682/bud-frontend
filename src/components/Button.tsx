import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

type ButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> & {
  variant?: ButtonVariant;
  fullWidth?: boolean;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-bud-primary text-white hover:bg-bud-primaryDeep',
  secondary: 'bg-bud-secondary text-white hover:bg-bud-secondaryDeep',
  ghost: 'bg-transparent text-bud-darkBg hover:bg-black/5 dark:text-bud-lightBg dark:hover:bg-white/10'
};

function Button({ variant = 'primary', fullWidth = false, children, className = '', ...props }: ButtonProps) {
  return (
    <button
      className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bud-primary ${variantStyles[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
