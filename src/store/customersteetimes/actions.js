import axios from "axios";
import * as types from "./constants";

export const fetchAllCustomersTeeTimes = () => async dispatch => {
  dispatch({
    type: types.FETCH_ALL_CUSTOMERS_TEE_TIMES_PENDING
  });
  try {
    let response = await axios.get(`http://localhost:8000/customersteetimes`);
    dispatch({
      type: types.FETCH_ALL_CUSTOMERS_TEE_TIMES_SUCCESS,
      payload: response.data
    });
  } catch (err) {
    dispatch({
      type: types.FETCH_ALL_CUSTOMERS_TEE_TIMES_FAILED,
      payload: err
    });
  }
};
