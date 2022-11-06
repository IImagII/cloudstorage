import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFiles, uploadFile } from '../../actions/file'
import { FileList } from './FileList/FileList'
import './disc.scss'
import { Popup } from './Popup'
import {
   setCurrentDir,
   setPopupDisplay,
   setView,
} from '../../reducers/fileReducer'
import { Upload } from './upload/Upload'

export const Disc = () => {
   const dispatch = useDispatch()
   const currentDir = useSelector(state => state.files.currentDir)
   const dirStack = useSelector(state => state.files.dirStack)
   const loader = useSelector(state => state.loader.loader)

   const [dragEnter, setDragEnter] = useState(false)
   const [sort, setSort] = useState('type')

   useEffect(() => {
      dispatch(getFiles(currentDir, sort))
   }, [currentDir, sort])

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

   if (loader) {
      return (
         <div className='loader'>
            <div class='lds-spinner'>
               <div></div>
               <div></div>
               <div></div>
               <div></div>
               <div></div>
               <div></div>
               <div></div>
               <div></div>
               <div></div>
               <div></div>
               <div></div>
               <div></div>
            </div>
         </div>
      )
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
            <div className='disk__select'>
               <dir className='disk__sort'>Сортировка:</dir>
               <select value={sort} onChange={e => setSort(e.target.value)}>
                  <option value='name'>По Названию</option>
                  <option value='type'>По типу</option>
                  <option value='date'>По дате</option>
               </select>
            </div>
            <button
               className='disk__list'
               onClick={() => dispatch(setView('list'))}
            />
            <button
               className='disk__plate'
               onClick={() => dispatch(setView('plate'))}
            />
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
