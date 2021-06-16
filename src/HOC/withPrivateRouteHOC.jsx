import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import React from 'react'

let mapStateToPropsForRedirect = (state) => {
   return {
      isAuthenticated: state.authState.isAuthenticated
   }
}

export const withPrivateRoute = (Component) => {
   class RedirectComponent extends React.Component {
      render() {
         if (!this.props.isAuthenticated) return <Redirect to='/login' />
         return <Component {...this.props} />
      }
   }
   let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent);
   return ConnectedAuthRedirectComponent;
}