import React, { useEffect } from 'react'
import { Route,Routes } from 'react-router-dom'
import  Home  from './pages/Home'
import  Layout  from './pages/Layout'
import Dashboard from './pages/Dashboard'
import ResumeBuilder from './pages/ResumeBuilder'
import Preview  from'./pages/Preview'
import { login, logout, setLoading } from './app/features/authSlice'
import { useDispatch } from 'react-redux'
import api from './configs/api'
import {Toaster} from 'react-hot-toast'





const App= ()=> {

const dispatch = useDispatch();
useEffect(() => {
  let isMounted = true;

  const getUserData = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      dispatch(setLoading(false));
      return;
    }

    try {
      const { data } = await api.get('/api/users/data', {
        headers: { Authorization: token },
      });

      if (isMounted && data.user) {
        dispatch(login({ token, user: data.user }));
      }
    } catch (error) {
      if (error.response?.status === 401) {
        dispatch(logout());
      } else {
        console.error('Unable to load user data:', error.message);
      }
    } finally {
      if (isMounted) {
        dispatch(setLoading(false));
      }
    }
  };

  void getUserData();

  return () => {
    isMounted = false;
  };
}, [dispatch]);

  return (
    <>
    <Toaster/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='app' element={<Layout/>}>
          <Route index element={<Dashboard/>}/>
          <Route path='builder/:resumeId' element={<ResumeBuilder/>}/>
          
        </Route>
        
        <Route path='view/:resumeId' element={< Preview />}/>

        
      </Routes>
    </>
  )
}

export default App
