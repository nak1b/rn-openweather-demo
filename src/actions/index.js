import * as util from '../utils'

const WEATHER_API_KEY = 'd08731f8d3c76ec8400f8aa49de618af'

export const WEATHERS_FETCH_SUCCESS = 'weatherFetchSuccess'

const CITIES_CODE = [
  {name: 'Mumbai', id: 1275339},
  {name: 'Toronto', id: 6167865},
  {name: 'HK', id: 1818209},
  {name: 'Calgary', id: 5913490},
  {name: 'Vancouver', id: 6173331},
  {name: 'NewYork', id: 5128581}
]

export const fetchWeather = () => {
  return dispatch => {
    const locations = util.createLocationIdStr(CITIES_CODE)
    const URL = `http://api.openweathermap.org/data/2.5/group?id=${locations}&units=metric&appid=${WEATHER_API_KEY}`
    fetch(URL)
      .then(res => {
        const data = JSON.parse(res._bodyInit).list
        weatherFetchSuccess(dispatch, data)
      })
      .catch(err => {
        console.log(`Error fetching weather for city list: ${err}`)
      })
  }
}

const weatherFetchSuccess = (dispatch, data) => {
  dispatch({
    type: WEATHERS_FETCH_SUCCESS,
    payload: data
  })
}
