import React from 'react';

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  weight?: 'card' | 'chrome';
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export const GlassPanel: React.FC<GlassPanelProps> = ({
  weight = 'card',
  children,
  className = '',
  as: Component = 'div',
  ...props
}) => {
  const isChrome = weight === 'chrome';

  const baseStyle: React.CSSProperties = {
    backgroundColor: isChrome ? 'rgba(255, 255, 255, 0.78)' : 'rgba(255, 255, 255, 0.66)',
    backdropFilter: isChrome ? 'blur(36px) saturate(140%)' : 'blur(28px) saturate(140%)',
    WebkitBackdropFilter: isChrome ? 'blur(36px) saturate(140%)' : 'blur(28px) saturate(140%)',
    border: '1px solid rgba(255, 255, 255, 0.90)',
    borderTop: '1px solid rgba(255, 255, 255, 1.00)',
    boxShadow: '0 12px 40px rgba(67, 97, 238, 0.12)',
  };

  const defaultRadius = isChrome ? 'rounded-[32px]' : 'rounded-card';

  return (
    <Component
      style={baseStyle}
      className={`${defaultRadius} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};
