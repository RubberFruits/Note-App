//Tools
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { auth } from './API/firebase';
import { useEffect } from 'react'
//Components + styles
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import ContainerContent from "./components/Content/ContainerContent";
import './App.scss';
import ContainerLogin from './components/Auth/Login/Login';
import ContainerSignUp from './components/Auth/SignUp/SignUp';
import { setUserInState } from './redux/reducers/authReducer';

const App = ({ userEmail, isAuthenticated, setUserInState }) => {

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUserInState(user.email)
      }
    })
    return unsubscribe
  }, [setUserInState])

  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Route
          path='/'
          exact
          render={() => { return isAuthenticated ? <Redirect to='/all' /> : <Redirect to='/signup' /> }}
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
        {isAuthenticated ? (
          <>
            <Header
              userEmail={userEmail}
              isAuthenticated={isAuthenticated}
              setUserInState={setUserInState}
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