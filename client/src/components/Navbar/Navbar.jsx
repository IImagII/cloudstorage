import React, { useState } from 'react'
import './navbar.scss'
import logo from '../../assets/img/navbar_logo.svg'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logOutUser } from '../../reducers/userReducer'
import { getFiles, searchFile } from '../../actions/file'
import { showLoader } from '../../reducers/appReducer'
import avatarLogo from '../../assets/img/avatar.svg'
import { paths } from '../../utils/path'

export const Navbar = () => {
   const isAuth = useSelector(state => state.user.isAuth)
   const currentDir = useSelector(state => state.files.currentDir)
   const currentUser = useSelector(state => state.user.currentUser)
   const dispatch = useDispatch()
   const [searchName, setSearchName] = useState('')
   const [searchTimeout, setSearchTimeout] = useState(false)
   const avatar = currentUser.avatar
      ? `${paths.urlAvatar + currentUser.avatar}`
      : avatarLogo

   const searchHandler = e => {
      setSearchName(e.target.value)
      if (searchTimeout !== false) {
         clearTimeout(searchTimeout)
      }
      dispatch(showLoader())
      if (e.target.value !== '') {
         setSearchTimeout(
            setTimeout(
               value => {
                  dispatch(searchFile(value))
               },
               500,
               e.target.value
            )
         )
      } else {
         dispatch(getFiles(currentDir))
      }
   }
   return (
      <div className='navbar'>
         <div className='container'>
            <img src={logo} alt='' className='navbar__logo' />
            <div className='navbar__header'>MY CLOUD STORAGE</div>
            {isAuth && (
               <input
                  type='text'
                  placeholder='Поиск файла...'
                  className='navbar__search'
                  value={searchName}
                  onChange={e => searchHandler(e)}
               />
            )}

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
            {isAuth && (
               <NavLink to='/profile'>
                  <img src={avatar} alt='' className='navbar__avatar' />
               </NavLink>
            )}
         </div>
      </div>
   )
}
