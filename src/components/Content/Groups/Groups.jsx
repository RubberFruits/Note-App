import style from './Groups.module.scss';
import { useState } from 'react';
import AddNoteGroupForm from '../Forms/AddNoteGroupForm/AddNoteGroupForm';
import GroupNote from './GroupNote/GroupNote';
import GroupHead from './GroupHead/GroupHead';
import CreateGroupForm from '../Forms/CreateGroupForm/CreateGroupForm';
import '../../../styles/transitions/_formGroup.scss';
import { CSSTransition, TransitionGroup } from 'react-transition-group';


const Groups = (props) => {

   const [showingGroupId, setShowingGroupId] = useState([]);
   const [isEditMode, setIsEditMode] = useState([]);


   const showEditMode = (groupId) => {
      if (isEditMode.includes(groupId)) {
         return setIsEditMode(isEditMode.filter(item => item !== groupId));
      }
      setIsEditMode([groupId]);
   }

   const showGroupNotes = (groupId) => {
      if (showingGroupId.includes(groupId)) {
         return setShowingGroupId(showingGroupId.filter(item => item !== groupId));
      }
      setShowingGroupId([groupId]);
   }

   return (
      <div className={style.containerGroup}>
         <CreateGroupForm
            addGroup={props.addGroup}
         />
         {
            !props.groups.length ? <h4>Групп нет</h4>
               :
               props.groups.map(group => (
                  <div
                     key={group.id}
                  >
                     <GroupHead
                        key={group.id}
                        showGroupNotes={showGroupNotes}
                        showEditMode={showEditMode}
                        delGroup={props.delGroup}
                        groupId={group.id}
                        groupName={group.groupName}
                        countNotes={group.groupNotes.length}
                     />

                     {/*  Форма добавления ноты */}

                     <TransitionGroup>
                        {isEditMode.includes(group.id)
                           ?
                           <CSSTransition
                              timeout={400}
                              classNames="form"
                           >
                              <div className={style.addGroupContainer}>
                                 <AddNoteGroupForm
                                    addNoteToGroup={props.addNoteToGroup}
                                    groupId={group.id}
                                    showEditMode={showEditMode}
                                 />
                              </div>
                           </CSSTransition>
                           : null}
                     </TransitionGroup>

                     {/* Показ нот  */}

                     <TransitionGroup
                        className={style.cards_wrapper}
                     >
                        {showingGroupId.includes(group.id)
                           ?
                           group.groupNotes.map(note => (
                              <CSSTransition
                                 timeout={400}
                                 classNames="card"
                                 key={note.id}
                              >
                                 <GroupNote
                                    key={note.id}
                                    groupId={group.id}
                                    noteId={note.id}
                                    header={note.header}
                                    text={note.text}
                                    delNoteFromGroup={props.delNoteFromGroup}
                                 />
                              </CSSTransition>
                           )) : ''
                        }
                     </TransitionGroup>
                  </div>
               ))
         }
      </div >
   )
}


export default Groups;