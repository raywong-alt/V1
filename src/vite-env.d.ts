/// <reference types="vite/client" />

// 前端只持有後端接口 URL，不持有任何 AI API key
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
