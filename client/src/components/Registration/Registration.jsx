import React, { useState } from 'react'
import { registration } from '../../actions/user'
import { Input } from '../../utils/Input/Input'
import './registration.scss'

export const Registration = () => {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   return (
      <div className='registration'>
         <div className='registration__header'>Регистрация</div>
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
            className='registration__btn'
            onClick={() => registration(email, password)}
         >
            Зарегистрироваться
         </button>
      </div>
   )
}
