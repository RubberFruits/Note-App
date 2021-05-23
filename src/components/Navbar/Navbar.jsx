import style from './Navbar.module.scss';
import { NavLink } from 'react-router-dom';
import CreateButton from './CreateButton/CreateButton';
import { Route } from 'react-router-dom';

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
                     <i className="material-icons prefix">library_books</i><span className={style.navbar_item_span}>Все заметки</span>
                  </div>
               </NavLink>
               <NavLink
                  to="/important"
                  className={style.navbar_item}
                  activeClassName={style.navbar_item_active}
               >
                  <div className={' valign-wrapper'}>
                     <i className="material-icons prefix">priority_high</i><span className={style.navbar_item_span}>C пометкой "Важное"</span>
                  </div>
               </NavLink>
               <NavLink
                  to="/groups"
                  className={style.navbar_item}
                  activeClassName={style.navbar_item_active}
               ><div className={' valign-wrapper'}>
                     <i className="material-icons prefix">storage</i><span className={style.navbar_item_span}>Группы заметок</span>
                  </div>
               </NavLink>
               <NavLink
                  to="/tasks"
                  className={style.navbar_item}
                  activeClassName={style.navbar_item_active}
               ><div className={'valign-wrapper'}>
                     <i className="material-icons prefix">check_box</i><span className={style.navbar_item_span}>Задачи</span>
                  </div>
               </NavLink>
               <Route
                  path={["/all", "/groups", "/important", "/create"]}
                  exact
                  component={() => <CreateButton
                     header={"Добавить заметку"}
                  />}
               />
               <Route
                  path={"/tasks"}
                  exact
                  component={() => <CreateButton
                     header={"Добавить задачу"}
                  />}
               />
            </div>
         </div>
      </>
   )
}

export default Navbar;