import './App.css'
import * as wasm from '../kmonadx-wasm/pkg'
import { AnsiUp } from 'ansi_up'
import { useEffect, useState } from 'react'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'

import Editor from 'react-simple-code-editor';

import hljs from 'highlight.js/lib/core'
// apparently toml = ini?
import iniHighlighter from 'highlight.js/lib/languages/ini'
import lispHighlighter from 'highlight.js/lib/languages/lisp'

import 'highlight.js/styles/atom-one-dark-reasonable.min.css';
import { INITIAL_INPUT as _INITIAL_INPUT } from './App.compile';

import GridSection from './GridSection';

// this makes the language server happy; the compile time plugin transforms the
// INITIAL_INPUT async function into a function which returns the final string
// result, but the language server thinks that when we import INITIAL_INPUT,
// we're importing the source async function; to work around this, we just cast
// the result to a string so that the language server doesn't get confused
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

    // don't need to free `compilationResult` because accessing `generated_code` moves the value
  };

  // recompile 500ms after user stops typing
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
          <GridSection label="KBDX Editor" className="input-wrapper">
            <div className="scroll-wrapper">
              <Editor
                id="kbdx-input"
                value={kbdxInput}
                onValueChange={setKbdxInput}
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
        </Panel>
        
        <PanelResizeHandle className="resize-handle vertical" />
        
        <Panel defaultSize={50} minSize={30}>
          <PanelGroup direction="vertical">
            <Panel defaultSize={33} minSize={20}>
              <GridSection label="Compilation Diagnostics" id="diagnostics">
                <pre className="scroll-wrapper">
                  <div dangerouslySetInnerHTML={{ __html: diagnostics }}></div>
                </pre>
              </GridSection>
            </Panel>
            
            <PanelResizeHandle className="resize-handle horizontal" />
            
            <Panel defaultSize={67} minSize={20}>
              <GridSection label="Kbd Output" id="kbd-output">
                <pre className="scroll-wrapper">
                  <code dangerouslySetInnerHTML={{ __html: kbdOutput }}></code>
                </pre>
              </GridSection>
            </Panel>
          </PanelGroup>
        </Panel>
      </PanelGroup>
    </div>
  )
}

export default App
