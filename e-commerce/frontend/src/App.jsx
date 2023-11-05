import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Register} from './components/Register.jsx'
import {Login} from './components/Login.jsx'

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}