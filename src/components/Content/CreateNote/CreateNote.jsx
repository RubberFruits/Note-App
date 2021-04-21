import { useForm } from 'react-hook-form';
import { useHistory } from "react-router-dom";

const CreateNote = (props) => {

   const history = useHistory();

   const onExit = () => {
      history.push('/all');
   }

   return (
      <div>
         <h2>Текст заметки</h2>
         <NoteForm
            addNote={props.addNote}
         />
         <div><button onClick={onExit}>Выход</button></div>
      </div >
   )
}

const NoteForm = (props) => {

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
         <input
            {...register("note", {
               required: true
            })
            }
            id={"note"}
            placeholder={"Ваша заметка"} />
         <div>
            <label htmlFor="isImportant">Это важная заметка?</label>
            <input
               {...register("isImportant")}
               type="checkbox"
               placeholder="luo"
               id={"isImportant"}
            />
         </div>
         {errors.note && <p>--Заполните это поле--</p>}
         <div><button type="submit">Подтвердить</button></div>
      </form >
   )
}

export default CreateNote;