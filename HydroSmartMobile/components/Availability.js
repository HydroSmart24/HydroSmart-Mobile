import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";

export default function Availability() {
  const [averageDistance, setAverageDistance] = useState(null);
  const [printedAverage, setPrintedAverage] = useState(null);

  useEffect(() => {
    const fetchAverageDistances = async () => {
      try {
        const avgDistanceRef = collection(db, 'avgDistance');
  
        const q = query(avgDistanceRef, orderBy('time', 'desc'), limit(3));
        const querySnapshot = await getDocs(q);
  
        let totalDistance = 0;
        let count = 0;
  
        // Log the latest 3 distance values
        console.log('Latest 3 distance values:');
        querySnapshot.forEach((doc) => {
          const { time, distance } = doc.data();
          console.log('Time:', time, 'Distance:', distance);
          totalDistance += distance;
          count++;
        });
  
        // Calculate the average of the last 3 average distances
        if (count > 0) {
          const avg = totalDistance / count;
          console.log('Average distance:', Math.floor(avg));
          if (printedAverage === null || Math.abs(avg - printedAverage) > 10) {
            setAverageDistance(Math.floor(avg));
            if (Math.abs(avg - printedAverage) > 10) {
              setPrintedAverage(Math.floor(avg));
              console.log('Significant change in average distance. New printed average:', Math.floor(avg));
            } else {
              console.log('No significant change in average distance');
            }
          } else {
            console.log('No significant change in average distance');
          }
        }
      } catch (error) {
        console.error('Error fetching average distances:', error);
      }
    };
  
    // Asynchronous function 
    fetchAverageDistances();
    const interval = setInterval(fetchAverageDistances, 180000); // 180000 ms = 3 minutes
  
    return () => clearInterval(interval); // Cleanup on unmount
  }, [printedAverage]); // Add printedAverage to the dependency array
    

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.available}>{averageDistance !== null ? averageDistance.toFixed(2) : '-'}</Text>
        <Text style={styles.liters}>Liters</Text>
      </View>
    </View>
  );
}

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
  liters: {
    fontSize: 18,
  },
});
