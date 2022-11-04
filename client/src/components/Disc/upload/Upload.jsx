import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { hideUpload } from '../../../reducers/uploadReducer'
import './upload.scss'
import { UploadList } from './UploadList'

export const Upload = () => {
   const files = useSelector(state => state.upload.files)
   const isVisible = useSelector(state => state.upload.isVisible)

   const dispatch = useDispatch()

   return (
      isVisible && (
         <div className='upload'>
            <div className='upload__header'>
               <div className='upload__title'>Загрузки</div>
               <button
                  className='upload__close'
                  onClick={() => dispatch(hideUpload())}
               >
                  &times;
               </button>
            </div>
            {files
               .map(file => <UploadList key={file.id} file={file} />)
               .reverse()}
         </div>
      )
   )
}
