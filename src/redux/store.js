import { createStore, combineReducers } from 'redux';
import { contentReducer } from './reducers/contentReducer';

let reducers = combineReducers(
   {
      content: contentReducer
   }
);

let store = createStore(reducers)

window.store = store;

export default store;