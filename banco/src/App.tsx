import { useState } from 'react'
import './App.css'
import { TabContextProvider } from './contexts/TabContext'
import MainPage from './pages/MainPage'

import 'react-toastify/dist/ReactToastify.min.css';
import { ToastContainer } from 'react-toastify';

function App() {

  return (
    <>
      <TabContextProvider>
        <ToastContainer/>
        <MainPage/>
      </TabContextProvider>
    </>
  )
}

export default App
