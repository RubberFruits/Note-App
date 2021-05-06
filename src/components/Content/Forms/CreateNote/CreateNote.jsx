import { useForm } from 'react-hook-form';
import { useHistory } from "react-router-dom";
import style from './CreateNote.module.scss';
import { Tools } from '../../../../utils/tools';

const CreateNote = (props) => {

   return (
      <div>
         <h5>Текст заметки</h5>
         <NoteForm
            addNote={props.addNote}
         />
      </div>
   )
}


const NoteForm = (props) => {

   const history = useHistory();

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
         handleSubmit(submittingForm)}>
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
            <label htmlFor={'note'}>Ваша заметка</label>
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
         <div>
            <button
               className='btn waves-effect waves-light'
               type="submit">Подтвердить
             <i className="material-icons right">check_circle</i>
            </button>
            <button className={`btn waves-effect waves-light ${style.exitBtn}`} onClick={() => history.push('/all')}>Отмена
            <i className="material-icons right">clear</i></button>
         </div>
      </form >
   )
}

export default CreateNote;