import { createStore, combineReducers } from 'redux';
import { appReducer } from './reducers/appReducer';
import { contentReducer } from './reducers/contentReducer';

let reducers = combineReducers(
   {
      appState: appReducer,
      content: contentReducer
   }
);

let store = createStore(reducers)

window.store = store;

export default store;