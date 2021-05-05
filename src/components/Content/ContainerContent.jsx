import { connect } from 'react-redux';
import React from 'react';
import Notes from './Notes/Notes';
import CreateNote from './Forms/CreateNote/CreateNote';
import {
   addNote, getFromLocalStore,
   delNote, addGroup,
   addNoteToGroup, delGroup,
   changeNotesView, delNoteFromGroup
} from '../../redux/reducers/contentReducer';
import { Redirect, Route } from 'react-router-dom';
import '../../styles/_wrapper.scss';
import '../../styles/transitions/_formGroup.scss'
import Groups from './Groups/Groups';

class ContainerContent extends React.Component {
   componentDidMount() {
      this.props.getFromLocalStore();
   }

   render() {
      return (

         <div className={'wrapper'}>
            <Route
               path='/'
               exact
               render={() => { return <Redirect to='/all' /> }}
            />
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
                  />
               )}
            />
            <Route
               path='/create'
               exact
               render={() => <CreateNote addNote={this.props.addNote} />}
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
      notesView: state.content.notesView
   }
)

export default connect(mapStateToProps,
   {
      addNote,
      getFromLocalStore,
      delNote,
      addGroup,
      addNoteToGroup,
      delGroup,
      changeNotesView,
      delNoteFromGroup
   })(ContainerContent);