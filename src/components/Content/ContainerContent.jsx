import { connect } from 'react-redux';
import React from 'react';
import Notes from './Notes/Notes';
import {
   addNote, getFromLocalStore,
   delNote, addGroup,
   addNoteToGroup, delGroup,
   changeNotesView, delNoteFromGroup,
   renameGroup, changeColor
} from '../../redux/reducers/contentReducer';
import {
   addTask, getTasks,
   toggleTaskCompleteStatus, delTask,
   setEditedTask, changeTask
} from '../../redux/reducers/tasksReducer';
import { Route } from 'react-router-dom';
import '../../styles/_wrapper.scss';
import '../../styles/transitions/_formGroup.scss'
import Groups from './Groups/Groups';
import Tasks from './Tasks/Tasks';

class ContainerContent extends React.Component {
   componentDidMount() {
      this.props.getFromLocalStore();
      this.props.getTasks();
   }

   render() {
      return (
         <div className={'wrapper'}>
            <Route
               path='/all'
               exact
               render={() => (
                  <Notes
                     notes={this.props.notes}
                     notesView={this.props.notesView}
                     addNote={this.props.addNote}
                     delNote={this.props.delNote}
                     changeNotesView={this.props.changeNotesView}
                  />
               )}
            />
            <Route
               path='/important'
               exact
               render={() => (
                  <Notes
                     /*  передача important как notes, чтобы не было конфликта на проверке наличия записей */
                     notes={this.props.importantNotes}
                     notesView={this.props.notesView}
                     addNote={this.props.addNote}
                     delNote={this.props.delNote}
                     changeNotesView={this.props.changeNotesView}
                  />
               )}
            />
            <Route
               path='/groups'
               exact
               render={() => (
                  <Groups
                     groups={this.props.groups}
                     addGroup={this.props.addGroup}
                     addNoteToGroup={this.props.addNoteToGroup}
                     delGroup={this.props.delGroup}
                     delNoteFromGroup={this.props.delNoteFromGroup}
                     renameGroup={this.props.renameGroup}
                     changeColor={this.props.changeColor}
                  />
               )}
            />
            <Route
               path='/tasks'
               exact
               render={() => <Tasks
                  tasks={this.props.tasks}
                  completedTasks={this.props.completedTasks}
                  editedTask={this.props.editedTask}
                  addTask={this.props.addTask}
                  delTask={this.props.delTask}
                  changeTask={this.props.changeTask}
                  toggleTaskCompleteStatus={this.props.toggleTaskCompleteStatus}
                  setEditedTask={this.props.setEditedTask}
               />
               }
            />
         </div>
      )
   }
}

const mapStateToProps = (state) => (
   {
      notes: state.content.notes,
      importantNotes: state.content.importantNotes,
      groups: state.content.groups,
      notesView: state.content.notesView,
      tasks: state.tasksState.tasks,
      completedTasks: state.tasksState.completedTasks,
      editedTask: state.tasksState.editedTask
   }
)

export default connect(mapStateToProps,
   {
      addNote, getFromLocalStore, delNote, addGroup, addNoteToGroup, delGroup, changeNotesView, delNoteFromGroup,
      renameGroup, changeColor, addTask, getTasks, toggleTaskCompleteStatus, delTask, setEditedTask, changeTask
   })(ContainerContent);