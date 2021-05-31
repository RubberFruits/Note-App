import { useForm } from 'react-hook-form';
import style from './CreateGroupForm.module.scss';
import { Tools } from '../../../../utils/tools';
import AcceptButton from '../../../common/Buttons/AcceptButton/AcceptButton';

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
         <div className={`input-field s5 inputDiv ${style.inputContainer}`}>
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
            <div className={style.acceptButtonContainer}>
               <AcceptButton />
            </div>
         </div>
         {errors.group && Tools.errorHandler(errorHtml)}
      </form>
   )
}

export default CreateGroupForm;