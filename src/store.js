import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { reducer as HomeReducer } from './components/Home'

const rootReducer = combineReducers({
  Home: HomeReducer
})

// This just allows for multiple middlewares to be integrated with redux
const middleware = []
middleware.push(thunk)

export default createStore(rootReducer, applyMiddleware(...middleware))