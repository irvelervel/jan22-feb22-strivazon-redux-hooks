import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

import 'bootstrap/dist/css/bootstrap.min.css'
import './style/index.css'

import { Provider } from 'react-redux'
import configureStore from './app/store'

import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

let persistor = persistStore(configureStore)

// with Provider we're injecting our Redux Store into the React application

ReactDOM.render(
  <Provider store={configureStore}>
    {/* wrap your entire application tree into Provider, just like you'd do with BrowserRouter */}
    <PersistGate persistor={persistor}>
      {/* PersistGate is the persistency layer, we need it if we want redux-persist to reach our React app */}
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
