# kmonadx-playground

[Try it Out!](https://srithon.github.io/kmonadx-playground/)

`kmonadx-playground` is a simple web interface for the [kmonadx](https://github.com/srithon/kmonadx) transpiler, allowing users to try it out without installing the binary.
Briefly, `kmonadx` compiles a custom TOML-like configuration language, `kbdx`, into `kmonad`'s native `kbd` format.
This custom language is designed to be more ergonomic than `kbd`, and to provide powerful features like layer inheritance which make experimentation with keyboard setups much easier.
For more information about `kmonadx` and the `kbdx` language, see the [README](https://github.com/srithon/kmonadx).

`kmonadx-playground` runs `kmonadx` directly in the browser by interfacing with a thin wrapper around the underlying Rust crate, compiled to WebAssembly.
Fun fact: diagnostics are rendered by essentially capturing the `kmonadx` CLI's output, decoding the ANSI escape codes into equivalently styled HTML using the [ansi-up](https://github.com/drudru/ansi_up) JavaScript library, and directly displaying this HTML in a pane with a monospace font.

## Building the Project

To build `kmonadx-playground`, follow these steps:

1. **Clone the repository:**
   ```sh
   git clone https://github.com/srithon/kmonadx-playground.git
   cd kmonadx-playground
   ```

2. **Install Rust and wasm-pack:**
   ```sh
   curl https://sh.rustup.rs -sSf | sh
   cargo install wasm-pack
   ```

3. **Build the Rust WASM package:**
   ```sh
   cd kmonadx-wasm
   wasm-pack build
   cd ..
   ```

4. **Install dependencies:**; this assumes that `pnpm` is installed.
   ```sh
   pnpm install
   ```

5. **Build the website:**
   ```sh
   pnpm run build
   ```

6. **Serve the website locally:**
   ```sh
   pnpm run dev
   ```

## GitHub Actions Workflow

The project includes a GitHub Actions workflow to automate the build and deployment process, defined in `.github/workflows/deploy.yml`.

## Contributing

Contributions are welcome! If you have any ideas, suggestions, or bug reports, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
