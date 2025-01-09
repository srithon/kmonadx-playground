import GridSection from '@components/GridSection';
// import './DiagnosticsOutput.css';

interface DiagnosticsOutputProps {
  diagnostics: string;
}

const DiagnosticsOutput = ({ diagnostics }: DiagnosticsOutputProps) => {
  return (
    <GridSection label="Compilation Diagnostics" id="diagnostics">
      <pre className="scroll-wrapper">
        <div dangerouslySetInnerHTML={{ __html: diagnostics }}></div>
      </pre>
    </GridSection>
  );
};

export default DiagnosticsOutput; 