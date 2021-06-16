import style from './Header.module.scss';
import { useState } from 'react';
import { useHistory } from "react-router-dom";
import Navbar from '../Navbar/Navbar';
import { FirebaseMethods } from '../../API/firebase';
import { Tools } from '../../utils/tools';

const Header = (props) => {

   const [isMobileNavbar, setIsMobileNavbar] = useState(false);
   const history = useHistory();

   const handleLogOut = async () => {
      try {
         props.setUserInState(null, false)
         await FirebaseMethods.logOut();
         console.log(props.isAuthenticated)
         history.push('/login')
      } catch {
         Tools.errorHandler('Ошибка при выходе из аккаунта')
      }
   }

   return (
      <>
         <div className={style.header}>
            <i
               onClick={() => setIsMobileNavbar(!isMobileNavbar)}
               className={`material-icons ${style.burger_menu}`}>menu</i>
            <h1
               onClick={() => history.push('/all')}
               className={style.header_head}
            >
               Note App
            </h1>
            <div className={style.user_container}>
               <p className={style.user_email}>{props.userEmail === undefined ? 'undefined' : props.userEmail}</p>
               <button className={`${style.logout_btn} btn`} onClick={() => handleLogOut()}>Выйти</button>
            </div>
         </div>
         {
            document.body.clientWidth <= 768
            && <div className={style.mobileNavbar}>
               <Navbar flagForMobileNavbar={isMobileNavbar} />
            </div>
         }
      </>
   )
}

export default Header;