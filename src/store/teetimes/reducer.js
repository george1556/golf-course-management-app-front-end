import {
  FETCH_ALL_TEE_TIMES_PENDING,
  FETCH_ALL_TEE_TIMES_SUCCESS,
  FETCH_ALL_TEE_TIMES_FAILED,
  ADD_NEW_TEE_TIME_PENDING,
  ADD_NEW_TEE_TIME_SUCCESS,
  ADD_NEW_TEE_TIME_FAILED,
  REMOVE_TEE_TIME_PENDING,
  REMOVE_TEE_TIME_SUCCESS,
  REMOVE_TEE_TIME_FAILED,
  UPDATE_TEE_TIME_PENDING,
  UPDATE_TEE_TIME_FAILED,
  UPDATE_TEE_TIME_SUCCESS
} from "./constants";

const initialState = {
  all: [],
  err: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_TEE_TIMES_PENDING:
    case ADD_NEW_TEE_TIME_PENDING:
    case REMOVE_TEE_TIME_PENDING:
    case UPDATE_TEE_TIME_PENDING:
      return state;
    case FETCH_ALL_TEE_TIMES_SUCCESS:
      // case UPDATE_TEE_TIME_SUCCESS:
      return {
        ...state,
        all: action.payload
      };

    case ADD_NEW_TEE_TIME_SUCCESS:
      return {
        ...state,
        all: [...state.all, action.payload]
      };

    case UPDATE_TEE_TIME_SUCCESS:
      return {
        ...state,
        all: [
          ...state.all.filter(TEE_TIME => TEE_TIME.id !== action.payload.id),
          action.payload
        ]
      };

    case REMOVE_TEE_TIME_SUCCESS:
      return {
        ...state,
        all: state.all.filter(TEE_TIME => TEE_TIME.id !== action.payload.id)
      };

    case FETCH_ALL_TEE_TIMES_FAILED:
    case ADD_NEW_TEE_TIME_FAILED:
    case REMOVE_TEE_TIME_FAILED:
    case UPDATE_TEE_TIME_FAILED:
      return {
        ...state,
        err: action.payload
      };
    default:
      return state;
  }
};
