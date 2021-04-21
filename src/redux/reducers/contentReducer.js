import { Tools } from "../../utils/tools";

const ADD_NOTE = 'store/content/ADD-NOTE';
const GET_NOTES = 'store/content/GET-NOTES';
const DEL_NOTE = 'store/content/DEL-NOTE';


const initialState = {
   notes: []
};

export const contentReducer = (state = initialState, action) => {
   switch (action.type) {
      default:
         return state;


      case ADD_NOTE:
         let dateNow = Tools.dateGetter();
         let newNote = {
            id: Math.floor(1 + Math.random() * (10000 + 1 - 1)),
            date: dateNow,
            text: action.newNote.note,
            isImportant: action.newNote.isImportant
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
   }
}



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
