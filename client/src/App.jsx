import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Register from './pages/Register'
import Login from './pages/Login'

function App() {

  return (
      <>
      <Routes>
        <Route path='/' element={
          <ProtectedRoute> 
            <HomePage/> 
          </ProtectedRoute>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>

      </Routes>
      </>
  )
}

export function ProtectedRoute(props){
  if(localStorage.getItem('user')){
    return props.children
  }else{
    return <Navigate to="/login" />
  }
}

export default App
