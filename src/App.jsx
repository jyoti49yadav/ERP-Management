import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './Pages/Login'
import Dashboard from './Pages/Dashboard'
import { ToastContainer } from 'react-toastify'
import Subjects from './AdminPages/Subjects'
import AdminSettings from './AdminPages/AdminSettings'
import Fee from './AdminPages/Fee'
import Teachers from './AdminPages/Teachers'
import Registration from './AdminPages/Registration'
import AllClasses from './AdminPages/AllClasses'
import Student from './AdminPages/Student'
const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />

          {/*admin routes start */}

          <Route path='/subjects' element={<Subjects />} />
          <Route path='/adminsettings' element={<AdminSettings />} />
          <Route path='/fee' element={<Fee />} />
          <Route path='/teachers' element={<Teachers />} />
          <Route path='/registration' element={<Registration />} />
          <Route path='/class' element={<AllClasses />} />
          {/*admin routes ends */}

          {/* student Page */}
          <Route path='/student' element={<Student />} />


        </Routes>
      </Router>



      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  )
}

export default App