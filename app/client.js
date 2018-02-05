import React from 'react'
import { render } from 'react-dom'
// import { createStore } from 'redux'
import rootReducer from './reducer'
import configureStore from './store/configureStore'
import Root from './root'

// Grab the state from a global variable injected into the server-generated HTML
const preLoadedState = window.__PRE_LOADED_STATE__
delete window.__PRE_LOADED_STATE__

// create redux store with initial state
const store = configureStore(rootReducer, preLoadedState)

render(
  <Root store={store} />,
  document.getElementById('root')
)
