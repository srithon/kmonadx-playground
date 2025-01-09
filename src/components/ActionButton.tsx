import './ActionButton.css';

interface ActionButtonProps {
    [prop: string]: any; // This will take all other props
}

const ActionButton: React.FC<ActionButtonProps> = ({ ...props }) => {
    return (
        <button {...props} className={`action-button ${props.className || ''}`}>
            {props.children}
        </button>
    );
};

export default ActionButton; 