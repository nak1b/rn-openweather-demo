import {
  WEATHERS_FETCH_SUCCESS,
  FORECAST_FETCH_SUCCESS
} from '../actions'

import _ from 'lodash'

const INITIAL_STATE = {
  weatherList: [],
  weatherDetail: []
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case WEATHERS_FETCH_SUCCESS:
      return {
        ...state,
        weatherList: action.payload || []
      }

    case FORECAST_FETCH_SUCCESS:
      const weathers = _.values(action.payload);
      return {
        ...state,
        weatherDetail: weathers.slice(0, 24)
      }

    default:
      return state
  }
}
