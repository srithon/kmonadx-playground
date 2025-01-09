import GridSection from '@components/GridSection';
// import './KbdOutput.css';

interface KbdOutputProps {
  kbdOutput: string;
}

const KbdOutput = ({ kbdOutput }: KbdOutputProps) => {
  return (
    <GridSection label="Kbd Output" id="kbd-output">
      <pre className="scroll-wrapper">
        <code dangerouslySetInnerHTML={{ __html: kbdOutput }}></code>
      </pre>
    </GridSection>
  );
};

export default KbdOutput; 