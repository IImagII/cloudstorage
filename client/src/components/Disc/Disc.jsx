import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFiles } from '../../actions/file'
import { FileList } from './FileList/FileList'
import './disc.scss'
import { Popup } from './Popup'
import { setPopupDisplay } from '../../reducers/fileReducer'

export const Disc = () => {
   const dispatch = useDispatch()
   const currentDir = useSelector(state => state.files.currentDir)

   useEffect(() => dispatch(getFiles(currentDir)), [dispatch, currentDir])

   return (
      <div className='disk'>
         <div className='disk__btns'>
            <button className='disk__back'>Назад</button>
            <button
               className='disk__create'
               onClick={() => dispatch(setPopupDisplay('flex'))}
            >
               Создать папку
            </button>
         </div>
         <FileList />
         <Popup />
      </div>
   )
}
