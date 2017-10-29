import React, { Component } from 'react'
import { View, Text } from 'react-native'


class WeatherDetail extends React.Component {
  static navigationOptions = {
    title: 'Weather Detail',
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View>
        <Text>Weather Detail</Text>
      </View>
    );
  }
}


export default WeatherDetail
