import './GridSection.css';

interface GridSectionProps {
  label: string;
  children: React.ReactNode;
  className?: string;
  id?: string;
  inlineContent?: React.ReactNode;
}

const GridSection = ({ label, children, className, id, inlineContent }: GridSectionProps) => {
  return (
    <div className={`grid-section ${className}`} id={id}>
      <div className="grid-section-label">
        {label}
        {inlineContent && <span className="inline-content">{inlineContent}</span>}
      </div>
      {children}
    </div>
  );
};

export default GridSection; 