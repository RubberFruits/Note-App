import style from './GroupHead.module.scss';

const GroupHead = (props) => {

   return (
      <>
         <div
            onClick={() => props.showGroupNotes(props.groupId)}
            className={`${style.group} z-depth-2`}
         ><h4 className={style.groupText}>{props.groupName}</h4><br /><p className={style.group_length}>| Заметок: {props.countNotes} </p>
            <button
               onClick={(e) => {
                  e.stopPropagation();
                  props.delGroup(props.groupId);
               }}
               className={`btn-floating waves-light btn-tiny ${style.delGroupButton}`}>
               X
            </button>
            <button
               onClick={(e) => {
                  e.stopPropagation();
                  props.showEditMode(props.groupId);
               }}
               className={`btn-floating waves-light btn-middle ${style.addNoteToGroup}`}>
               +
            </button>
         </div>
      </>
   )
}

export default GroupHead;