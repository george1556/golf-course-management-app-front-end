import axios from "axios";
import * as types from "./constants";
import {
  ADD_NEW_TEE_TIME_SUCCESS,
  ADD_NEW_TEE_TIME_FAILED,
  UPDATE_TEE_TIME_SUCCESS,
  UPDATE_TEE_TIME_FAILED
} from "./constants";

export const fetchAllTeeTimes = () => async dispatch => {
  dispatch({
    type: types.FETCH_ALL_TEE_TIMES_PENDING
  });
  try {
    let response = await axios.get(`http://localhost:8000/teetimes`);
    dispatch({
      type: types.FETCH_ALL_TEE_TIMES_SUCCESS,
      payload: response.data
    });
  } catch (err) {
    dispatch({
      type: types.FETCH_ALL_TEE_TIMES_FAILED,
      payload: err
    });
  }
};

// Add new TEE_TIME
export const addNewTeeTime = newTeeTime => async dispatch => {
  dispatch({
    type: types.ADD_NEW_TEE_TIME_PENDING
  });

  try {
    let response = await axios.post(
      `http://localhost:8000/teetimes`,
      newTeeTime
    );
    dispatch({
      type: ADD_NEW_TEE_TIME_SUCCESS,
      payload: response.data
    });
  } catch (err) {
    dispatch({
      type: ADD_NEW_TEE_TIME_FAILED,
      payload: err
    });
  }
};

// Delete a vehicle
export const deleteTeeTime = id => async dispatch => {
  dispatch({
    type: types.REMOVE_TEE_TIME_PENDING
  });
  try {
    let response = await axios.delete(`http://localhost:8000/teetimes/${id}`);
    dispatch({
      type: types.REMOVE_TEE_TIME_SUCCESS,
      payload: response.data
    });
  } catch (err) {
    dispatch({
      type: types.REMOVE_TEE_TIME_FAILED,
      payload: err
    });
  }
};

// Update Tee Time
export const updateTeeTime = (updateTeeTime, id) => async dispatch => {
  dispatch({
    type: types.UPDATE_TEE_TIME_PENDING
  });

  try {
    let response = await axios.patch(
      `http://localhost:8000/teetimes/${id}`,
      updateTeeTime
    );
    dispatch({
      type: UPDATE_TEE_TIME_SUCCESS,
      payload: response.data
    });
  } catch (err) {
    dispatch({
      type: UPDATE_TEE_TIME_FAILED,
      payload: err
    });
  }
};
