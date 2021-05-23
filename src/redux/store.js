import { createStore, combineReducers } from 'redux';
import { contentReducer } from './reducers/contentReducer';
import { tasksReducer } from './reducers/tasksReducer';

let reducers = combineReducers(
   {
      content: contentReducer,
      tasksState: tasksReducer
   }
);

let store = createStore(reducers)

window.store = store;

export default store;