import React, { Component } from 'react'
import { Button } from 'react-native'


class WeatherList extends Component {
  static navigationOptions = {
    title: 'Weather',
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <Button
        title="Go to Weather Details"
        onPress={() =>
          navigate('WeatherDetail')
        }
      />
    );
  }
}

export default WeatherList
