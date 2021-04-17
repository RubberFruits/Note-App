export const dateGetter = () => {
   let d = new Date().getDate();
   if (d < 10) d = '0' + d;

   let m = new Date().getMonth() + 1;
   if (m < 10) m = '0' + m;

   let y = new Date().getFullYear() % 100;
   if (y < 10) y = '0' + y;

   return d + '.' + m + '.' + y;
}