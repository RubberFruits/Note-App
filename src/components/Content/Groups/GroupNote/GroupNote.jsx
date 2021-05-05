import style from './GroupNote.module.scss';

const GroupNote = (props) => {
   return (
      <div className={`z-depth-2 ${style.card}`}>
         <h4 className={style.noteHeader}>{props.header}</h4>
         <p className={style.noteText}>{props.text.length < 30 ? props.text : props.text.substr(0, 30) + '...'}</p>
         <div
            onClick={() => {
               props.delNoteFromGroup(props.groupId, props.noteId)
            }}
            className={style.delete_btn}
         >X</div>
      </div >
   )
}

/* <div className={style.note}>
         <h4>{props.header}</h4>
         <p>{props.text}</p>
      </div> */


export default GroupNote;