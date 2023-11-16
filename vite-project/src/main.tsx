import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ConfigProvider } from 'antd'
import { Provider } from 'react-redux'
import store from "./redux/store.js";


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider
    theme={{
      token:{
        colorPrimary:"#141E46",
        colorBorder:"#141E46",
      },
    }
    }>
      <Provider store={store} >
      <App/>
      </Provider>
      
    </ConfigProvider>
  </React.StrictMode>,
)
