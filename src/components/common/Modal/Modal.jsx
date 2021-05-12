import style from './Modal.module.scss';
import '../../../styles/transitions/_card.scss';

const Modal = (props) => {

   function closeModal(e) {
      e.stopPropagation()
      props.setIsModal(false)
   }

   return (
      <div
         className={props.isModal ? style.modality : style.noModal}
         onClick={closeModal}
      >
         <div
            onClick={e => e.stopPropagation()}
            className={props.isImportant ? style.important : style.modal_content}
         >
            <h4 className={style.modal_text}>{props.text}</h4>
            <span
               onClick={closeModal}
               className={style.close}
            >&times;</span>
            <h4 className={style.modal_date}>{props.date}</h4>
         </div>
      </div>
   )
}

export default Modal;