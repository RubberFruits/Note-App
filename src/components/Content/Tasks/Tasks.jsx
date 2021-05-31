import style from './Tasks.module.scss';
import RightImageTip from '../../../assets/pictures/tasks_rightSide_tip_picture.svg';
import LeftImageTip from '../../../assets/pictures/tasks_leftSide_tip_picture.svg';
import CreateTaskForm from '../Forms/CreateTaskForm/CreateTaskForm';
import Task from './Task/Task';

const Tasks = (props) => {
   const handleTextarea = (event) => {
      if (event.key === 'Enter') {
         event.preventDefault();
         props.setEditedTask(null);
      }
   }

   return (
      <div className={style.wrapper}>
         <div className={style.left_side_container}>
            <CreateTaskForm
               addTask={props.addTask}
            />
            {
               props.tasks.length > 0
               && <div className={style.tasksWrapper}>
                  {
                     props.tasks.filter(task => task.isCompleted === false).map((task) => (
                        <Task
                           key={task.id}
                           id={task.id}
                           text={task.text}
                           delTask={props.delTask}
                           isChecked={false}
                           editedTask={props.editedTask}
                           setEditedTask={props.setEditedTask}
                           toggleTaskCompleteStatus={props.toggleTaskCompleteStatus}
                        />))
                  }
               </div>
            }
            {
               props.tasks.length > 0
               && props.completedTasks > 0
               && <div className={style.tasksWrapper}>
                  <span className={style.completedTasks}>Выполненные задачи:</span>
                  {props.tasks.filter(task => task.isCompleted === true).map((task) => (
                     <Task
                        key={task.id}
                        id={task.id}
                        text={task.text}
                        delTask={props.delTask}
                        isChecked={true}
                        editedTask={props.editedTask}
                        setEditedTask={props.setEditedTask}
                        toggleTaskCompleteStatus={props.toggleTaskCompleteStatus}
                     />))}
               </div>
            }
            {
               props.tasks.length < 1
               && <div className={style.illustration_container}>
                  <img className={style.illustration} src={LeftImageTip} alt="leftpic" />
                  <span
                     className={style.illustration_description}
                     style={{ marginTop: '25px' }}
                  >Все задачи выполнены! Создайте новую задачу</span>
               </div>
            }
         </div>
         <div className={style.right_side_container}>
            {
               props.editedTask === null
               &&
               <div className={style.illustration_container}>
                  <img className={style.illustration} src={RightImageTip} alt="rightpic" />
                  <span className={style.illustration_description}>Кликните по задаче, чтобы увидеть её подробности</span>
               </div>
            }
            {
               props.editedTask !== null
               && <div className={style.editWindow}>
                  {props.tasks.filter(task => task.id === props.editedTask).map(task => (
                     <textarea
                        key={task.id}
                        onChange={(e) => props.changeTask(task.id, e.target.value)}
                        onKeyPress={(e) => handleTextarea(e)}
                        defaultValue={task.text}
                        className={`materialize-textarea ${style.editTextarea}`}
                        autoFocus
                     ></textarea>
                  ))}
               </div>
            }
         </div>
      </div>
   )
}

export default Tasks