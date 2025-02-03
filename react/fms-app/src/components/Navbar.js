import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";

const Navbar = () => {
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  return (
    <nav className="navbar navbar-dark bg-dark">
      <Link to="/" className="navbar-brand ms-3">Truck Management</Link>
      <div>
        <Link to="/trucks" className="btn btn-outline-light me-2">Trucks</Link>
        {user ? <button className="btn btn-danger" onClick={() => dispatch(logout())}>Logout</button> : <Link to="/login" className="btn btn-success">Login</Link>}
      </div>
    </nav>
  );
};

export default Navbar