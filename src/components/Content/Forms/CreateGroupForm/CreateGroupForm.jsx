import { useForm } from 'react-hook-form';
import style from './CreateGroupForm.module.scss';
import { Tools } from '../../../../utils/tools';

const CreateGroupForm = (props) => {
   const {
      register,
      handleSubmit,
      reset,
      formState: { errors }
   } = useForm();

   const submittingForm = data => {
      props.addGroup(data.group);
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
               {...register('group', {
                  required: true
               })
               }
               id={"group"}
               type="text"
            />
            <label htmlFor={"group"}>Новая группа</label>
            <button type='submit' className={`${style.addGroup} waves-effect waves-light btn`}>Добавить
            <i className={`material-icons right ${style.materialIcon}`}>check</i></button>
         </div>
         {errors.group && Tools.errorHandler(errorHtml)}
      </form>
   )
}

export default CreateGroupForm;