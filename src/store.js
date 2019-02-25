import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { reducer as LoginReducer } from './components/Login'
import { reducer as AppReducer } from './components/App'

const rootReducer = combineReducers({
  Login: LoginReducer,
  App: AppReducer,
})

// This just allows for multiple middlewares to be integrated with redux
const middleware = []
middleware.push(thunk)

export default createStore(rootReducer, applyMiddleware(...middleware))
