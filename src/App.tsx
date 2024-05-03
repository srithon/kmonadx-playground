import './App.css'
import * as wasm from '../kmonadx-wasm/pkg'
import { AnsiUp } from 'ansi_up'
import { useState } from 'react'

function App() {
  const [kbdxInput, setKbdxInput] = useState('');
  const [diagnostics, setDiagnostics] = useState('');
  const [kbdOutput, setKbdOutput] = useState('');

  const compile = (_: any) => {
    let result = wasm.compile(kbdxInput);
    const ansiUp = new AnsiUp();

    const resultString = new TextDecoder().decode(result.diagnostics);

    setDiagnostics(ansiUp.ansi_to_html(resultString));
    setKbdOutput(result.result);

    result.free();
  };

  return (
    <div id="app">
      <div id="user-input">
        <textarea name="kbdx-input" value={kbdxInput} onChange={e => setKbdxInput(e.target.value)} />
        <button onClick={compile}>Compile!</button>
      </div>
      <div id="compilation-output">
        <div id="diagnostics" dangerouslySetInnerHTML={{__html: diagnostics}}></div>
        <textarea name="kbd-output" value={kbdOutput} readOnly={true} />
      </div>
    </div>
  )
}

export default App
