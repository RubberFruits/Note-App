import style from './Navbar.module.scss';
import AddNoteButton from './AddNoteButton/AddNoteButton';
import { NavLink } from 'react-router-dom';

const Navbar = (props) => {
   return (
      <>
         <div className={style.wrapper}>
            <div className={style.navbar}>
               <NavLink
                  to="/all"
                  className={style.navbar_item}
                  activeClassName={style.navbar_item_active}
               >Все заметки</NavLink>
               <NavLink
                  to="/important"
                  className={style.navbar_item}
                  activeClassName={style.navbar_item_active}
               >C пометкой "Важное"
               </NavLink>
               <NavLink
                  to="/edit">
                  <AddNoteButton
                     toggleEditMode={props.toggleEditMode}
                  />
               </NavLink>
            </div>
         </div>
      </>
   )
}

export default Navbar;