import { connect } from 'react-redux';
import React from 'react';
import Content from './Content';
import { addNote, toggleEditMode } from '../../redux/reducers/contentReducer';


class ContainerContent extends React.Component {
   componentDidMount() {
      //реализация запроса в local stor и базу данных в будущем (необходима логинизация)
   }

   render() {
      return <Content
         {...this.props}
         addNote={this.props.addNote}
         toggleEditMode={this.props.toggleEditMode}
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
      addNote
   })(ContainerContent);