import React, { useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Modal from '../../common/Modals/NoteModal/NoteModal.jsx';
import style from './Notes.module.scss';
import '../../../styles/transitions/_card.scss';
import CreateNote from '../Forms/CreateNote/CreateNote.jsx';
import LeftImageTip from '../../../assets/pictures/tasks_leftSide_tip_picture.svg';


const Notes = (props) => {

   const [isTransition, setIsTransition] = useState(false)

   return (
      <>
         <CreateNote addNote={props.addNote} />
         <nav className={`${style.breadcrumbContainer} valign-wrapper`}>
            <span className={style.breadCrumb_span}> Отображение: </span>
            <button
               onClick={(e) => {
                  e.stopPropagation();
                  props.changeNotesView('cards')
               }}
               className={`btn-flat  ${style.breadcrumb_item} ${props.notesView === 'cards'
                  ? style.breadcrumb_item_active
                  : ''}`}
            >Карточки</button>
            <span> / </span>
            <button
               onClick={(e) => {
                  e.stopPropagation();
                  props.changeNotesView('list')
               }}
               className={`btn-flat ${style.breadcrumb_item} ${props.notesView === 'list'
                  ? style.breadcrumb_item_active
                  : ''}`}
            >Список</button>
         </nav>



         {
            props.notes.length === 0
               ? <div className={style.illustrationContainer}>
                  <img className={style.illustration} src={LeftImageTip} alt="leftpic" />
                  <span className={style.illustation_description}>Заметок нет! Добавьте новую прямо сейчас</span>
               </div>
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

   const [isModal, setIsModal] = useState(false);

   const showModal = (props) => {
      setIsModal(true);
   }

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
      <>
         <div
            onClick={() => showModal(props)}
            className={`valign-wrapper ${noteClass}`}>
            <h4 className={props.noteView === 'cards' ? style.noteText : style.noteTextList}
            >{renderSwitch(props.noteView)}</h4>
            <p className={props.noteView === 'cards' ? style.noteDate : style.noteDateList}>{props.date}</p>
            <div
               onClick={(e) => {
                  e.stopPropagation();
                  props.setIsTransition(true);
                  props.delnote(props.id);
               }}
               className={props.noteView === 'cards' ? style.delete_btn : style.delete_btn_list}
            >X</div>
         </div >
         <CSSTransition
            {...props}
            in={isModal}
            key={props.id}
            timeout={500}
            classNames="modal_trans"
         >
            <Modal
               setIsModal={setIsModal}
               isModal={isModal}
               text={props.text}
               date={props.date}
               isImportant={props.isImportant}
               id={props.id}
            />
         </CSSTransition>
      </>
   )
}

export default Notes;