import { dateGetter } from "../../utils/helpers";

const TOGGLE_EDIT_MODE = 'store/content/TOGGLE-EDIT-MODE';
const ADD_NOTE = 'store/content/ADD-NOTE';

const initialState = {
   notes: [
      { id: 1, date: '16.05.21', text: 'Wonderful!' },
      { id: 2, date: '11.05.21', text: 'Hello dear ass' }
   ],
   isEditMode: false
};

export const contentReducer = (state = initialState, action) => {
   switch (action.type) {
      default:
         return state;
      case TOGGLE_EDIT_MODE:
         return {
            ...state,
            isEditMode: action.isEditMode
         }
      case ADD_NOTE:
         let dateNow = dateGetter();
         return {
            ...state,
            notes: [...state.notes,
            {
               id: Math.floor(1 + Math.random() * (10000 + 1 - 1)),
               date: dateNow,
               text: action.newNote.note
            }
            ]
         }
   }
}

export const toggleEditMode = (isEditMode) => (
   {
      type: TOGGLE_EDIT_MODE,
      isEditMode
   }
)

export const addNote = (newNote) => (
   {
      type: ADD_NOTE,
      newNote
   }
)
