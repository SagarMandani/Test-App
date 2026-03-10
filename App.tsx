import React from 'react'
import { StatusBar } from 'react-native';
import { Colors } from './src/common';
import AppNavigator from './src/router';
import FlashMessage from 'react-native-flash-message';
import { AuthProvider } from './src/context/authContext';

const App = () => {

  return (
    <AuthProvider>
      <StatusBar backgroundColor={Colors.Primary} barStyle={"dark-content"} />
      <AppNavigator />
      <FlashMessage position="top" />
    </AuthProvider>
  )
}

export default App;