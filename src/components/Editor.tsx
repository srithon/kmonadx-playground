import CodeEditor from 'react-simple-code-editor';
import hljs from 'highlight.js/lib/core';
import GridSection from '@components/GridSection';
import './Editor.css';

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

const Editor = ({ value, onChange }: EditorProps) => {
  return (
    <GridSection label="Kbdx Editor" className="input-wrapper">
      <div className="scroll-wrapper">
        <CodeEditor
          id="kbdx-input"
          value={value}
          onValueChange={onChange}
          highlight={code => {
            const lines = code.split('\n');
            return lines.map((line, i) => {
              const lineNumber = `<span class="editor-line-number">${i + 1}</span>`;
              const highlightedContent = hljs.highlight(line, { language: 'ini' }).value;
              return lineNumber + highlightedContent;
            }).join('\n');
          }}
          padding={5}
        />
      </div>
    </GridSection>
  );
};

export default Editor; 