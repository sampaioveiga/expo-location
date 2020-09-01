import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import Constants from 'expo-constants';

export default function App() {
  const [actualPosition, setActualPosition] = useState(null);

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
          });
        }
      );
      
    })();
  });

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>{JSON.stringify(actualPosition)}</Text>
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
});