import style from './Navbar.module.scss';
import { NavLink } from 'react-router-dom';

const Navbar = (props) => {
   return (
      <>
         <div className={style.wrapper}>
            <div className={style.navbar}>

               <NavLink
                  to="/all"
                  className={` ${style.navbar_item}`}
                  activeClassName={style.navbar_item_active}

               ><div className={' valign-wrapper'}>
                     <i class="material-icons prefix">library_books</i> Все заметки
                  </div>
               </NavLink>
               <NavLink
                  to="/important"
                  className={style.navbar_item}
                  activeClassName={style.navbar_item_active}
               >
                  <div className={' valign-wrapper'}>
                     <i class="material-icons prefix">priority_high</i> C пометкой "Важное"
                  </div>
               </NavLink>
               <NavLink
                  to="/groups"
                  className={style.navbar_item}
                  activeClassName={style.navbar_item_active}
               ><div className={' valign-wrapper'}>
                     <i class="material-icons prefix">storage</i> Группы заметок
                  </div>
               </NavLink>
               <NavLink
                  to="/create">
                  <button type='submit' className={`${style.addGroup} waves-effect waves-light btn`}>| Добавить<i className={`material-icons left ${style.materialIcon}`}>add</i></button>
               </NavLink>
            </div>
         </div>
      </>
   )
}

export default Navbar;