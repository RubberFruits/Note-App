export const Tools = {

   dateGetter() {
      let d = new Date().getDate();
      if (d < 10) d = '0' + d;

      let m = new Date().getMonth() + 1;
      if (m < 10) m = '0' + m;

      let y = new Date().getFullYear() % 100;
      if (y < 10) y = '0' + y;

      return d + '.' + m + '.' + y;
   },

   addNoteToLocalStore(note) {

      const all = JSON.parse(localStorage.getItem('notes') || '[]'); //GET NOTES FROM LOCAL
      all.push(note);
      localStorage.setItem('notes', JSON.stringify(all));
   },
   delNoteFromLocalStorage(noteId) {
      let parsingLocalStorage = JSON.parse(localStorage.getItem('notes'));
      let localStorWithoutDeletedNote = parsingLocalStorage
         .filter(item => item.id !== noteId);
      if (localStorWithoutDeletedNote.length !== 0) {
         localStorage.setItem('notes', JSON.stringify(localStorWithoutDeletedNote));
         return;
      }
      localStorage.clear();
   },


   getNotesFromLocalStore() {
      return JSON.parse(localStorage.getItem('notes') || '[]');
   }
}