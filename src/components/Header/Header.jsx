import style from './Header.module.scss';
import { useHistory } from "react-router-dom";

const Header = (props) => {

   const history = useHistory();

   return (
      <div className={style.header}>
         <h1
            onClick={() => history.push('/all')}
            className={style.header_head}>Note App</h1>
      </div>
   )
}

export default Header;