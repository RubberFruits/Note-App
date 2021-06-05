import style from './Navbar.module.scss';
import { NavLink } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { BsArrowReturnRight } from "react-icons/bs";

const Navbar = (props) => {

   return (
      <>
         <div className={`${style.wrapper} `}>
            <div className={`${document.body.clientWidth >= 768 ? style.navbar : ''} 
            ${style.mobile_wrapper_offline} 
   ${props.flagForMobileNavbar ? style.mobile_wrapper_online : ''}`}>
               <NavLink
                  to="/all"
                  className={` ${style.navbar_item}`}
                  activeClassName={style.navbar_item_active}
               ><div className={' valign-wrapper'}>
                     <i className="material-icons prefix">library_books</i><span className={style.navbar_item_span}>Заметки</span>
                  </div>
               </NavLink>
               <Route
                  path={["/all", "/important"]}
                  exact
                  component={() =>
                     <NavLink
                        to="/important"
                        className={style.navbar_item_small}
                        activeClassName={style.navbar_item_active}
                     >
                        <BsArrowReturnRight className={style.navbarContext_icon} />
                        <div className={' valign-wrapper'}>
                           <span className={style.navbar_item_span}>C пометкой "Важное"</span><i className={`material-icons prefix ${style.navbar_item_icon}`}>priority_high</i>
                        </div>
                     </NavLink>
                  }
               />
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
            </div>
         </div>

      </>
   )
}

export default Navbar;