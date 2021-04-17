import { useForm } from 'react-hook-form';

const ChangeNote = (props) => {
   return (
      <div>
         <h2>Текст заметки</h2>
         <NoteForm addNote={props.addNote} />
         <br />
         <button onClick={
            () => {
               props.toggleEditMode(false);
            }
         }>Выход</button>
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
         <textarea
            {...register("note", {
               required: true,
               maxLength: 50
            })
            }
            id={"note"}
            placeholder={"Ваша заметка"}></textarea>
         {errors.note && <p>--Заполните это поле--</p>}
         <div><button type="submit">Подтвердить</button></div>
      </form >
   )
}

export default ChangeNote;