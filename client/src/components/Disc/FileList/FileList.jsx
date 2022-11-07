import React from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { useSelector } from 'react-redux'
import './file-list.scss'
import { File } from './File/File'

export const FileList = () => {
   const files = useSelector(state => state.files.files)
   const view = useSelector(state => state.files.view)

   if (files.length === 0) {
      return <div className='text-empty'>Файлы не найдены</div>
   }

   if (view === 'plate') {
      return (
         <div className='file-list-plate'>
            {files.map(file => (
               <File file={file} key={file._id} />
            ))}
         </div>
      )
   }
   if (view === 'list') {
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
                     in={!view}
                     key={file._id}
                     timeout={500}
                     classNames={'file'}
                     exit={false}
                     mountOnEnter
                     unmountOnExit
                  >
                     <File file={file} />
                  </CSSTransition>
               ))}
            </TransitionGroup>
         </div>
      )
   }
}
