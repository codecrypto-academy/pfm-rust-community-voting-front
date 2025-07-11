
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_USE_MOCK_DATA: string
  readonly VITE_SOLANA_CLUSTER: string
  readonly VITE_PROGRAM_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
