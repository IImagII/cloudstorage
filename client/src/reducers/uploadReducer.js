const SHOW_UPLOAD = 'SHOW_UPLOAD'
const HIDE_UPLOAD = 'HIDE_UPLOAD'
const ADD_UPLOAD_FILE = 'ADD_UPLOAD_FILE'
const REMOVE_UPLOAD_FILE = 'REMOVE_UPLOAD_FILE'
const CHANGE_UPLOAD_FILE = 'CHANGE_UPLOAD_FILE'

const defaultState = {
   isVisible: false,
   files: [],
}

export default function uploadReducer(state = defaultState, action) {
   switch (action.type) {
      case SHOW_UPLOAD:
         return { ...state, isVisible: true }
      case HIDE_UPLOAD:
         return { ...state, isVisible: false }
      case ADD_UPLOAD_FILE:
         return {
            ...state,
            files: [...state.files, action.payload],
         }
      case REMOVE_UPLOAD_FILE:
         return {
            ...state,
            files: [...state.files.filter(file => file._id !== action.payload)],
         }
      case CHANGE_UPLOAD_FILE:
         return {
            ...state,
            files: [
               ...state.files.map(file =>
                  file.id === action.payload.id
                     ? { ...file, progress: action.payload.progress }
                     : { ...file }
               ),
            ],
         }

      default:
         return state
   }
}

export const showUpload = () => ({ type: SHOW_UPLOAD })
export const hideUpload = () => ({ type: HIDE_UPLOAD })
export const addUploadFile = files => ({
   type: ADD_UPLOAD_FILE,
   payload: files,
})
export const removeUploadFile = fileId => ({
   type: REMOVE_UPLOAD_FILE,
   payload: fileId,
})
export const changeUploadFile = payload => ({
   type: CHANGE_UPLOAD_FILE,
   payload: payload,
})
