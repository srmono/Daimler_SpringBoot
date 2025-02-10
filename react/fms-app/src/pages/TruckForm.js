import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTruckById,createTruck, updateTruck, selectTruckById } from '../redux/truckSlice';
import { useNavigate, useParams } from 'react-router-dom';

function TruckForm() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {status, error } = useSelector(state => state.trucks)
    const truckToEdit = useSelector(state => selectTruckById(state, id))

    useEffect( () => {
        if( id && !truckToEdit){
            dispatch(fetchTruckById(id))
        } else if(truckToEdit){
            setFormData(truckToEdit)
        }
    }, [id, truckToEdit, dispatch])

    const [formData, setFormData] = useState({model: "", status: "", details: ""})

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(id){
            await dispatch(updateTruck(
                {id, truck: formData}
            ))
        } else {
            await dispatch(createTruck(formData))
        }

        navigate("/trucks")
    }

  return (
    <>
        <div className='container mt-5'>
            <h2> {id ? "Edit Truck" : "Add Truck"} </h2>
            { status === "loading" && <p>Loading...</p>}
            { status === "failed" && <p className='text-danger'>Error: {error}</p>}

            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label className='form-label'> Model</label>
                    <input 
                        type='text'
                        name='model'
                        value={formData.model}
                        className='form-control'
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='mb-3'>
                    <label className='form-label'> Status</label>
                    <input 
                        type='text'
                        name='status'
                        value={formData.status}
                        className='form-control'
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='mb-3'>
                    <label className='form-label'> Details</label>
                    <textarea 
                        name='details'
                        value={formData.details}
                        className='form-control'
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type='submit' className='btn btn-success'> {id ? "Update" : "Create"} </button>
            </form>
        </div>
    </>
  )
}

export default TruckForm