import {
  FETCH_ALL_CUSTOMERS_PENDING,
  FETCH_ALL_CUSTOMERS_SUCCESS,
  FETCH_ALL_CUSTOMERS_FAILED,
  ADD_NEW_CUSTOMER_PENDING,
  ADD_NEW_CUSTOMER_SUCCESS,
  ADD_NEW_CUSTOMER_FAILED,
  REMOVE_CUSTOMER_PENDING,
  REMOVE_CUSTOMER_SUCCESS,
  REMOVE_CUSTOMER_FAILED,
  UPDATE_CUSTOMER_PENDING,
  UPDATE_CUSTOMER_FAILED,
  UPDATE_CUSTOMER_SUCCESS
} from "./constants";

const initialState = {
  all: [],
  err: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_CUSTOMERS_PENDING:
    case ADD_NEW_CUSTOMER_PENDING:
    case REMOVE_CUSTOMER_PENDING:
    case UPDATE_CUSTOMER_PENDING:
      return state;
    case FETCH_ALL_CUSTOMERS_SUCCESS:
      // case UPDATE_CUSTOMER_SUCCESS:
      return {
        ...state,
        all: action.payload
      };

    case ADD_NEW_CUSTOMER_SUCCESS:
      return {
        ...state,
        all: [...state.all, action.payload]
      };

    case UPDATE_CUSTOMER_SUCCESS:
      return {
        ...state,
        all: [
          ...state.all.filter(CUSTOMER => CUSTOMER.id !== action.payload.id),
          action.payload
        ]
      };

    case REMOVE_CUSTOMER_SUCCESS:
      return {
        ...state,
        all: state.all.filter(CUSTOMER => CUSTOMER.id !== action.payload.id)
      };

    case FETCH_ALL_CUSTOMERS_FAILED:
    case ADD_NEW_CUSTOMER_FAILED:
    case REMOVE_CUSTOMER_FAILED:
    case UPDATE_CUSTOMER_FAILED:
      return {
        ...state,
        err: action.payload
      };
    default:
      return state;
  }
};
