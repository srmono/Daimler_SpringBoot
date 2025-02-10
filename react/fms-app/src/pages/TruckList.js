import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrucks, deleteTruck, selectAllTrucks } from '../redux/truckSlice';
import { Link } from 'react-router-dom';

function TruckList() {

    const dispatch = useDispatch();
    const trucks = useSelector(selectAllTrucks); 
    const {user} = useSelector(state => state.auth)

    useEffect(() => {
        dispatch(fetchTrucks())
    }, [dispatch])

  return (
    <div className='container mt-5'>
        <h1> Truck List</h1>
        {user && <Link to="/trucks/new" className='btn btn-primary mb-3'> Add Truck </Link>}
        {
            trucks.length === 0 ? 
            ( <p> No Trucks Available</p>) : 
            ( 
            <table className='table  table-bordered'>
                 <thead className="thead-dark">
                    <tr>
                        <th> ID</th>
                        <th> Model</th>
                        <th> Status</th>
                        {user && <th> Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    { trucks.map( (truck, index) => (
                        <tr key={truck.id}>
                            <td>{index + 1}</td>
                            <td>{truck.model}</td>
                            <td>{truck.status}</td>
                            { user && 
                                <td> 
                                    <Link to={`/trucks/edit/${truck.id}`} className='btn btn-warning btn-sm'> Edit </Link>
                                    <button 
                                        className='btn btn-danger btn-sm ms-2' 
                                        onClick={() => dispatch(deleteTruck(truck.id))}
                                        > Delete</button>
                                 </td>
                            }
                        </tr>
                    ))}
                </tbody>
            </table>
            )
        }
    </div>
  )
}

export default TruckList