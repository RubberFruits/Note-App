import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import style from './Notes.module.scss';
import './_card.scss';


const Notes = (props) => {

   const notesArray = props.notes.map(note => (
      <Note
         key={note.id}
         id={note.id}
         text={note.text}
         date={note.date}
         delnote={props.delNote}
      />
   ))

   return (
      <TransitionGroup
         className={style.cards_wrapper}
      >
         {
            notesArray
         }
      </TransitionGroup>
   )
}

const Note = (props) => {
   return (
      <CSSTransition
         {...props}
         timeout={400}
         classNames={"fade"}
      >
         <div className={style.card}>
            <h2>{props.text}</h2>
            <p>{props.date}</p>
            <div
               onClick={() => {
                  props.delnote(props.id);
               }}
               className={style.delete_btn}
            >X</div>
         </div >
      </CSSTransition >
   )
}

export default Notes;