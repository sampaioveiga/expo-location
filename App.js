import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import Constants from 'expo-constants';

export default function App() {
  const [actualPosition, setActualPosition] = useState({
    latitude: 41.810313,
    longitude: -6.759889,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [region, setRegion] = useState({
    latitude: 41.810313,
    longitude: -6.759889,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  useEffect(() => {
    (async () => {          // initialize location
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
    
      // foreground task
      await Location.watchPositionAsync(
        {accuracy: Location.Accuracy.BestForNavigation, distanceInterval: 10},
        (position) => {
          setActualPosition({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            speed: position.coords.speed,
            heading: position.coords.heading,
            altitude: position.coords.altitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          });
        }
      );
      
    })();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        region={actualPosition}
      >
        <Marker
          coordinate={actualPosition}
          title={'Marker'}
          description={'Desc'}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});