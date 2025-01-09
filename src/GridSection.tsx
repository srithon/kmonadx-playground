import React from 'react';

const GridSection: React.FC<{ label: string; children: React.ReactNode; className?: string; id?: string }> = ({ label, children, className, id }) => {
  return (
    <div className={`grid-section ${className}`} id={id}>
      <div className="grid-section-label">{label}</div>
      <div className="scroll-wrapper" style={{ height: '100%' }}>
        {children}
      </div>
    </div>
  );
};

export default GridSection;
