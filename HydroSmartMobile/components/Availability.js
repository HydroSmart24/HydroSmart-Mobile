import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Availability () {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.available}>1500</Text>
        <Text style={styles.liters}>Liters</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  box: {
    width: 200,
    height: 200,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#1089B8',
  },
  available: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  liters:{
    fontSize: 18,
  }
});
