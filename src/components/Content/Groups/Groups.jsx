import style from './Groups.module.scss';
import { useState } from 'react';
import AddNoteGroupForm from '../Forms/AddNoteGroupForm/AddNoteGroupForm';
import GroupNote from './GroupNote/GroupNote';
import GroupHead from './GroupHead/GroupHead';
import CreateGroupForm from '../Forms/CreateGroupForm/CreateGroupForm';
import '../../../styles/transitions/_formGroup.scss';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import { FaRegCopy, FaList, FaEllipsisV, FaShareAlt } from 'react-icons/fa';
import { RiSendPlaneFill, RiDeleteBin6Line } from 'react-icons/ri';
import '../../../styles/contextMenu.scss'

const Groups = (props) => {

   const handleContextMenu = (e, data, target) => {
      switch (data.action) {
         default:
            return
         case 'console':
            console.log(target.getAttribute('groupid'));
      }
   }

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
                     <ContextMenuTrigger
                        id="contextmenu"
                        attributes={{ groupid: group.id }}
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
                     </ContextMenuTrigger>

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
                                 timeout={300}
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
         <ContextMenu
            id="contextmenu"
         >
            <MenuItem
               onClick={handleContextMenu}
               data={{ action: 'console' }}
            >
               <FaRegCopy className="copy" />
               <span>Напиши своё айди</span>
            </MenuItem>
            <MenuItem
               onClick={handleContextMenu}
            >
               <FaEllipsisV className="openwith" />
               <span>Open with</span>
            </MenuItem>
            <MenuItem
               onClick={handleContextMenu}
            >
               <FaList className="watchlist" />
               <span>Add to watchlist</span>
            </MenuItem>
            <MenuItem
               onClick={handleContextMenu}
            >
               <RiSendPlaneFill className="send" />
               <span>Send</span>
            </MenuItem>
            <MenuItem
               onClick={handleContextMenu}
            >
               <RiDeleteBin6Line className="delete" />
               <span>Delete</span>
            </MenuItem>
            <MenuItem
               onClick={handleContextMenu}
            >
               <FaShareAlt className="share" />
               <span>Share</span>
            </MenuItem>
         </ContextMenu>
      </div >
   )
}


export default Groups;