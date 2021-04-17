import style from './Navbar.module.scss';
import AddNoteButton from './AddNoteButton/AddNoteButton';

const Navbar = (props) => {
   return (
      <>
         <div className={style.wrapper}>
            <div className={style.navbar}>
               <h2 className={style.navbar_header}>Все заметки</h2>
               <p>C пометкой "Важное"</p>
               <AddNoteButton
                  toggleEditMode={props.toggleEditMode}
               />
            </div>
         </div>
      </>
   )
}

export default Navbar;