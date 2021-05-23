import style from './Tasks.module.scss';
import RightImageTip from '../../../assets/pictures/tasks_rightSide_tip_picture.svg';
import LeftImageTip from '../../../assets/pictures/tasks_leftSide_tip_picture.svg';
import CreateTaskForm from '../Forms/CreateTaskForm/CreateTaskForm';
import Task from './Task/Task';

const Tasks = (props) => {
   return (
      <div className={style.wrapper}>
         <div className={style.left_side_container}>
            <CreateTaskForm
               addTask={props.addTask}
            />
            {
               props.tasks.length > 0
               && <div className={style.tasksWrapper}>
                  {props.tasks.map((task) => <Task key={task.id} text={task.text} />)}
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
            <div className={style.illustration_container}>
               <img className={style.illustration} src={RightImageTip} alt="rightpic" />
               <span className={style.illustration_description}>Кликните по задаче, чтобы увидеть её подробности</span>
            </div>
         </div>
      </div>
   )
}

export default Tasks