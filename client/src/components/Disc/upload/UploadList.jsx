import React from 'react'
import { useDispatch } from 'react-redux'
import { removeUploadFile } from '../../../reducers/uploadReducer'
import './upload.scss'

export const UploadList = ({ file }) => {
   const dispatch = useDispatch()

   return (
      <div className='upload-list'>
         <div className='upload-list__header'>
            <div className='upload-list__name'>{file.name}</div>
            <button
               className='upload-list__remove'
               onClick={() => dispatch(removeUploadFile(file._id))}
            >
               &times;
            </button>
         </div>
         <div className='upload-list__progress-bar'>
            <div
               className='upload-list__upload-bar'
               style={{ width: file.progress + '%' }}
            />
            <div className='upload-list__percent'>{file.progress}%</div>
         </div>
      </div>
   )
}
