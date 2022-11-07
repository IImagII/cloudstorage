import { Navbar } from './components/Navbar'
import './app.scss'
import {
   BrowserRouter,
   Routes,
   Route,
   useNavigate,
   Navigate,
} from 'react-router-dom'
import { Registration } from './components/Registration'
import { Authorization } from './components/Authorization'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { auth } from './actions/user'
import { Disc } from './components/Disc/Disc'
import { Profile } from './components/Profile/Profile'

function App() {
   const isAuth = useSelector(state => state.user.isAuth)
   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(auth())
   }, [])

   return (
      <BrowserRouter>
         <div className='app'>
            <Navbar />
            <div className='wrap'>
               {!isAuth ? (
                  <Routes>
                     <Route path='/registration' element={<Registration />} />
                     <Route path='/login' element={<Authorization />} />
                     <Route
                        path='/'
                        element={<Navigate replace to='/login' />}
                     />
                  </Routes>
               ) : (
                  <Routes>
                     <Route path='/' element={<Disc />} />
                     <Route path='*' element={<Navigate to='/' />} />
                     <Route path='/profile' element={<Profile />} />
                  </Routes>
               )}
            </div>
         </div>
      </BrowserRouter>
   )
}

export default App
