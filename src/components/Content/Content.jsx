import ChangeNote from './ChangeNote/ChangeNote';
import style from './Content.module.scss';
import Notes from './Notes/Notes';

const Content = (props) => {
   return (
      <>
         <div className={style.wrapper}>
            <div className={style.content}>

               {
                  props.isEditMode ?
                     <ChangeNote
                        toggleEditMode={props.toggleEditMode}
                        addNote={props.addNote} />
                     : props.notes.length === 0 ? <h2 className={style.sad_title}>У тебя нет заметок</h2>
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

export default Content;