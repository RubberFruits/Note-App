import uuid from 'react-uuid';
import { Tools } from "../../utils/tools";

//CONSTS
const ADD_TASK = 'store/tasksReducer/ADD-TASK';
const GET_TASKS = 'store/tasksReducer/GET-TASKS-FROM-LOCAL';
const TOGGLE_TASK_COMPLETE_STATUS = 'store/tasksReducer/TOGGLE-COMPLETE-STATUS';
const DEL_TASK = 'store/tasksReducer/DEL-TASK';
const SET_EDITED_TASK = 'store/tasksReducer/SET-EDITED-TASK';
const CHANGE_TASK = 'store/tasksReducer/CHANGE-TASK';

const initialState = {
   tasks: [],
   editedTask: null,
   completedTasks: 0
}

export const tasksReducer = (state = initialState, action) => {
   switch (action.type) {
      default:
         return state;

      case GET_TASKS:
         return {
            ...state,
            tasks: Tools.getFromLocalStore('tasks'),
            completedTasks: Tools.getFromLocalStore('tasks')
               .filter(task => task.isCompleted === true).length
         }

      case ADD_TASK:
         const newTask = {
            id: uuid(),
            text: action.task,
            isCompleted: false
         }
         Tools.addToLocalStore(newTask, 'tasks');
         return {
            ...state,
            tasks: [...state.tasks, newTask]
         }

      case TOGGLE_TASK_COMPLETE_STATUS:
         let findedTask = state.tasks.find(item => item.id === action.taskId);
         findedTask.isCompleted = !findedTask.isCompleted;
         localStorage.setItem('tasks', JSON.stringify(state.tasks));
         return {
            ...state,
            completedTasks: Tools.getFromLocalStore('tasks')
               .filter(task => task.isCompleted === true).length,
            tasks: [
               ...state.tasks
            ]
         }

      case DEL_TASK:
         Tools.delFromLocalStorage('tasks', action.taskId);
         return {
            ...state,
            tasks: state.tasks.filter(task => task.id !== action.taskId),
            completedTasks: Tools.getFromLocalStore('tasks')
               .filter(task => task.isCompleted === true).length
         }

      case SET_EDITED_TASK:
         return {
            ...state,
            editedTask: action.taskId
         }

      case CHANGE_TASK:
         const changedTask = state.tasks.find(item => item.id === action.taskId);
         action.taskText === ''
            ? changedTask.text = 'Нет названия'
            : changedTask.text = action.taskText;
         localStorage.setItem('tasks', JSON.stringify(state.tasks));
         return {
            ...state,
            tasks: [
               ...state.tasks
            ]
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

export const toggleTaskCompleteStatus = (taskId) => (
   {
      type: TOGGLE_TASK_COMPLETE_STATUS,
      taskId
   }
)

export const delTask = (taskId) => (
   {
      type: DEL_TASK,
      taskId
   }
)

export const setEditedTask = (taskId) => (
   {
      type: SET_EDITED_TASK,
      taskId
   }
)

export const changeTask = (taskId, taskText) => (
   {
      type: CHANGE_TASK,
      taskId,
      taskText
   }
)