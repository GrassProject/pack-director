# 🗄️ Pack Director
Zip file sharing, made easier

> [!WARNING]
> The `data` parameter in the download URL is a Base64-encoded ZIP file.
> If the file size is large, the URL can become very long.

# 🛠️ Build
```shell
> npm install # install dependent
> npm run build # Build Web Service
> npm run deploy # Deploy the pages with gp-pages
```

# ⚙️ Setting of the Project
```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/pack-director/', // the repo name to deploy
})

```
