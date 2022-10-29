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
