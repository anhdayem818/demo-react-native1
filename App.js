import React, { Component, Fragment, useState }  from 'react';
import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity, StatusBar, Image, ActivityIndicator, TextInput, Button  } from 'react-native';
import { WebView } from 'react-native-webview';
import BackgroundJob from "react-native-background-job";

const App= () => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Testing BackgroundJob</Text>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  form: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  textInput: {
    backgroundColor: '#fff',
    marginBottom: 5,
  },
});

export default App;
