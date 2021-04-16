import style from './Navbar.module.css';
import AddNoteButton from './AddNoteButton/AddNoteButton';

const Navbar = (props) => {
   return (
      <>

         <div className={style.wrapper}>
            <div className={style.navbar}>
               <h2 className={style.navbar_header}>Твои заметки</h2>
               {/* Компонента, рендерящая заметки */}
               <AddNoteButton />
            </div>
         </div>
      </>
   )
}

export default Navbar;