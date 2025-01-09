import { ReactNode } from 'react';

interface GridSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  label: string;
  className?: string;
}

function GridSection({ children, label, className, ...props }: GridSectionProps) {
  return (
    <div className={`grid-section ${className || ''}`} {...props}>
      <span className="grid-section-label">{label}</span>
      {children}
    </div>
  );
}

export default GridSection;
