import React, { Component } from 'react'

import { StackNavigator } from 'react-navigation'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { persistStore, persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/es/storage'
import { PersistGate } from 'redux-persist/es/integration/react'

import reducers from './reducers'
import Loading from './components/Loading'
import WeatherList from './screens/WeatherList'
import WeatherDetail from './screens/WeatherDetail'


const config = {
  key: 'root',
  storage,
}

const reducer = persistCombineReducers(config, reducers)
const createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore)

const store = createStoreWithMiddleware(reducer)
const persistor = persistStore(store)

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
        <PersistGate
          persistor={persistor}
          loading={<Loading />}
          >
          <RootNavigator />
        </PersistGate>
      </Provider>
    )
  }
}

export default App
