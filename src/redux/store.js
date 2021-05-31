import { createStore, combineReducers } from 'redux';
import { contentReducer } from './reducers/contentReducer';
import { tasksReducer } from './reducers/tasksReducer';
import { appReducer } from './reducers/appReducer';

let reducers = combineReducers(
   {
      content: contentReducer,
      tasksState: tasksReducer,
      appState: appReducer
   }
);

let store = createStore(reducers)

window.store = store;

export default store;