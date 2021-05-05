import M from 'materialize-css';

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

   errorHandler(errorHtml) {
      M.toast({ html: errorHtml, classes: 'rounded pulse red accent-2' })
   },

   addToLocalStore(whatAdd, whereAdd) {

      const all = JSON.parse(localStorage.getItem(whereAdd) || '[]');
      all.push(whatAdd);
      localStorage.setItem(whereAdd, JSON.stringify(all));
   },

   addToLocalStoreSetting(whatAdd, whereAdd) {
      localStorage.setItem(whereAdd, whatAdd);
   },

   delFromLocalStorage(whereDel, whatDel) {
      let parsingLocalStorage = JSON.parse(localStorage.getItem(whereDel));
      let localStorWithoutDeletedNote = parsingLocalStorage
         .filter(item => item.id !== whatDel);
      if (localStorWithoutDeletedNote.length !== 0) {
         localStorage.setItem(whereDel, JSON.stringify(localStorWithoutDeletedNote));
         return;
      }
      localStorage.clear();
   },

   getFromLocalStore(whatGet) {
      if (whatGet === 'notesView') {
         return JSON.parse(localStorage.getItem(whatGet));
      }
      return JSON.parse(localStorage.getItem(whatGet) || '[]');
   }
}