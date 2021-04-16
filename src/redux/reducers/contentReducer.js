//const

const initialState = {
   notes: [
      { id: 1, date: '16.05.21', text: 'Wonderful!' }
   ],
   isEditMode: false
};


export const contentReducer = (state = initialState, action) => {
   switch (action.type) {
      default:
         return state;
      //КЕЙСЫ
   }
}