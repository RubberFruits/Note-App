import style from './Task.module.scss';

const Task = (props) => {
   return (
      <div className={`${style.task} valign-wrapper`}>
         <p className={`${style.completeFlag} valign-wrapper`}>
            <label>
               <input
                  type="checkbox"
                  className={"filled-in"}
                  onClick={(e) => e.stopPropagation()}
               />
               <span></span>
            </label>
         </p>
         <p className={style.task_text}>${props.text}</p>
      </div>
   )
}

export default Task;