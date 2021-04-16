import style from './Content.module.css';

const Content = (props) => {
   return (
      <>
         <div className={style.wrapper}>
            <div className={style.content}>
               <h2 className={style.sad_title}>У тебя нет заметок</h2>
               {/* Компонента, рендерящая заметки */}
            </div>
         </div>
      </>
   )
}

export default Content;