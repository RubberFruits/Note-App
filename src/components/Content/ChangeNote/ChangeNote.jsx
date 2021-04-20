import { useForm } from 'react-hook-form';

const ChangeNote = (props) => {
   return (
      <div>
         <h2>Текст заметки</h2>
         <NoteForm
            addNote={props.addNote}
            toggleEditMode={props.toggleEditMode}
         />
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
      props.toggleEditMode(false);
   }

   return (
      <form onSubmit={
         handleSubmit(submittingForm)}>
         <textarea
            {...register("note", {
               required: true
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