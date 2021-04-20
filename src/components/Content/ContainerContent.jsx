import { connect } from 'react-redux';
import React from 'react';
import Content from './Content';
import { addNote, toggleEditMode, getNotes, delNote } from '../../redux/reducers/contentReducer';


class ContainerContent extends React.Component {
   componentDidMount() {
      this.props.getNotes();
   }

   render() {
      return <Content
         {...this.props}
         addNote={this.props.addNote}
         toggleEditMode={this.props.toggleEditMode}
         delNote={this.props.delNote}
      />
   }
}

const mapStateToProps = (state) => (
   {
      isEditMode: state.content.isEditMode,
      notes: state.content.notes
   }
)

export default connect(mapStateToProps,
   {
      toggleEditMode,
      addNote,
      getNotes,
      delNote
   })(ContainerContent);