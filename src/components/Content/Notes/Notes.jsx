import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import style from './Notes.module.scss';
import './_card.scss';


const Notes = (props) => {

   return (
      <TransitionGroup
         className={style.cards_wrapper}
      >
         {props.notes.map(note => (
            <CSSTransition
               {...props}
               key={note.id}
               timeout={100}
               classNames={"fade"}
            >
               <Note
                  id={note.id}
                  text={note.text}
                  date={note.date}
                  delnote={props.delNote}
                  isImportant={note.isImportant}
               />
            </CSSTransition>
         ))}
      </TransitionGroup>
   )
}

const Note = (props) => {
   return (
      <div className={props.isImportant ? style.card_important : style.card}>
         <h2>{props.text}</h2>
         <p>{props.date}</p>
         <div
            onClick={() => {
               props.delnote(props.id);
            }}
            className={style.delete_btn}
         >X</div>
      </div >
   )
}

export default Notes;