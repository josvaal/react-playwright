# React + TypeScript + Vite + Playwright + Vercel CI/CD

Este proyecto incluye una configuración completa de CI/CD con pruebas automatizadas usando Playwright y despliegue automático a Vercel cuando se hace push a la rama main.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Ejecución de pruebas con Playwright

Para ejecutar las pruebas de Playwright localmente:

```bash
# Instalar dependencias
npm install

# Instalar navegadores de Playwright
npx playwright install

# Ejecutar pruebas
npm run test:e2e

# Ejecutar pruebas con interfaz gráfica
npm run test:e2e:ui
```

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

## CI/CD con GitHub Actions y Vercel

Este proyecto está configurado con un flujo de trabajo de GitHub Actions que:

1. Ejecuta pruebas de Playwright automáticamente cuando se hace push a la rama main
2. Si las pruebas pasan, despliega automáticamente la aplicación a Vercel

### Configuración de secretos para Vercel

Para que el despliegue a Vercel funcione correctamente, necesitas configurar los siguientes secretos en tu repositorio de GitHub:

1. `VERCEL_TOKEN`: Tu token de API de Vercel
2. `VERCEL_ORG_ID`: El ID de tu organización en Vercel
3. `VERCEL_PROJECT_ID`: El ID de tu proyecto en Vercel

Puedes obtener estos valores siguiendo estos pasos:

1. Instala la CLI de Vercel: `npm i -g vercel`
2. Ejecuta `vercel login` y sigue las instrucciones
3. Ejecuta `vercel link` en la raíz de tu proyecto
4. Los valores necesarios se mostrarán en la consola o puedes encontrarlos en el archivo `.vercel/project.json`

Luego, agrega estos secretos en tu repositorio de GitHub en Settings > Secrets and variables > Actions.

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
