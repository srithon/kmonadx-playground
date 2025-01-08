// this has to go in another file because the compiletime plugin fails to load
// the wasm file in App.tsx when trying to evaluate compiletime expressions in
// that file; also, I kept getting errors when trying to use the `compileTime`
// function here to avoid the type cast in App.tsx, but it kept erroring out
export const INITIAL_INPUT = async () => {
    const response = await fetch('https://raw.githubusercontent.com/srithon/kmonadx/refs/heads/master/functional_tutorial.kbdx');
    const text = await response.text();
    return text;
}

