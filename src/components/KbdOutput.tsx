import GridSection from '@components/GridSection';
import './KbdOutput.css';
import { useState } from 'react';
import ActionButton from './ActionButton';

interface KbdOutputProps {
  kbdOutput: string;
  rawKbdOutput: string;
}

interface CopyToClipboardButtonProps {
  rawKbdOutput: string;
}

const CopyToClipboardButton = ({ rawKbdOutput }: CopyToClipboardButtonProps) => {
    const [copied, setCopied] = useState(false);
    const [buttonWidth, setButtonWidth] = useState(0);
    const [buttonHeight, setButtonHeight] = useState(0);

    const handleCopy = (e: React.MouseEvent<HTMLButtonElement>) => {
        navigator.clipboard.writeText(rawKbdOutput);
        setCopied(true);

        const button = e.currentTarget;
        setButtonWidth(button.clientWidth);
        setButtonHeight(button.clientHeight);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <ActionButton 
            className="copy-button"
            onClick={handleCopy}
            style={copied ? {width: buttonWidth, height: buttonHeight} : {}}
        >
            {copied ? '✓ Copied!' : 'Copy to Clipboard'}
        </ActionButton>
    );
};

const KbdOutput = ({ kbdOutput, rawKbdOutput }: KbdOutputProps) => {
  return (
    <GridSection 
        label="Kbd Output" 
        id="kbd-output" 
        inlineContent={<CopyToClipboardButton rawKbdOutput={rawKbdOutput} />}
    >
        <pre className="scroll-wrapper">
            <code dangerouslySetInnerHTML={{ __html: kbdOutput }}></code>
        </pre>
    </GridSection>
  );
};

export default KbdOutput; 