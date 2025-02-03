import React from 'react'
import { logout } from '../redux/authSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'



function Dashboard() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout())
        navigate("/login")
    }

  return (
    <div className=' container mt-5'>
        <h2> Dashboard</h2>
        <button className='btn btn-danger' onClick={handleLogout}> Logout </button>
    </div>
  )
}

export default Dashboard