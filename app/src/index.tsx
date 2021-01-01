import React from 'react'
import { Provider } from 'react-redux'
import { store } from './redux'
import ReactDOM from 'react-dom'
import App from './application'

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
)

