import axios from 'axios'
import { addFiles, deleteFileAction, setFiles } from '../reducers/fileReducer'
import {
   addUploadFile,
   changeUploadFile,
   showUpload,
} from '../reducers/uploadReducer'
import { paths } from '../utils/path'

export const getFiles = dirId => {
   return async dispatch => {
      try {
         const response = await axios.get(
            `${paths.url}/api/files${dirId ? '?parent=' + dirId : ''}`,
            {
               headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
               },
            }
         )
         dispatch(setFiles(response.data)) //тут передали наш actionCreate fileReducer.js
      } catch (e) {
         console.log(e.response.data.message)
      }
   }
}

export const createDir = (dirId, name) => {
   return async dispatch => {
      try {
         const response = await axios.post(
            `${paths.url}/api/files`,
            { name, parent: dirId, type: 'dir' },
            {
               headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
               },
            }
         )
         dispatch(addFiles(response.data))
      } catch (e) {
         console.log(e.response.data.message)
      }
   }
}

export function uploadFile(file, dirId) {
   return async dispatch => {
      try {
         const formData = new FormData()
         formData.append('file', file)
         if (dirId) {
            formData.append('parent', dirId)
         }
         const uploadFile = { name: file.name, progress: 0, id: Date.now() }
         dispatch(showUpload())
         dispatch(addUploadFile(uploadFile))
         const response = await axios.post(
            `${paths.url}/api/files/upload`,
            formData,
            {
               headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
               },

               onUploadProgress: progressEvent => {
                  uploadFile.progress = Math.round(
                     (progressEvent.loaded * 100) / progressEvent.total
                  )
                  dispatch(changeUploadFile(uploadFile))
               },
            }
         )
         dispatch(addFiles(response.data))
      } catch (e) {
         alert(e.response.data.message)
      }
   }
}
export const downloadFile = async file => {
   const response = await fetch(
      `${paths.url}/api/files/download?id=${file._id}`,
      { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
   )
   if (response.status === 200) {
      const blob = await response.blob()
      const downloadUrl = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = downloadUrl
      link.download = file.name
      document.body.appendChild(link)
      link.click()
      link.remove()
   }
}
export function deleteFile(file) {
   return async dispatch => {
      try {
         const response = await axios.delete(
            `http://localhost:5000/api/files?id=${file._id}`,
            {
               headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
               },
            }
         )
         dispatch(deleteFileAction(file._id))
         alert(response.data.message)
      } catch (e) {
         alert(e?.response?.data?.message)
      }
   }
}
