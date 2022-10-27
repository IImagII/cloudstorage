import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { authorization } from '../../actions/user'
import { Input } from '../../utils/Input/Input'
import './authorization.scss'

export const Authorization = () => {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const dispatch = useDispatch()
   return (
      <div className='authorization'>
         <div className='authorization__header'>Авторизация</div>
         <Input
            type='text'
            placeholder='Ведите текст...'
            value={email}
            setValue={setEmail}
         />
         <Input
            type='password'
            placeholder='Ведите пароль...'
            value={password}
            setValue={setPassword}
         />

         <button
            className='authorization__btn'
            onClick={() => dispatch(authorization(email, password))}
         >
            Войти
         </button>
      </div>
   )
}
