use kmonadx::kbdx::{compiler::Compiler, diagnostic::DiagnosticAggregator, parser::Parser};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct CompilationResult {
    success: bool,
    generated_code: String,
    diagnostics: Vec<u8>,
}

// OPTIMIZE: construct JavaScript object with both diagnostics and result, rather than having to
// copy one and move the other
#[wasm_bindgen]
impl CompilationResult {
    #[wasm_bindgen(getter)]
    pub fn success(&self) -> bool {
        self.success
    }

    #[wasm_bindgen(getter)]
    pub fn diagnostics(&self) -> Vec<u8> {
        self.diagnostics.clone()
    }

    #[wasm_bindgen(getter)]
    pub fn generated_code(self) -> String {
        self.generated_code
    }
}

#[wasm_bindgen]
pub fn compile(text: &str) -> CompilationResult {
    let compile_aux = |text| {
        let mut diagnostics_aggregator = DiagnosticAggregator::default();
        let file_id = diagnostics_aggregator.new_file("default.kbdx", text);
        let file_handle = diagnostics_aggregator
            .get_file_handle_mut(file_id)
            .expect("newly created file handle must be valid");
        let parser = Parser::new(text, file_handle);

        let result = Compiler::new(parser).and_then(|c| c.compile_string());
        (diagnostics_aggregator, result)
    };

    let (diagnostics_aggregator, compilation_result) = compile_aux(text);
    let diagnostics = diagnostics_aggregator
        .emit_all_to_buffer(true)
        .expect("emission should not fail");

    match compilation_result {
        Ok(compiled_output) => CompilationResult {
            success: true,
            generated_code: compiled_output,
            diagnostics,
        },
        Err(_) => CompilationResult {
            success: false,
            generated_code: String::new(),
            diagnostics,
        },
    }
}
