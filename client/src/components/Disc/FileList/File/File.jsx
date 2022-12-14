import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteFile, downloadFile } from '../../../../actions/file'
import dirLogo from '../../../../assets/img/directory.svg'
import fileLogo from '../../../../assets/img/file.svg'
import { pushToStack, setCurrentDir } from '../../../../reducers/fileReducer'
import sizeFormat from '../../../../utils/sizeFormat'
import './file.scss'

export const File = ({ file }) => {
   const dispatch = useDispatch()
   const currentDir = useSelector(state => state.files.currentDir)
   const view = useSelector(state => state.files.view)

   const openDirHandler = file => {
      if (file.type === 'dir') {
         dispatch(pushToStack(currentDir))
         dispatch(setCurrentDir(file._id))
      }
   }

   const downloadClickHandler = e => {
      e.stopPropagation()
      downloadFile(file)
   }
   function deleteClickHandler(e) {
      e.stopPropagation()
      dispatch(deleteFile(file))
   }
   if (view === 'plate') {
      return (
         <div className='file-plate' onClick={() => openDirHandler(file)}>
            <img
               src={file.type === 'dir' ? dirLogo : fileLogo}
               alt=''
               className='file-plate__img'
            />
            <div className='file-plate__name'>{file.name}</div>

            <div className='file-plate__btns'>
               {file.type !== 'dir' && (
                  <button
                     className='file-plate__btn file__download'
                     onClick={e => downloadClickHandler(e)}
                  >
                     download
                  </button>
               )}
               <button
                  onClick={e => deleteClickHandler(e)}
                  className='file-plate__btn file__delete'
               >
                  удалить
               </button>
            </div>
         </div>
      )
   }
   if (view === 'list') {
      return (
         <div className='file' onClick={() => openDirHandler(file)}>
            <img
               src={file.type === 'dir' ? dirLogo : fileLogo}
               alt=''
               className='file__img'
            />
            <div className='file__name'>{file.name}</div>
            <div className='file__date'>{file.date.slice(0, 10)}</div>
            <div className='file__size'>{sizeFormat(file.size)}</div>
            {file.type !== 'dir' && (
               <button
                  className='file__btn file__download'
                  onClick={e => downloadClickHandler(e)}
               >
                  download
               </button>
            )}
            <button
               onClick={e => deleteClickHandler(e)}
               className='file__btn file__delete'
            >
               удалить
            </button>
         </div>
      )
   }
}
