import React from 'react'
import { useSelector } from 'react-redux'
import './file-list.scss'
import { File } from './File/File'

export const FileList = () => {
   const files = useSelector(state => state.files.files).map(file => (
      <File file={file} key={file.id} />
   ))
   return (
      <div className='file-list'>
         <div className='file-list__header'>
            <div className='file-list__name'>Название</div>
            <div className='file-list__date'>Дата</div>
            <div className='file-list__size'>Размер</div>
         </div>
         {files}
      </div>
   )
}
