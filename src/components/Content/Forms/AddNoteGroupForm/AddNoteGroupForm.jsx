import { useForm } from 'react-hook-form';
import style from './AddNoteGroupForm.module.scss';
import '../../../../styles/transitions/_card.scss';
import { Tools } from '../../../../utils/tools';

const AddNoteGroupForm = (props) => {

   const {
      register,
      handleSubmit,
      reset,
      formState: { errors }
   } = useForm();

   const submittingForm = data => {
      props.addNoteToGroup(data, props.groupId);
      reset();
   }

   const errorHtml = `<span><p className={${style.errorMessage}}>Заполните поле</p></span>`;

   return (

      <form
         onSubmit={handleSubmit(submittingForm)}
         className={style.formWrapper}>
         <div className={`input-field s5 inputDiv ${style.inputDiv}`}>
            <input
               {...register("header", {
                  required: true
               })
               }
               id={"header"}
               type="text"
            />
            <label htmlFor={"header"}>Название заметки</label>
         </div>
         <div className={`input-field s5 inputDiv ${style.inputDiv}`}>
            <input
               {...register("note", {
                  required: true
               })
               }
               id={"note"}
               type="text"
            />
            <label htmlFor={"note"}>Ваша заметка</label>
         </div>
         {/* <div>
            <label htmlFor="isImportant">Это важная заметка?</label>
            <input
               {...register("isImportant")}
               type="checkbox"
               placeholder="luo"
               id={"isImportant"}
            />
         </div> */}
         {errors.note && Tools.errorHandler(errorHtml)}
         <div className={style.buttonsContainer}>
            <button
               className={`btn waves-light ${style.okayBtn}`}
               type="submit">Подтвердить
               <i className="material-icons right">check_circle</i>
            </button>
            <button
               type="reset"
               className={`btn  waves-light ${style.exitBtn}`} onClick={() => props.showEditMode(props.groupId)
               }>Отмена<i className="material-icons right">clear</i></button>
         </div>
      </form >
   )
}

export default AddNoteGroupForm;