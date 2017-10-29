import React, { Component } from 'react'
import { View, Text, StyleSheet, ActivityIndicator, ListView } from 'react-native'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Loading from '../components/Loading'

class WeatherDetail extends React.Component {
  static navigationOptions = {
    title: 'Weather Detail',
  };

  constructor() {
    super()

    this.dataSource = []
  }

  componentWillMount() {
    this.createDataSource(this.props)
  }

  componentWillReceiveProps(nextProp) {
    this.createDataSource(nextProp)
  }

  createDataSource({weatherDetail}) {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.dataSource = ds.cloneWithRows(weatherDetail)
  }

  renderForecastItem(data) {
    return (
      <View style={styles.forecastItem}>
        <Text style={{color: '#5d5d5d', fontSize: 17}}>{data.dt_txt}</Text>
        <View style={{color: '#444444', flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text>Max Temp: {data.main.temp_max}</Text>
          <Text>Low Temp: {data.main.temp_min}</Text>
        </View>
        <Text>Humidity: {data.main.humidity}</Text>
      </View>
    )
  }

  renderForecast() {
		const { weatherDetail } = this.props;

		if(!weatherDetail || weatherDetail.length === 0) return <Loading />

		return (
			<ListView
				enableEmptySections
				dataSource={this.dataSource}
				renderRow={(data) => this.renderForecastItem(data)}
			/>
		)
	}

  render() {
    const { navigate, state } = this.props.navigation;

    return (
      <View style={{flex: 1}}>
        <View style={styles.header}>
          <Text style={styles.cityText}>{state.params.selectedCity}</Text>
          <Text style={styles.tempText}>{state.params.currentTemp}</Text>
        </View>
        <View style={{flex: 1, backgroundColor: '#f3f3f3'}}>
          {this.renderForecast()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF'
  },
  cityText: {
    color: '#5d5d5d',
    fontSize: 24,
    paddingBottom: 4
  },
  tempText: {
    color: '#5d5d5d',
    fontSize: 17
  },
  forecastItem: {
    height: 100,
    marginBottom: 4,
    backgroundColor: '#f2f2f2',
    flex: 1,
    padding: 16
  }
})

const mapStateToProps = (state) => {
  const { weatherDetail } = state.weather

  return {
    weatherDetail
  }
}

export default connect(mapStateToProps)(WeatherDetail)
