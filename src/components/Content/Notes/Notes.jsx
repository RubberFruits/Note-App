import style from './Notes.module.scss';

const Notes = (props) => {

   const notesArray = props.notes.map(note => (
      <Note
         id={note.id}
         text={note.text}
         date={note.date}
      />
   ))

   return (
      <div>
         {
            notesArray
         }
      </div>
   )
}

const Note = (props) => {
   return (
      <div>
         <h2>{props.text}</h2>
         <p>{props.date}</p>
      </div>
   )
}

export default Notes;