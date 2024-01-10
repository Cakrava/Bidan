import {StyleSheet, View, ActivityIndicator} from 'react-native';
import React from 'react';
import col from '../assets/ColorHunt';

export default function LoadData({loading, page}) {
  // Pastikan bahwa komponen hanya merender ActivityIndicator
  // ketika loading true dan page sama dengan 1
  if (loading && page === 1) {
    return (
      <View style={{justifyContent: 'center'}}>
        <ActivityIndicator size="large" color={col.darkpink} />
      </View>
    );
  }

  // Jika tidak dalam loading state atau page bukan 1, render null atau komponen lain
  return null;
}
