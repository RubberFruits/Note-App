import { Tools } from "../../utils/tools";

const TOGGLE_EDIT_MODE = 'store/content/TOGGLE-EDIT-MODE';
const ADD_NOTE = 'store/content/ADD-NOTE';
const GET_NOTES = 'store/content/GET-NOTES';
const DEL_NOTE = 'store/content/DEL-NOTE';
const CHANGE_DELETING = 'store/content/CHANGE_DELETING';


const initialState = {
   notes: [],
   isEditMode: false,
   isDeleting: false
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
         let dateNow = Tools.dateGetter();
         let newNote = {
            id: Math.floor(1 + Math.random() * (10000 + 1 - 1)),
            date: dateNow,
            text: action.newNote.note
         }
         Tools.addNoteToLocalStore(newNote);
         return {
            ...state,
            notes: [...state.notes, newNote]
         }

      case GET_NOTES:
         return {
            ...state,
            notes: Tools.getNotesFromLocalStore()
         }

      case DEL_NOTE:
         Tools.delNoteFromLocalStorage(action.noteId);
         return {
            ...state,
            notes: state.notes
               .filter(item => item.id !== action.noteId)
         }

      case CHANGE_DELETING:
         return {
            ...state,
            isDeleting: action.isDeleting
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

export const getNotes = () => (
   {
      type: GET_NOTES
   }
)

export const delNote = (noteId) => (
   {
      type: DEL_NOTE,
      noteId
   }
)

export const changeDeletingMode = (isDeleting) => (
   {
      type: CHANGE_DELETING,
      isDeleting
   }
)
