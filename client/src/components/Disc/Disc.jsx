import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFiles, uploadFile } from '../../actions/file'
import { FileList } from './FileList/FileList'
import './disc.scss'
import { Popup } from './Popup'
import { setCurrentDir, setPopupDisplay } from '../../reducers/fileReducer'
import { useState } from 'react'
import { Upload } from './upload/Upload'

export const Disc = () => {
   const dispatch = useDispatch()
   const currentDir = useSelector(state => state.files.currentDir)
   const dirStack = useSelector(state => state.files.dirStack)
   const [dragEnter, setDragEnter] = useState(false)

   useEffect(() => {
      dispatch(getFiles(currentDir))
   }, [currentDir])

   function showPopupHandler() {
      dispatch(setPopupDisplay('flex'))
   }
   // навигация по страницам папки
   function backClickHandler() {
      const backDirId = dirStack.pop()
      dispatch(setCurrentDir(backDirId))
   }

   // логика загрузки файла с input когда мы его наживаем
   const fileUploadHandler = e => {
      const files = [...e.target.files]
      files.forEach(file => dispatch(uploadFile(file, currentDir)))
   }

   const dragEnterHandler = e => {
      e.preventDefault()
      e.stopPropagation()
      setDragEnter(true)
   }

   const dragLeaveHandler = e => {
      e.preventDefault()
      e.stopPropagation()
      setDragEnter(false)
   }
   // логика загрузки файла при перетаскивании
   const dropHandler = e => {
      e.preventDefault()
      e.stopPropagation()
      let files = [...e.dataTransfer.files]
      files.forEach(file => dispatch(uploadFile(file, currentDir)))
      setDragEnter(false)
   }

   return !dragEnter ? (
      <div
         className='disk'
         onDragEnter={dragEnterHandler}
         onDragLeave={dragLeaveHandler}
         onDragOver={dragEnterHandler}
      >
         <div className='disk__btns'>
            {currentDir && (
               <button
                  className='disk__back'
                  onClick={() => backClickHandler()}
               >
                  Назад
               </button>
            )}
            <button className='disk__create' onClick={() => showPopupHandler()}>
               Создать папку
            </button>
            <div className='disk__upload'>
               <label
                  htmlFor='disk__upload-input'
                  className='disk__upload-label'
               >
                  Загрузить файл
               </label>
               <input
                  type='file'
                  id='disk__upload-input'
                  className='disk__upload-input'
                  onChange={e => fileUploadHandler(e)}
                  multiple={true}
               />
            </div>
         </div>
         <FileList />
         <Popup />
         <Upload />
      </div>
   ) : (
      <div
         className='drag-area'
         onDrop={dropHandler}
         onDragEnter={dragEnterHandler}
         onDragLeave={dragLeaveHandler}
         onDragOver={dragEnterHandler}
      >
         Перетащите файлы сюда
      </div>
   )
}
