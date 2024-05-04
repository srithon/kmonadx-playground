import './App.css'
import * as wasm from '../kmonadx-wasm/pkg'
import { AnsiUp } from 'ansi_up'
import { useEffect, useState } from 'react'

import hljs from 'highlight.js/lib/core'
import lispHighlighter from 'highlight.js/lib/languages/lisp'

import 'highlight.js/styles/atom-one-dark-reasonable.min.css';

hljs.registerLanguage('lisp', lispHighlighter);

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

    const highlightedGeneratedCode = hljs.highlight(generatedCode, {language: 'lisp'}).value;
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
        <textarea name="kbdx-input" value={kbdxInput} onChange={e => setKbdxInput(e.target.value)} />
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
