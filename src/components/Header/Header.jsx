import style from './Header.module.scss';

const Header = (props) => {
   return (
      <>
         <div className={style.header}>
            <h1 className={style.header_head}>Note App</h1>
         </div>
      </>
   )
}

export default Header;