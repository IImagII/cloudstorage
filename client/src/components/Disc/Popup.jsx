import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createDir } from '../../actions/file'
import { setPopupDisplay } from '../../reducers/fileReducer'
import './disc.scss'

export const Popup = () => {
   const [dirName, setDirName] = useState('')
   const PopupDisplay = useSelector(state => state.files.popupDisplay)
   const currentDir = useSelector(state => state.files.currentDir)
   const dispatch = useDispatch()

   const createHandler = () => {
      dispatch(createDir(currentDir, dirName))
      dispatch(setPopupDisplay('none'))
      setDirName('')
   }

   const handleKeyDown = event => {
      if (event.key === 'Enter') {
         createHandler()
      }
   }
   return (
      <div
         className='popup'
         onClick={() => dispatch(setPopupDisplay('none'))}
         style={{ display: PopupDisplay }}
      >
         <div className='popup__content' onClick={e => e.stopPropagation()}>
            <div className='popup__header'>
               <div className='popup__title'>Создать новую папку</div>
               <div
                  className='popup__close'
                  onClick={() => dispatch(setPopupDisplay('none'))}
               >
                  &times;
               </div>
            </div>
            <input
               type='text'
               placeholder='Введите название папки...'
               value={dirName}
               onChange={e => setDirName(e.target.value)}
               onKeyDown={handleKeyDown}
            />
            <button className='popup__create' onClick={() => createHandler()}>
               Создать
            </button>
         </div>
      </div>
   )
}
