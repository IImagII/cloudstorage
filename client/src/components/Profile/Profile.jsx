import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteAvatar, uploadAvatar } from '../../actions/user'

export const Profile = () => {
   const dispatch = useDispatch()

   const changeHandler = e => {
      const file = e.target.files[0]
      dispatch(uploadAvatar(file))
   }
   return (
      <div>
         <button onClick={() => dispatch(deleteAvatar())}>
            Удалить аватар
         </button>
         <input
            accept='image/*'
            type='file'
            placeholder='Загрузить аватар'
            onClick={e => changeHandler(e)}
         />
      </div>
   )
}
