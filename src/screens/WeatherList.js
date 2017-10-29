import React, { Component } from 'react'
import { ListView, StyleSheet, View, Text, Button } from 'react-native'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { fetchWeather } from '../actions/'
import _ from 'lodash'

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

  renderWeatherItem(data) {
    const temp = `${Math.round(data.main.temp)}°C`
    const location = `${data.name}, ${data.sys.country}`

    return (
      <View style={styles.weatherItem}>
        <Text style={styles.locationText}>{location}</Text>
        <Text style={styles.tempText}>{temp}</Text>
      </View>
    )
  }

  renderContactList() {
		const { weatherList } = this.props;

		if(!weatherList || weatherList.length === 0) return <View />

    // <Button
    //   title="Go to Weather Details"
    //   onPress={() =>
    //     navigate('WeatherDetail')
    //   }
    // />
		return (
			<ListView
				enableEmptySections
				dataSource={this.dataSource}
				renderRow={(data) => this.renderWeatherItem(data)}
			/>
		)
	}

  render() {
    const { navigate } = this.props.navigation;

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
    fetchWeather
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(WeatherList)
