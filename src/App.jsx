
import { useState, useEffect } from 'react'
import './App.css'
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth'
import { Outlet } from 'react-router-dom';
import { Footer, Header } from './components'
import { login, logout } from './store/authSlice';

function App() {

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      console.log(userData);
      if(userData){
        dispatch(login({userData}))
      }else {
        dispatch(logout())
      }
    })
    .finally(()=> setLoading(false))
  },[])
  
  return !loading ? (
    <div>
      <div>
        <Header/>
        <main>
          Todo: <Outlet/>
        </main>
        <Footer/>
      </div>
    </div>
  ) : null
}

export default App
