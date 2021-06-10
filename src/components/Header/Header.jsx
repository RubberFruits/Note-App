import style from './Header.module.scss';
import { useState } from 'react';
import { useHistory } from "react-router-dom";
import Navbar from '../Navbar/Navbar';

const Header = (props) => {

   const [isMobileNavbar, setIsMobileNavbar] = useState(false);
   const history = useHistory();

   return (
      <>
         <div className={style.header}>
            <i
               onClick={() => setIsMobileNavbar(!isMobileNavbar)}
               className={`material-icons ${style.burger_menu}`}>menu</i>
            <h1
               onClick={() => history.push('/all')}
               className={style.header_head}
            >Note App</h1>
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