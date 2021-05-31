/* import uuid from 'react-uuid'; */

const TOGGLE_MOBILE_SIDEBAR = 'store/appReducer/TOGGLE-MOBILE-SIDEBAR';

const initialState = {
   isSidebarOpen: false
}

export const appReducer = (state = initialState, action) => {
   switch (action.type) {
      default:
         return state

      case TOGGLE_MOBILE_SIDEBAR:
         return {
            ...state,
            isSidebarOpen: !state.isSidebarOpen
         }
   }
}

export const toggleSidebar = () => (
   {
      type: TOGGLE_MOBILE_SIDEBAR
   }
)