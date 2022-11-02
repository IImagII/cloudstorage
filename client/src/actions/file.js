import axios from 'axios'
import { addFiles, setFiles } from '../reducers/fileReducer'
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
         const response = await axios.post(
            `${paths.url}/api/files/upload`,
            formData,
            {
               headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
               },

               // onUploadProgress: progressEvent => {
               //    const totalLength = progressEvent.lengthComputable
               //       ? progressEvent.total
               //       : progressEvent.target.getResponseHeader(
               //            'content-length'
               //         ) ||
               //         progressEvent.target.getResponseHeader(
               //            'x-decompressed-content-length'
               //         )
               //    console.log('onUploadProgress', totalLength)
               //    if (totalLength !== null) {
               //       this.updateProgressBarValue(
               //          Math.round((progressEvent.loaded * 100) / totalLength)
               //       )
               //    }
               // },

               onUploadProgress: progressEvent => {
                  // const totalLength = progressEvent.lengthComputable
                  //    ? progressEvent.total
                  //    : progressEvent.target.getResponseHeader(
                  //         'content-length'
                  //      ) ||
                  //      progressEvent.target.getResponseHeader(
                  //         'x-decompressed-content-length'
                  //      )
                  // console.log('total', totalLength)
                  // if (totalLength) {
                  //    let progress = Math.round(
                  //       (progressEvent.loaded * 100) / totalLength
                  //    )
                  //    console.log(progress)
                  // }
                  const progress = parseInt(
                     Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                     )
                  )
                  console.log(progress)
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
