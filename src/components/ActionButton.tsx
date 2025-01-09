import './ActionButton.css';

interface ActionButtonProps {
  children: React.ReactNode;
  className?: string;
  [prop: string]: any;
}

function ActionButton({ children, className, ...props }: ActionButtonProps) {
  return (
    <button 
      className={`action-button ${className || ''}`} 
      {...props}
    >
      {children}
    </button>
  );
}

export default ActionButton; 