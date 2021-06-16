import style from './SignUp.module.scss';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Tools } from '../../../utils/tools';
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import { auth } from '../../../API/firebase';
import { connect } from 'react-redux';
import { setUserInState } from '../../../redux/reducers/authReducer';


const SignUp = (props) => {

   const [currentUser, setCurrentUser] = useState()

   const [loading, setLoading] = useState(true);

   //! NEED TO RETURN BCS ITS PROMISE
   function signUp(email, password) {
      return auth.createUserWithEmailAndPassword(email, password)
   }

   /* useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user => {
         setCurrentUser(user);
         setLoading(false);
      })
      return unsubscribe
   }, []) */

   useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user => {
         if (!user) {
            setCurrentUser(null);
         } else {
            setCurrentUser(user);
         }
         setLoading(false);
      })
      return unsubscribe
   }, [])



   return (
      <>
         {
            props.isAuthenticated ? <Redirect to='/all' />
               : (!loading && <div className={style.signUp_container}>
                  <div className={style.signUp_form_wrapper}>
                     <SignUpForm
                        signUp={signUp}
                        currentUser={currentUser}
                        setUserInState={props.setUserInState}
                     />
                  </div>
               </div>)
         }
      </>
   )
}

const SignUpForm = props => {

   const history = useHistory();

   const [sumbitBtnState, setSumbitBtnState] = useState(false)

   const {
      register,
      handleSubmit,
      reset,
      formState: { errors }
   } = useForm();

   const submittingForm = async data => {
      if (data.password !== data.password_repeat) {
         Tools.errorHandler('Пароли не совпадают')
         return
      }
      else if (data.password.length < 6) {
         Tools.errorHandler('Минимальная длина пароля 6 символов')
         return
      }
      setSumbitBtnState(true)
      try {
         const resp = await props.signUp(data.email, data.password)
         props.setUserInState(resp.user.email)
         history.push('/all')
      } catch {
         Tools.errorHandler('Ошибка при создании аккаунта')
      }
      setSumbitBtnState(false)
      reset()
   }

   return (
      <form
         onSubmit={handleSubmit(submittingForm)}
         className={style.formWrapper}>
         {props.currentUser?.email}
         <h4 className={style.form_header}>Регистрация</h4>
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
                  required: `Заполните поле "Пароль"`,
               }
               )}
               id={"password"}
               type="password"
            />
            <label htmlFor={"password"}>Пароль</label>
         </div>
         <div className={`input-field s5 inputDiv ${style.password_input}`}>
            <input
               {...register("password_repeat", {
                  required: true
               })
               }
               id={"password_repeat"}
               type="password"
            />
            <label htmlFor={"password_repeat"}>Повторите пароль</label>
         </div>
         {errors.email && Tools.errorHandler(errors.email.message)}
         {errors.password && Tools.errorHandler(errors.password.message)}
         <div className={style.buttonContainer}>
            <button
               className={`btn ${style.signUp_button}`}
               disabled={sumbitBtnState}
               type="submit"
            >Зарегистрироваться
            </button>
         </div>
         <p className={style.enter_description}>Уже зарегистрированы?
            <NavLink
               to="/login"
               className={style.enter_button}
            >Войти</NavLink>
         </p>
      </form>
   )
}

const ContainerSignUp = (props) => {
   return <SignUp
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
   })(ContainerSignUp)