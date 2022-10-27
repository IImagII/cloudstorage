import React from 'react'
import './navbar.scss'
import logo from '../../assets/img/navbar_logo.svg'
import { Link, NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logOutUser } from '../../reducers/userReducer'

export const Navbar = () => {
   const isAuth = useSelector(state => state.user.isAuth)
   const dispatch = useDispatch()
   return (
      <div className='navbar'>
         <div className='container'>
            <img src={logo} alt='' className='navbar__logo' />
            <div className='navbar__header'>CLOUD STORAGE</div>
            {!isAuth && (
               <div className='navbar__login'>
                  <NavLink to='/login'>Войти</NavLink>
               </div>
            )}
            {!isAuth && (
               <div className='navbar__regisration'>
                  <NavLink to='/registration'>Регистрация</NavLink>
               </div>
            )}
            {isAuth && (
               <div
                  className='navbar__login'
                  onClick={() => dispatch(logOutUser())}
               >
                  Выход
               </div>
            )}
         </div>
      </div>
   )
}
