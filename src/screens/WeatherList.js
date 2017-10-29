import React, { Component } from 'react'
import { ListView, TouchableOpacity, ActivityIndicator, StyleSheet, View, Text } from 'react-native'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { fetchWeather, fetchForecast } from '../actions/'


class WeatherList extends Component {
  static navigationOptions = {
    title: 'Weather',
  };

  constructor() {
    super()

    this.dataSource = []
  }

  componentWillMount() {
    this.props.fetchWeather()
    this.createDataSource(this.props)
  }

  componentWillReceiveProps(nextProp) {
    this.createDataSource(nextProp)
  }

  createDataSource({weatherList}) {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.dataSource = ds.cloneWithRows(weatherList)
  }

  weatherItemClicked(city, temp) {
    const { navigate } = this.props.navigation;

    this.props.fetchForecast(city)
    navigate('WeatherDetail', {
      selectedCity: city,
      currentTemp: temp
    })
  }

  renderWeatherItem(data) {
    const temp = `${Math.round(data.main.temp)}°C`
    const location = `${data.name},${data.sys.country}`
    const { navigate } = this.props;

    return (
      <TouchableOpacity
        style={styles.weatherItem}
        activeOpacity={0.6}
        onPress={() => this.weatherItemClicked(location, temp)}>
        <Text style={styles.locationText}>{location}</Text>
        <Text style={styles.tempText}>{temp}</Text>
      </TouchableOpacity>
    )
  }

  renderContactList() {
		const { weatherList } = this.props;

		if(!weatherList || weatherList.length === 0) return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size='large' />
      </View>
    )

		return (
			<ListView
				enableEmptySections
				dataSource={this.dataSource}
				renderRow={(data) => this.renderWeatherItem(data)}
			/>
		)
	}

  render() {
    return (
      this.renderContactList()
    )
  }
}

const styles = StyleSheet.create({
  weatherItem: {
    backgroundColor: '#f2f2f2',
    marginBottom: 3,
    flex:1,
    height: 100,
    justifyContent: 'center',
    padding: 16
  },
  locationText: {
    fontSize: 20,
    color: '#5d5d5d',
    paddingBottom: 3
  },
  tempText: {
    fontSize: 14,
    color: '#5d5d5d'
  }
})

const mapStateToProps = (state) => {
  const { weatherList } = state.weather

  return {
    weatherList
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchWeather,
    fetchForecast
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(WeatherList)
