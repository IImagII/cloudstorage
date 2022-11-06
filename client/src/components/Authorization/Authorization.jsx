import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { authorization } from '../../actions/user'
import { Input } from '../../utils/Input/Input'
import './authorization.scss'

export const Authorization = () => {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const dispatch = useDispatch()

   const handleClick = () => {
      dispatch(authorization(email, password))
   }
   useEffect(() => {
      const keyDownHandler = event => {
         if (event.key === 'Enter') {
            event.preventDefault()
            handleClick()
         }
      }
      document.addEventListener('keydown', keyDownHandler)
      return () => {
         document.removeEventListener('keydown', keyDownHandler)
      }
   }, [email, password])

   return (
      <div className='authorization'>
         <div className='authorization__header'>Авторизация</div>
         <Input
            type='text'
            placeholder='Ведите логин...'
            value={email}
            setValue={setEmail}
         />
         <Input
            type='password'
            placeholder='Ведите пароль...'
            value={password}
            setValue={setPassword}
         />

         <button className='authorization__btn' onClick={handleClick}>
            Войти
         </button>
      </div>
   )
}
