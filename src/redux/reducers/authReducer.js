
const SET_USER_IN_STATE = 'store/appReducer/SET_USER_IN_STATE';

const initialState = {
   isAuthenticated: false,
   userEmail: null
}

export const authReducer = (state = initialState, action) => {
   switch (action.type) {
      default:
         return state

      case SET_USER_IN_STATE:
         return {
            ...state,
            userEmail: action.email,
            isAuthenticated: action.isAuth
         }
   }
}

export const setUserInState = (email, isAuth = true) => (
   {
      type: SET_USER_IN_STATE,
      email,
      isAuth
   }
)
