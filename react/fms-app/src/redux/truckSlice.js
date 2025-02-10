import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/trucks";


const trucksAdapter = createEntityAdapter({
  selectId: (truck) => truck.id, // Define unique ID field
  sortComparer: (a, b) => a.model.localeCompare(b.model) // Optional: Sort by model
});

const initialState = trucksAdapter.getInitialState({
  status: "idle",
  error: null
});

// Async Thunks
export const fetchTrucks = createAsyncThunk("trucks/fetchTrucks", async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

export const fetchTruckById = createAsyncThunk("trucks/fetchTruckById", async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
});

export const createTruck = createAsyncThunk("trucks/createTruck", async (truck, { getState }) => {
  const { user } = getState().auth;
  const response = await axios.post(API_URL, truck, { headers: { Authorization: `Bearer ${user?.token}` } });
  return response.data;
});

export const updateTruck = createAsyncThunk("trucks/updateTruck", async ({ id, truck }, { getState }) => {
  const { user } = getState().auth;
  const response = await axios.put(`${API_URL}/${id}`, truck, { headers: { Authorization: `Bearer ${user?.token}` } });
  return response.data;
});

export const deleteTruck = createAsyncThunk("trucks/deleteTruck", async (id, { getState }) => {
  const { user } = getState().auth;
  await axios.delete(`${API_URL}/${id}`, { headers: { Authorization: `Bearer ${user?.token}` } });
  return id;
});

// Slice
const truckSlice = createSlice({
  name: "trucks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrucks.fulfilled, (state, action) => {
        trucksAdapter.setAll(state, action.payload);
      })
      .addCase(fetchTruckById.fulfilled, (state, action) => {
        trucksAdapter.upsertOne(state, action.payload);
      })
      .addCase(createTruck.fulfilled, (state, action) => {
        trucksAdapter.addOne(state, action.payload);
      })
      .addCase(updateTruck.fulfilled, (state, action) => {
        trucksAdapter.upsertOne(state, action.payload);
      })
      .addCase(deleteTruck.fulfilled, (state, action) => {
        trucksAdapter.removeOne(state, action.payload);
      });
  }
});

// Selectors
export const { 
  selectAll: selectAllTrucks, selectById: selectTruckById 
} = trucksAdapter.getSelectors((state) => state.trucks);

export default truckSlice.reducer;


// ----


// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const API_URL = "http://localhost:5000/trucks";

// // Async Actions
// export const fetchTrucks = createAsyncThunk("trucks/fetchTrucks", async () => {
//   const response = await axios.get(API_URL);
//   return response.data;
// });

// export const fetchTruckById = createAsyncThunk("trucks/fetchTruckById", async (id, { getState }) => {
//     const { user } = getState().auth;
//     const response = await axios.get(`${API_URL}/${id}`, { headers: { Authorization: `Bearer ${user?.token}` } });
//     return response.data;
//   });  

// export const createTruck = createAsyncThunk("trucks/createTruck", async (truck, { getState }) => {
//   const { user } = getState().auth;
//   const response = await axios.post(API_URL, truck, { headers: { Authorization: `Bearer ${user?.token}` } });
//   return response.data;
// });

// export const updateTruck = createAsyncThunk("trucks/updateTruck", async ({ id, truck }, { getState }) => {
//   const { user } = getState().auth;
//   const response = await axios.put(`${API_URL}/${id}`, truck, { headers: { Authorization: `Bearer ${user?.token}` } });
//   return response.data;
// });

// export const deleteTruck = createAsyncThunk("trucks/deleteTruck", async (id, { getState }) => {
//   const { user } = getState().auth;
//   await axios.delete(`${API_URL}/${id}`, { headers: { Authorization: `Bearer ${user?.token}` } });
//   return id;
// });

// // Slice
// const truckSlice = createSlice({
//   name: "trucks",
//   initialState: { trucks: [], status: "idle", error: null },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchTrucks.fulfilled, (state, action) => { state.trucks = action.payload; })
//       .addCase(fetchTruckById.fulfilled, (state, action) => { state.truck = action.payload; })
//       .addCase(createTruck.fulfilled, (state, action) => { state.trucks.push(action.payload); })
//       .addCase(updateTruck.fulfilled, (state, action) => {
//         const index = state.trucks.findIndex(t => t.id === action.payload.id);
//         if (index !== -1) state.trucks[index] = action.payload;
//       })
//       .addCase(deleteTruck.fulfilled, (state, action) => {
//         state.trucks = state.trucks.filter(t => t.id !== action.payload);
//       });
//   }
// });

// export default truckSlice.reducer;
