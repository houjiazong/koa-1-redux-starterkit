import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import counter from "./reducers/counter";

export default combineReducers({
  counter,
  router
})
