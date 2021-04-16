import { connect } from 'react-redux';
import React from 'react';
import Content from './Content/Content';

class ContainerContent extends React.Component {
   componentDidMount() {
      //реализация запроса в базу данных в будущем (необходима логинизация)
   }

   render() {
      return <Content {...this.props} />
   }
}

const mapStateToProps = (state) => (
   {
      isEditMode: state.content.isEditMode,

   }
)




export default connect(mapStateToProps, {
   //dispatch
})(ContainerContent);