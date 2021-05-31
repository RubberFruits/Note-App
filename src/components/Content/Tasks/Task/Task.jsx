import style from './Task.module.scss';


const Task = (props) => {
   return (
      <div
         onClick={(e) => {
            e.stopPropagation();
            props.setEditedTask(props.id)
         }}
         className={`${style.task} valign-wrapper`}>
         <p className={`${style.completeFlag} valign-wrapper`}>
            <label className="valign-wrapper">
               <input
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => {
                     props.toggleTaskCompleteStatus(props.id)
                  }}
                  type="checkbox"
                  className={"filled-in"}
                  checked={props.isChecked}
               />
               <span></span>
            </label>
         </p>
         <p className={style.task_text}>
            {
               props.isChecked
                  ? <del>{props.text.substr(0, 85)}</del>
                  : props.text.substr(0, 85)
            }
         </p>
         <i onClick={
            (e) => {
               e.stopPropagation();
               if (props.editedTask === props.id) {
                  props.setEditedTask(null)
               }
               props.delTask(props.id)
            }
         } className="material-icons">clear</i>
      </div>
   )
}

export default Task;