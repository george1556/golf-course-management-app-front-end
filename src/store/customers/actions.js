import axios from "axios";
import * as types from "./constants";
import {
  ADD_NEW_CUSTOMER_SUCCESS,
  ADD_NEW_CUSTOMER_FAILED,
  UPDATE_CUSTOMER_SUCCESS,
  UPDATE_CUSTOMER_FAILED
} from "./constants";

export const fetchAllCustomers = () => async dispatch => {
  dispatch({
    type: types.FETCH_ALL_CUSTOMERS_PENDING
  });
  try {
    let response = await axios.get(`http://localhost:8000/customers`);
    dispatch({
      type: types.FETCH_ALL_CUSTOMERS_SUCCESS,
      payload: response.data
    });
  } catch (err) {
    dispatch({
      type: types.FETCH_ALL_CUSTOMERS_FAILED,
      payload: err
    });
  }
};

// // Add new CUSTOMER
// export const addNewCUSTOMER = newCUSTOMER => async dispatch => {
//   dispatch({
//     type: types.ADD_NEW_CUSTOMER_PENDING
//   });

//   try {
//     let response = await axios.post(
//       `http://localhost:8082/api/stealership/CUSTOMERs`,
//       newCUSTOMER
//     );
//     dispatch({
//       type: ADD_NEW_CUSTOMER_SUCCESS,
//       payload: response.data
//     });
//   } catch (err) {
//     dispatch({
//       type: ADD_NEW_CUSTOMER_FAILED,
//       payload: err
//     });
//   }
// };

// // Delete a vehicle
// export const deleteCUSTOMER = id => async dispatch => {
//   dispatch({
//     type: types.REMOVE_CUSTOMER_PENDING
//   });
//   try {
//     let response = await axios.delete(
//       `http://localhost:8082/api/stealership/CUSTOMERs/${id}`
//     );
//     dispatch({
//       type: types.REMOVE_CUSTOMER_SUCCESS,
//       payload: response.data
//     });
//   } catch (err) {
//     dispatch({
//       type: types.REMOVE_CUSTOMER_FAILED,
//       payload: err
//     });
//   }
// };

// // Update a Vehicle
// export const updateVehicle = (updateCUSTOMER, id) => async dispatch => {
//   dispatch({
//     type: types.UPDATE_CUSTOMER_PENDING
//   });

//   try {
//     let response = await axios.patch(
//       `http://localhost:8082/api/stealership/CUSTOMERs/${id}`,
//       updateCUSTOMER
//     );
//     dispatch({
//       type: UPDATE_CUSTOMER_SUCCESS,
//       payload: response.data
//     });
//   } catch (err) {
//     dispatch({
//       type: UPDATE_CUSTOMER_FAILED,
//       payload: err
//     });
//   }
// };
