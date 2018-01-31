import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './container/app'
import counter from './reducer/counter'

// Grab the state from a global variable injected into the server-generated HTML
const preLoadedState = window.__PRE_LOADED_STATE__

delete window.__PRE_LOADED_STATE__

// create redux store with initial state
const store = createStore(counter, preLoadedState)

render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
)
