//Tools
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
//Components + styles
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import ContainerContent from "./components/Content/ContainerContent";
import './App.scss';
import ContainerLogin from './components/Auth/Login/Login';
import ContainerSignUp from './components/Auth/SignUp/SignUp';
import { setUserInState } from './redux/reducers/authReducer';


const App = props => {

  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Route
          path='/'
          exact
          render={() => { return <Redirect to='/signup' /> }}
        />
        <Route
          path='/signup'
          exact
          render={() => { return <ContainerSignUp /> }}
        />
        <Route
          path='/login'
          exact
          render={() => { return <ContainerLogin /> }}
        />
        <Route render={() => <Redirect to={"/signup"} />} />
        {props.isAuthenticated ? (
          <>
            <Header
              userEmail={props.userEmail}
              isAuthenticated={props.isAuthenticated}
              setUserInState={props.setUserInState}
            />
            {document.body.clientWidth >= 769 ? <Navbar /> : ''}
            <ContainerContent />
          </>
        ) : ''}
      </div>
    </BrowserRouter>
  );
}


export const ContainerApp = (props) => {
  return <App
    isAuthenticated={props.isAuthenticated}
    userEmail={props.userEmail}
    setUserInState={props.setUserInState}
  />
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.authState.isAuthenticated,
  userEmail: state.authState.userEmail
})

export default connect(mapStateToProps,
  {
    setUserInState
  })(ContainerApp)