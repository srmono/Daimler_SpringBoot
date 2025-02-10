import { useState } from 'react';
import './App.css';
import store from "./store"
import { Provider, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from './components/Navbar';
import PageNotFound from './pages/PageNotFound';
import TruckList from './pages/TruckList';
import TruckForm from './pages/TruckForm';

const ProtectedRoute = ({children}) => {
  const user = useSelector( (state) => state.auth.user )
  return user ? children : <Navigate to="/login" />
}

const  App = () => {

  return (
    <>
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path='/trucks' element={<TruckList />} />
          <Route path='/trucks/new' element={<TruckForm />} />
          <Route path='/trucks/edit/:id' element={<TruckForm />} />
          <Route path='/dashboard' element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>}/>
          <Route path='/' element={<Navigate to="/login" />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </Provider>
    </>
  );
}

export default App;
