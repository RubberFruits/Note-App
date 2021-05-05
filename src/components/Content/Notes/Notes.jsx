import React, { useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import style from './Notes.module.scss';
import '../../../styles/transitions/_card.scss';


const Notes = (props) => {

   const [isTransition, setIsTransition] = useState(false);

   return (
      <>
         <nav className={`${style.breadcrumbContainer} valign-wrapper`}>
            <span> Отображение: </span>
            <button
               onClick={() => props.changeNotesView('cards')}
               className={`waves-effect waves-teal btn-flat ${style.breadcrumb_item} ${props.notesView === 'cards' ? style.breadcrumb_item_active : ''}`}
            >Карточки</button>
            <span> / </span>
            <button
               onClick={() => props.changeNotesView('list')}
               className={`waves-effect waves-teal btn-flat ${style.breadcrumb_item} ${props.notesView === 'list' ? style.breadcrumb_item_active : ''}`}
            >Список</button>
         </nav>

         {
            props.notes.length === 0 ? <h2 className={style.sad_title}>Нет заметок</h2>
               : (
                  <div className={style.wrapper}>
                     <div className={style.content}>
                        <TransitionGroup
                           className={props.notesView === 'list'
                              ? style.list_wrapper
                              : style.cards_wrapper
                           }
                        >
                           {props.notes.map(note => (
                              <CSSTransition
                                 {...props}
                                 in={isTransition}
                                 unmountOnExit
                                 key={note.id}
                                 timeout={300}
                                 classNames={"fade"}
                              >
                                 <Note
                                    id={note.id}
                                    text={note.text}
                                    date={note.date}
                                    delnote={props.delNote}
                                    isImportant={note.isImportant}
                                    setIsTransition={setIsTransition}
                                    noteView={props.notesView}
                                 />
                              </CSSTransition>
                           ))}
                        </TransitionGroup>
                     </div>
                  </div >
               )
         }
      </>
   )
}

const Note = (props) => {

   let noteClass = props.noteView === 'list'
      ? `${style.list_item} ${props.isImportant ? style.important_note : ''}`
      : `${style.card} ${props.isImportant ? style.important_note : ''}`;

   const renderSwitch = (prop) => {
      switch (prop) {
         default:
            return props.text
         case 'cards':
            if (props.text.length < 50) {
               return props.text
            }
            return props.text.substr(0, 50) + '...'
         case 'list':
            if (props.text.length < 30) {
               return props.text
            }
            return props.text.substr(0, 30) + '...'
      }
   }

   return (
      <div className={`${noteClass} z-depth-2`}>
         <h4 className={props.noteView === 'cards' ? style.noteText : style.noteTextList}
         >{renderSwitch(props.noteView)}</h4>
         <p className={props.noteView === 'cards' ? style.noteDate : style.noteDateList}>{props.date}</p>
         <div
            onClick={() => {
               props.setIsTransition(true);
               props.delnote(props.id);
            }}
            className={props.noteView === 'cards' ? style.delete_btn : style.delete_btn_list}
         >X</div>
      </div >
   )
}

export default Notes;