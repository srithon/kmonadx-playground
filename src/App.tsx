import './App.css'
import * as wasm from '../kmonadx-wasm/pkg'
import { AnsiUp } from 'ansi_up'
import { useEffect, useState } from 'react'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'

import hljs from 'highlight.js/lib/core'
import iniHighlighter from 'highlight.js/lib/languages/ini'
import lispHighlighter from 'highlight.js/lib/languages/lisp'

import 'highlight.js/styles/atom-one-dark-reasonable.min.css';

import { INITIAL_INPUT as _INITIAL_INPUT } from './App.compile';
import Editor from '@components/Editor';
import DiagnosticsOutput from '@components/DiagnosticsOutput';
import KbdOutput from '@components/KbdOutput';

const INITIAL_INPUT = (_INITIAL_INPUT as any)() as string;

hljs.registerLanguage('lisp', lispHighlighter);
hljs.registerLanguage('ini', iniHighlighter);

function App() {
  const [kbdxInput, setKbdxInput] = useState(INITIAL_INPUT);
  const [diagnostics, setDiagnostics] = useState('');
  const [kbdOutput, setKbdOutput] = useState('');

  const compile = () => {
    let compilationResult = wasm.compile(kbdxInput);
    const diagnostics = new TextDecoder().decode(compilationResult.diagnostics);
    const generatedCode = compilationResult.generated_code;

    const ansiUp = new AnsiUp();
    setDiagnostics(ansiUp.ansi_to_html(diagnostics));

    const highlightedGeneratedCode = hljs.highlight(generatedCode, { language: 'lisp' }).value;
    setKbdOutput(highlightedGeneratedCode);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      compile()
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [kbdxInput]);

  return (
    <div id="app" className="container">
      <PanelGroup direction="horizontal">
        <Panel defaultSize={50} minSize={30}>
          <Editor value={kbdxInput} onChange={setKbdxInput} />
        </Panel>
        
        <PanelResizeHandle className="resize-handle vertical" />
        
        <Panel defaultSize={50} minSize={30}>
          <PanelGroup direction="vertical">
            <Panel defaultSize={33} minSize={20}>
              <DiagnosticsOutput diagnostics={diagnostics} />
            </Panel>

            <PanelResizeHandle className="resize-handle horizontal" />

            <Panel defaultSize={66} minSize={20}>
              <KbdOutput kbdOutput={kbdOutput} />
            </Panel>
          </PanelGroup>
        </Panel>
      </PanelGroup>
    </div>
  )
}

export default App;
