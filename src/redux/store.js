import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { contentReducer } from './reducers/contentReducer';
import { tasksReducer } from './reducers/tasksReducer';
import { authReducer } from './reducers/authReducer';
import thunkMiddleware from 'redux-thunk';

let reducers = combineReducers(
   {
      content: contentReducer,
      tasksState: tasksReducer,
      authState: authReducer
   }
);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)))

window.store = store;

export default store;