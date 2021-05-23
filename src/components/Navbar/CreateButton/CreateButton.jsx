import style from './CreateButton.module.scss';
import { NavLink } from 'react-router-dom';

const CreateButton = (props) => {
   return (
      <NavLink
         to='/create'
      >
         <button
            onContextMenu={() => console.log(props)}
            type='submit'
            className={`${style.addGroup} waves-effect waves-light btn`}
         > {props.header}</button >
      </NavLink>
   )
}

export default CreateButton;