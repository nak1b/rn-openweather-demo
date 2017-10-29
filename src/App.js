import { StackNavigator } from 'react-navigation'

import WeatherList from './screens/WeatherList'
import WeatherDetail from './screens/WeatherDetail'

const RootNavigator = StackNavigator({
  WeatherList: {
    screen: WeatherList,
  },
  WeatherDetail: {
    screen: WeatherDetail,
  },
});



export default RootNavigator;
