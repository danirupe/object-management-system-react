import React, { lazy } from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import { Provider } from 'react-redux'
import { store } from './store/store.tsx'
import { BrowserRouter } from 'react-router-dom'

const LazyApp = lazy(() => import('./App.tsx'))

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <LazyApp />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
