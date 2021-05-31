import { useForm } from 'react-hook-form';
import style from './CreateTaskForm.module.scss';
import { Tools } from '../../../../utils/tools';

const CreateTaskForm = (props) => {

   const {
      register,
      handleSubmit,
      reset,
      formState: { errors }
   } = useForm();

   const submittingForm = data => {
      props.addTask(data.task)
      reset();
   }

   const errorHtml = `<span><p className={${style.errorMessage}}>Заполните поле</p></span>`;

   return (
      <form
         className={style.groupForm}
         onSubmit={handleSubmit(submittingForm)}>
         <div className={`input-field s5 inputDiv ${style.inputDiv}`}>
            <i className="material-icons prefix">mode_edit</i>
            <input
               {...register('task', {
                  required: true
               })
               }
               id={"task"}
               type="text"
            />
            <label htmlFor={"task"}>Новая задача</label>
            <button
               className={`${style.acceptButton} btn waves-effect waves-light`}
               type="submit">
               <i className={`material-icons left valign-wrapper ${style.acceptIcon}`}>check_circle</i>
            </button>
         </div>
         {errors.group && Tools.errorHandler(errorHtml)}
      </form>
   )
}

export default CreateTaskForm;