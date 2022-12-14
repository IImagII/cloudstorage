import axios from 'axios'
import { setUser } from '../reducers/userReducer'
import { paths } from '../utils/path'

export const registration = async (email, password) => {
   try {
      const response = await axios.post(`${paths.url}/api/auth/registration`, {
         email,
         password,
      })
      alert(response.data.message)
   } catch (e) {
      console.log(e.response.data.message)
   }
}

export const authorization = (email, password) => {
   return async dispatch => {
      try {
         const response = await axios.post(`${paths.url}/api/auth/login`, {
            email,
            password,
         })
         dispatch(setUser(response.data.user))
         localStorage.setItem('token', response.data.token)
      } catch (e) {
         console.log(e.response.data.message)
      }
   }
}

export const auth = () => {
   return async dispatch => {
      try {
         const response = await axios.get(`${paths.url}/api/auth/auth`, {
            headers: {
               Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
         })
         dispatch(setUser(response.data.user))
         localStorage.setItem('token', response.data.token)
      } catch (e) {
         console.log(e.response.data.message)
         localStorage.removeItem('token')
      }
   }
}

export const uploadAvatar = file => {
   return async dispatch => {
      try {
         const formData = new FormData()
         formData.append('file', file)
         const response = await axios.post(
            `${paths.url}/api/files/avatar`,
            formData,
            {
               headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
               },
            }
         )
         dispatch(setUser(response.data))
      } catch (e) {
         console.log(e)
      }
   }
}

export const deleteAvatar = () => {
   return async dispatch => {
      try {
         const response = await axios.delete(`${paths.url}/api/files/avatar`, {
            headers: {
               Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
         })
         dispatch(setUser(response.data))
      } catch (e) {
         console.log(e)
      }
   }
}
