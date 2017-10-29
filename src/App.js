import React, { Component } from 'react'

import { StackNavigator } from 'react-navigation'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import reducers from './reducers'

import WeatherList from './screens/WeatherList'
import WeatherDetail from './screens/WeatherDetail'

const createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore)
const store = createStoreWithMiddleware(reducers)


const RootNavigator = StackNavigator({
  WeatherList: {
    screen: WeatherList,
  },
  WeatherDetail: {
    screen: WeatherDetail,
  },
});

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RootNavigator />
      </Provider>
    )
  }
}

export default App
