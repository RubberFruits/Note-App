import style from './GroupNote.module.scss';
import { CSSTransition } from 'react-transition-group';
import Modal from '../../../common/Modals/NoteModal/NoteModal.jsx';
import { useState } from 'react';

const GroupNote = (props) => {

   const [isModal, setIsModal] = useState(false);

   const showModal = (props) => {
      setIsModal(true);
   }

   return (
      <>
         <div
            onClick={() => showModal(props)}
            className={`z-depth-2 ${style.card}`}>
            <h4 className={style.noteHeader}>{props.header}</h4>
            <p className={style.noteText}>{props.text.length < 30 ? props.text : props.text.substr(0, 30) + '...'}</p>
            <div
               onClick={(e) => {
                  e.stopPropagation();
                  props.delNoteFromGroup(props.groupId, props.noteId);
               }}
               className={style.delete_btn}
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
               header={props.header}
               groupText={props.text}
               isImportant={props.isImportant}
               id={props.id}
            />
         </CSSTransition>
      </>
   )
}



export default GroupNote;