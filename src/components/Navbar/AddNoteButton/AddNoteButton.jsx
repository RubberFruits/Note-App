const AddNoteButton = (props) => {

   const onEditMode = () => {
      props.toggleEditMode(true);
   }

   return (
      <>
         <div>
            <button onClick={onEditMode}> + | Добавить заметку  </button >
         </div>
      </>
   )
}

export default AddNoteButton;