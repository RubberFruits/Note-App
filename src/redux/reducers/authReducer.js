
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

const toggleFetching = (isFetching) => (
   {
      type: TOGGLE_FETCH,
      isFetching
   }
)

export const authentication = () => async (dispatch) => {
   const response = await UtilityAPI.authUser();
   if (response.data.resultCode === 0) {
      let { id, email, login } = response.data.data;
      dispatch(setAuthUserData(id, email, login, true));
   }
}

export const login = (login, password, rememberMe) => async (dispatch) => {
   dispatch(toggleFetching(true));
   const response = await UtilityAPI.login(login, password, rememberMe)
   if (response.data.resultCode === 0) {
      dispatch(authentication());
   } else {
      let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error';
      dispatch(stopSubmit('login',
         {
            _error: message
         }
      ));
      dispatch(toggleFetching(false));
   }
}

export const logOut = () => async (dispatch) => {
   dispatch(toggleFetching());
   const response = await UtilityAPI.logout()
   if (response.data.resultCode === 0) {
      dispatch(setAuthUserData(null, null, null, false));
   }
}
