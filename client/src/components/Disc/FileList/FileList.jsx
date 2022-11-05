import React from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { useSelector } from 'react-redux'
import './file-list.scss'
import { File } from './File/File'

export const FileList = () => {
   const files = useSelector(state => state.files.files)

   if (files.length === 0) {
      return <div className='text-empty'>Файлы не найдены</div>
   }

   return (
      <div className='file-list'>
         <div className='file-list__header'>
            <div className='file-list__name'>Название</div>
            <div className='file-list__date'>Дата</div>
            <div className='file-list__size'>Размер</div>
         </div>

         <TransitionGroup>
            {files.map(file => (
               <CSSTransition
                  key={file._id}
                  timeout={500}
                  classNames={'item'}
                  exit={false}
               >
                  <File file={file} />
               </CSSTransition>
            ))}
         </TransitionGroup>
      </div>
   )
}
