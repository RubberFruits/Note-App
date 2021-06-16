import style from '../SignUp/SignUp.module.scss';
import { useState, useEffect } from 'react';
import { auth } from '../../../API/firebase';
import { useForm } from 'react-hook-form';
import { Tools } from '../../../utils/tools';
import { NavLink, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUserInState } from '../../../redux/reducers/authReducer';
import { Redirect } from 'react-router-dom'

const Login = (props) => {
   const [currentUser, setCurrentUser] = useState()

   const [loading, setLoading] = useState(true);

   //! NEED TO RETURN BCS ITS PROMISE
   function login(email, password) {
      return auth.signInWithEmailAndPassword(email, password)
   }

   useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user => {
         setCurrentUser(user)
         setLoading(false)
      })
      return unsubscribe
   }, [])

   return (
      <>
         {
            props.isAuthenticated ? <Redirect to='/all' />
               : (!loading && <div className={style.signUp_container}>
                  <div className={style.login_form_wrapper}>
                     <LoginForm
                        login={login}
                        currentUser={currentUser}
                        setUserInState={props.setUserInState}
                     />
                  </div>
               </div>)
         }
      </>
   )
}


const LoginForm = props => {

   const history = useHistory();

   const [sumbitBtnState, setSumbitBtnState] = useState(false);

   const {
      register,
      handleSubmit,
      reset,
      formState: { errors }
   } = useForm();

   const submittingForm = async data => {
      if (data.password.length < 6) {
         Tools.errorHandler('Минимальная длина пароля 6 символов')
         return
      }
      setSumbitBtnState(true)
      try {
         const resp = await props.login(data.email, data.password)
         props.setUserInState(resp.user.email)
         history.push('/all')
      } catch {
         Tools.errorHandler('Ошибка при входе в аккаунт')
      }
      setSumbitBtnState(false)
      reset();
   }

   return (
      <form
         onSubmit={handleSubmit(submittingForm)}
         className={style.formWrapper}>
         <h3 className={style.form_header}>Вход</h3>
         <div className={`input-field s5 inputDiv ${style.signUp_input}`}>
            <input
               {...register("email", {
                  required: `Заполните поле "Email"`
               })
               }
               id={"email"}
               type="email"
            />
            <label htmlFor={"email"}>Email</label>
         </div>
         <div className={`input-field s5 inputDiv ${style.password_input}`}>
            <input
               {...register("password", {
                  required: true
               })
               }
               id={"password"}
               type="password"
            />
            <label htmlFor={"password"}>Пароль</label>
         </div>
         {errors.email && Tools.errorHandler(errors.email.message)}
         {errors.password && Tools.errorHandler(errors.password.message)}
         <div className={style.buttonContainer}>
            <button
               className={`btn ${style.signUp_button}`}
               disabled={sumbitBtnState ? true : false}
               type="submit">Войти
            </button>
         </div>
         <p className={style.enter_description}>Нет аккаунта?
            <NavLink
               to="/signup"
               className={style.enter_button}
            >Зарегистрироваться
            </NavLink>
         </p>
      </form>
   )
}

const ContainerLogin = (props) => {
   return <Login
      isAuthenticated={props.isAuthenticated}
      setUserInState={props.setUserInState}
   />
}

const mapStateToProps = (state) => (
   {
      isAuthenticated: state.authState.isAuthenticated
   }
)

export default connect(mapStateToProps,
   {
      setUserInState
   })(ContainerLogin)