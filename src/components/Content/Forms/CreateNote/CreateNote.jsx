import { useForm } from 'react-hook-form';
import style from './CreateNote.module.scss';
import { Tools } from '../../../../utils/tools';

const CreateNote = (props) => {

   const errorHtml = `<span><p className={${style.errorMessage}}>Заполните поле</p></span>`;

   const {
      register,
      handleSubmit,
      reset,
      formState: { errors }
   } = useForm();

   const submittingForm = data => {
      props.addNote(data);
      reset();
   }

   return (
      <form onSubmit={
         handleSubmit(submittingForm)}
         className={style.formWrapper}>
         <div className={`input-field ${style.inputClass}`}>
            <i className="material-icons prefix">mode_edit</i>
            <input
               {...register("note", {
                  required: true
               })
               }
               id="note"
               type='text'
            />
            <label className={style.input_label} htmlFor={'note'}>Новая заметка</label>
         </div>
         <div>
            <p>
               <label>
                  <input
                     type="checkbox"
                     className="filled-in"
                     {...register("isImportant")}
                  />
                  <span>Это важная заметка?</span>
               </label>
            </p>
         </div>
         {errors.note && Tools.errorHandler(errorHtml)}
         <button
            className={`${style.acceptButton} btn  waves-light`}
            type="submit">
            <i className={`material-icons left valign-wrapper ${style.acceptIcon}`}>check_circle</i>
         </button>
      </form>
   )
}

export default CreateNote;