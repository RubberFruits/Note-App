//react + components
import React from 'react';
import { useState } from 'react';
import AddNoteGroupForm from '../Forms/AddNoteGroupForm/AddNoteGroupForm';
import GroupNote from './GroupNote/GroupNote';
import GroupHead from './GroupHead/GroupHead';
import CreateGroupForm from '../Forms/CreateGroupForm/CreateGroupForm';
//libraries
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { ContextMenu, MenuItem, ContextMenuTrigger, SubMenu } from "react-contextmenu";
import { RiDropFill, RiQuillPenFill, RiPlayFill } from "react-icons/ri";
import { RiDeleteBin6Line } from 'react-icons/ri';
import { TwitterPicker } from 'react-color';
//styles
import style from './Groups.module.scss';
import '../../../styles/contextMenu.scss';
import '../../../styles/transitions/_formGroup.scss';

const Groups = (props) => {

   const handleContextMenu = (e, data, target) => {
      switch (data.action) {
         default:
            return
         case 'rename':
            const groupName = target.getAttribute('groupname');
            const groupId = target.getAttribute('groupid');
            let res = prompt('Введите новое название группы:', groupName);
            if (res === null || res === "") {
               break;
            }
            props.renameGroup(groupId, res);
            break;
         case 'changeColor':
            console.log('hi');
      }
   }

   const [showingGroupId, setShowingGroupId] = useState([]);
   const [isEditMode, setIsEditMode] = useState([]);
   const [activeContextId, setActiveContextId] = useState('');

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

   const contextMenuId = (groupId) => {
      return setActiveContextId(groupId);
   }

   const handleChangeComplete = (color, event) => {
      props.changeColor(activeContextId, color.hex);
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
                        attributes={{
                           groupid: group.id,
                           groupname: group.groupName
                        }}
                     >
                        <GroupHead
                           key={group.id}
                           showGroupNotes={showGroupNotes}
                           showEditMode={showEditMode}
                           delGroup={props.delGroup}
                           groupId={group.id}
                           groupName={group.groupName}
                           groupColor={group.backgroundColor}
                           countNotes={group.groupNotes.length}
                           contextMenuId={contextMenuId}
                        />

                     </ContextMenuTrigger>

                     {/*  Форма добавления ноты */}

                     <TransitionGroup  >
                        {
                           isEditMode.includes(group.id)
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
                              : null
                        }
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
                  </div >
               ))
         }
         <ContextMenu
            id="contextmenu"
            hideOnLeave
         >
            <MenuItem
               onClick={handleContextMenu}
               data={{ action: 'rename' }}
            >
               <RiQuillPenFill className="rename" />
               <span>Переименовать группу</span>
            </MenuItem>
            <RiDropFill className="paintIcon" />
            <RiPlayFill className="arrowIcon" />
            <SubMenu
               id="submenu"
               title="Изменить цвет группы"
               className={'submenuClass'}
            >
               <TwitterPicker
                  colors={['#D9E3F0', '#F47373', '#697689', '#2CCCE4', '#dce775', '#ff8a65', '#ba68c8', '#5f9ea0']}
                  triangle={'hide'}
                  onChangeComplete={handleChangeComplete}
               />
            </SubMenu>
            <MenuItem onClick={handleContextMenu}>
               <RiDeleteBin6Line className="delete" />
               <span>Удалить</span>
            </MenuItem>
         </ContextMenu>
      </div >

   )
}

export default Groups;