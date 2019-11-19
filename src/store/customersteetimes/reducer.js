import {
  FETCH_ALL_CUSTOMERS_TEE_TIMES_PENDING,
  FETCH_ALL_CUSTOMERS_TEE_TIMES_SUCCESS,
  FETCH_ALL_CUSTOMERS_TEE_TIMES_FAILED
} from "./constants";

const initialState = {
  all: [],
  err: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_CUSTOMERS_TEE_TIMES_PENDING:
      return state;
    case FETCH_ALL_CUSTOMERS_TEE_TIMES_SUCCESS:
      return {
        ...state,
        all: action.payload
      };

    case FETCH_ALL_CUSTOMERS_TEE_TIMES_FAILED:
      return {
        ...state,
        err: action.payload
      };
    default:
      return state;
  }
};
