import { connect } from 'react-redux';
import React from 'react';
import AllNotes from './AllNotes';
import CreateNote from './CreateNote/CreateNote';
import { addNote, getNotes, delNote } from '../../redux/reducers/contentReducer';
import { Route } from 'react-router-dom';


class ContainerContent extends React.Component {
   componentDidMount() {
      this.props.getNotes();
   }

   render() {
      return (
         <>
            <Route
               path='/all'
               exact
               render={() => <AllNotes
                  {...this.props}
                  addNote={this.props.addNote}
                  delNote={this.props.delNote}
               />}
            />
            <Route
               path='/important'
               exact
               render={() => <h1>IMPORTANT NOTES</h1>}
            />
            <Route
               path='/edit'
               exact
               render={() => <CreateNote
                  addNote={this.props.addNote}
               />}
            />
         </>
      )
   }
}

const mapStateToProps = (state) => (
   {
      notes: state.content.notes
   }
)

export default connect(mapStateToProps,
   {
      addNote,
      getNotes,
      delNote
   })(ContainerContent);