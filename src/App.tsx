import './App.css'
import * as wasm from '../kmonadx-wasm/pkg'
import { AnsiUp } from 'ansi_up'
import { useEffect, useState, useCallback } from 'react'

import Editor from 'react-simple-code-editor';

import hljs from 'highlight.js/lib/core'
// apparently toml = ini?
import iniHighlighter from 'highlight.js/lib/languages/ini'
import lispHighlighter from 'highlight.js/lib/languages/lisp'

import 'highlight.js/styles/atom-one-dark-reasonable.min.css';
import { INITIAL_INPUT as _INITIAL_INPUT } from './App.compile';

// this makes the language server happy; the compile time plugin transforms the
// INITIAL_INPUT async function into a function which returns the final string
// result, but the language server thinks that when we import INITIAL_INPUT,
// we're importing the source async function; to work around this, we just cast
// the result to a string so that the language server doesn't get confused
const INITIAL_INPUT = (_INITIAL_INPUT as any)() as string;

hljs.registerLanguage('lisp', lispHighlighter);
hljs.registerLanguage('ini', iniHighlighter);

function App() {
  const [kbdxInput, setKbdxInput] = useState('');
  const [diagnostics, setDiagnostics] = useState('');
  const [kbdOutput, setKbdOutput] = useState('');
  const [lineCount, setLineCount] = useState(1);

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

  const handleValueChange = (code: string) => {
    setKbdxInput(code);
    const lines = code.split('\n');
    setLineCount(lines.length);
  };

  // sets the initial input while also updating the line count
  useEffect(() => {
    handleValueChange(INITIAL_INPUT);
  }, []);

  return (
    <div id="app" className="container">
      <div id="user-input">
        <div className="input-wrapper">
          <div className="line-numbers">
            {Array.from({ length: lineCount }, (_, i) => (
              <div key={i + 1} className="editor-line-number">
                {i + 1}
              </div>
            ))}
          </div>
          <Editor
            id="kbdx-input"
            value={kbdxInput}
            onValueChange={handleValueChange}
            highlight={code => hljs.highlight(code, { language: 'ini' }).value}
            padding={10}
          />
        </div>
      </div>
      <div id="compilation-output">
        <div id="diagnostics" dangerouslySetInnerHTML={{ __html: diagnostics }}></div>
        <pre id="kbd-output">
          <code dangerouslySetInnerHTML={{ __html: kbdOutput }}></code>
        </pre>
      </div>
    </div>
  )
}

export default App
