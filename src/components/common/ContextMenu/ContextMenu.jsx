import { useState, useCallback, useEffect } from 'react';
import style from './ContextMenu.module.scss';

const useContextMenu = () => {
   const [xPos, setXPos] = useState("0px");
   const [yPos, setYPos] = useState("0px");
   const [showMenu, setShowMenu] = useState(false);

   const handleContextMenu = useCallback(
      (e) => {
         e.preventDefault();
         setXPos(`${e.pageX}px`);
         setYPos(`${e.pageY}px`);
         setShowMenu(true);
      },
      [setXPos, setYPos]
   );

   const handleClick = useCallback(() => {
      showMenu && setShowMenu(false);
   }, [showMenu]);

   useEffect(() => {
      document.addEventListener("click", handleClick);
      document.addEventListener("contextmenu", handleContextMenu);
      return () => {
         document.addEventListener("click", handleClick);
         document.removeEventListener("contextmenu", handleContextMenu);
      };
   });

   return { xPos, yPos, showMenu };
};

const ContextMenu = (props) => {
   const { xPos, yPos, showMenu } = useContextMenu();

   return (
      <>
         {showMenu ? (
            <div
               className={style.menuContainer}
               style={{
                  top: yPos,
                  left: xPos
               }}
            >
               <ul className={style.menu}>
                  <li>Login</li>
                  <li>Register</li>
                  <li>Open Profile</li>
               </ul>
            </div>
         ) : (<></>)
         }
      </>

   );
};

export default ContextMenu;