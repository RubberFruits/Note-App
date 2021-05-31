import style from './AcceptButton.module.scss';

const AcceptButton = (props) => {
   return (
      <button
         className={`${style.acceptButton} btn waves-effect waves-light`}
         type="submit">
         <i className={`material-icons left valign-wrapper ${style.acceptIcon}`}>check_circle</i>
      </button>
   )
}

export default AcceptButton;