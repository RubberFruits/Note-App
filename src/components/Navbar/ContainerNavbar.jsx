import React from 'react';
import { connect } from 'react-redux';
import Navbar from './Navbar';

class ContainerNavbar extends React.Component {
   render() {
      return <Navbar {...this.props} />
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
   })(ContainerNavbar);