import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppRouter } from './routers/index.tsx'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from './styles/global.ts'
import { defaultTheme } from './styles/theme/default.ts'
import { Provider } from 'react-redux'
import { store } from './redux/store';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </ThemeProvider>
  </StrictMode>,
)
