import uuid from 'react-uuid';
import { Tools } from "../../utils/tools";

//CONSTS
const ADD_TASK = 'store/tasksReducer/ADD-TASK';
const GET_TASKS = 'store/tasksReducer/GET-TASKS-FROM-LOCAL';

const initialState = {
   tasks: []
}

export const tasksReducer = (state = initialState, action) => {
   switch (action.type) {
      default:
         return state;

      case GET_TASKS:
         return {
            ...state,
            tasks: Tools.getFromLocalStore('tasks')
         }

      case ADD_TASK:
         const newTask = {
            id: uuid(),
            text: action.task,
            isComplited: false
         }
         Tools.addToLocalStore(newTask, 'tasks');
         return {
            ...state,
            tasks: [...state.tasks, newTask]
         }
   }
}

export const getTasks = () => (
   {
      type: GET_TASKS
   }
)

export const addTask = (task) => (
   {
      type: ADD_TASK,
      task
   }
)