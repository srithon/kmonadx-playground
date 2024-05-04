import './App.css'
import * as wasm from '../kmonadx-wasm/pkg'
import { AnsiUp } from 'ansi_up'
import { useEffect, useState } from 'react'

import Editor from 'react-simple-code-editor';

import hljs from 'highlight.js/lib/core'
// apparently toml = ini?
import iniHighlighter from 'highlight.js/lib/languages/ini'
import lispHighlighter from 'highlight.js/lib/languages/lisp'

import 'highlight.js/styles/atom-one-dark-reasonable.min.css';

hljs.registerLanguage('lisp', lispHighlighter);
hljs.registerLanguage('ini', iniHighlighter);

function App() {
  const [kbdxInput, setKbdxInput] = useState('');
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
    <div id="app">
      <div id="user-input">
        <div className="input-wrapper">
        <Editor id="kbdx-input" value={kbdxInput} onValueChange={code => setKbdxInput(code)} highlight={code => hljs.highlight(code, { language: 'ini' }).value} />
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
