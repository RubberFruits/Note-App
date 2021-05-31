import { Tools } from "../../utils/tools";
import uuid from 'react-uuid';


//SETTINGS 
const CHANGE_NOTES_VIEW = 'store/content/CHANGE-NOTES-VIEW';

//NOTES AND GROUPS
const ADD_NOTE = 'store/content/ADD-NOTE';
const GET_FROM_LOCAL_STORE = 'store/content/GET-NOTES';
const DEL_NOTE = 'store/content/DEL-NOTE';

//GROUPS
const ADD_GROUP = 'store/content/ADD-GROUP';
const ADD_NOTE_TO_GROUP = 'store/content/ADD_NOTE_TO_GROUP';
const DEL_GROUP = 'store/content/DEL-GROUP'
const DEL_NOTE_FROM_GROUP = 'store/content/DEL-GROUP-NOTE';
const RENAME_GROUP = 'store/content/RENAME-GROUP'
const CHANGE_COLOR = 'store/content/CHANGE-COLOR';

const initialState = {
   notes: [],
   importantNotes: [],
   groups: [
      /*  {
         id:ID
          groupName: 'Рецепты',
          groupNotes: [
             {
                header: 'Куриный бульон',
                text: 'lorem ipsum dolor sit amet, consectetur lorem ipsum dolor sit amet, consectetur lorem ipsum dolor sit amet, consectetur lorem ipsum dolor sit amet, consectetur '
             },
             {
                header: 'Пельмени',
                text: 'lorem ipsum dolor sit amet, consectetur lorem ipsum dolor sit amet, consectetur lorem ipsum dolor sit amet, consectetur lorem ipsum dolor sit amet, consectetur '
             }
          ]
       } */

   ],
   notesView: 'cards'
};

export const contentReducer = (state = initialState, action) => {
   switch (action.type) {
      default:
         return state;

      case CHANGE_NOTES_VIEW:
         if (state.notesView === action.notesView) {
            return state
         }
         Tools.addToLocalStoreSetting(JSON.stringify(action.notesView), 'notesView');
         return {
            ...state,
            notesView: action.notesView
         }

      case ADD_NOTE:
         let dateNow = Tools.dateGetter();
         let newNote = {
            id: Math.floor(1 + Math.random() * (10000 + 1 - 1)),
            date: dateNow,
            text: action.newNote.note,
            isImportant: action.newNote.isImportant
         }
         Tools.addToLocalStore(newNote, 'notes');
         if (newNote.isImportant) {
            return {
               ...state,
               notes: [...state.notes, newNote],
               importantNotes: [...state.importantNotes, newNote]
            }
         }
         return {
            ...state,
            notes: [...state.notes, newNote]
         }

      case GET_FROM_LOCAL_STORE:
         Tools.addToLocalStoreSetting(JSON.stringify(state.notesView), 'notesView');
         return {
            ...state,
            notes: Tools.getFromLocalStore('notes'),
            importantNotes: Tools.getFromLocalStore('notes').filter(note => note.isImportant),
            groups: Tools.getFromLocalStore('groups'),
            notesView: Tools.getFromLocalStore('notesView')
         }

      case DEL_NOTE:
         Tools.delFromLocalStorage('notes', action.noteId);
         return {
            ...state,
            notes: state.notes
               .filter(item => item.id !== action.noteId),
            importantNotes: state.importantNotes
               .filter(item => item.id !== action.noteId)
         }

      case ADD_GROUP:
         const newGroup = {
            id: uuid(),
            groupName: action.newGroup,
            groupNotes: [],
            backgroundColor: '#5f9ea0'
         }
         Tools.addToLocalStore(newGroup, 'groups');
         return {
            ...state,
            groups: [...state.groups, newGroup]
         }

      case ADD_NOTE_TO_GROUP:
         let findedGroupNotes = state.groups.find(item => item.id === action.id).groupNotes;
         let newNoteInGroup = {
            id: uuid(),
            date: Tools.dateGetter(),
            text: action.newNote.note,
            header: action.newNote.header
         }
         findedGroupNotes.push(newNoteInGroup);
         localStorage.setItem('groups', JSON.stringify(state.groups));
         return {
            ...state,
            groups: [
               ...state.groups
            ]
         }

      case DEL_GROUP:
         Tools.delFromLocalStorage('groups', action.groupId);
         return {
            ...state,
            groups: state.groups.filter(item => item.id !== action.groupId)
         }

      case DEL_NOTE_FROM_GROUP:
         let findedNotes = state.groups.find(item => item.id === action.groupId).groupNotes;
         const delIndex = findedNotes.findIndex(item => item.id === action.noteId);
         findedNotes.splice(delIndex, 1);
         localStorage.setItem('groups', JSON.stringify(state.groups));
         return {
            ...state,
            groups: [
               ...state.groups
            ]
         }

      case RENAME_GROUP:
         let findedGroup = state.groups.find(item => item.id === action.groupId);
         findedGroup.groupName = action.newGroupName;
         localStorage.setItem('groups', JSON.stringify(state.groups));
         return {
            ...state,
            groups: [
               ...state.groups
            ]
         }

      case CHANGE_COLOR:
         state.groups.find(item => item.id === action.groupId).backgroundColor = action.newColor;
         localStorage.setItem('groups', JSON.stringify(state.groups));
         return {
            ...state,
            groups: [
               ...state.groups
            ]
         }

   }
}

/* {groupName: action.newGroup,groupNotes: [] } */

export const changeNotesView = (notesView) => (
   {
      type: CHANGE_NOTES_VIEW,
      notesView
   }
)

export const addNote = (newNote, id) => (
   {
      type: ADD_NOTE,
      newNote
   }
)

export const getFromLocalStore = () => (
   {
      type: GET_FROM_LOCAL_STORE
   }
)

export const delNote = (noteId) => (
   {
      type: DEL_NOTE,
      noteId
   }
)

export const addGroup = (newGroup) => (
   {
      type: ADD_GROUP,
      newGroup
   }
)

export const addNoteToGroup = (newNote, id) => (
   {
      type: ADD_NOTE_TO_GROUP,
      id,
      newNote
   }
)

export const delGroup = (groupId) => (
   {
      type: DEL_GROUP,
      groupId
   }
)

export const delNoteFromGroup = (groupId, noteId) => (
   {
      type: DEL_NOTE_FROM_GROUP,
      groupId,
      noteId
   }
)

export const renameGroup = (groupId, newGroupName) => (
   {
      type: RENAME_GROUP,
      groupId,
      newGroupName
   }
)

export const changeColor = (groupId, newColor) => (
   {
      type: CHANGE_COLOR,
      groupId,
      newColor
   }
)