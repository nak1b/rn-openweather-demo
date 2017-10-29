import { WEATHERS_FETCH_SUCCESS } from '../actions'

const INITIAL_STATE = {
  weatherList: []
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case WEATHERS_FETCH_SUCCESS:
      return {
        ...state,
        weatherList: action.payload || []
      }

    default:
      return state
  }
}
