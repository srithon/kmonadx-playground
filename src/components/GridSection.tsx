import './GridSection.css';

interface GridSectionProps {
  label: string;
  children: React.ReactNode;
  className?: string;
  id?: string;
}

const GridSection = ({ label, children, className, id }: GridSectionProps) => {
  return (
    <div className={`grid-section ${className}`} id={id}>
      <div className="grid-section-label">{label}</div>
      {children}
    </div>
  );
};

export default GridSection; 