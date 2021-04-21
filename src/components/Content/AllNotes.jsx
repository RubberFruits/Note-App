import style from './Content.module.scss';
import Notes from './Notes/Notes';

const AllNotes = (props) => {
   return (
      <>
         <div className={style.wrapper}>
            <div className={style.content}>
               {
                  props.notes.length === 0 ? <h2 className={style.sad_title}>У тебя нет заметок</h2>
                     :
                     <Notes
                        notes={props.notes}
                        delNote={props.delNote}
                     />
               }
            </div>
         </div>
      </>
   )
}

export default AllNotes;