import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Splash, Login, Home, SignUp } from './screens';
import { Constants } from './common';
import { AuthContext } from './context/authContext';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator initialRouteName={Constants.Screen.Home} screenOptions={{ headerShown: false }}>
            <Stack.Screen name={Constants.Screen.Home} component={Home} />
        </Stack.Navigator>
    );
}

const AuthStack = () => {
    return (
        <Stack.Navigator initialRouteName={Constants.Screen.Login} screenOptions={{ headerShown: false }}>
            <Stack.Screen name={Constants.Screen.Login} component={Login} />
            <Stack.Screen name={Constants.Screen.SignUp} component={SignUp} />
        </Stack.Navigator>
    );
}

const AppStackNavigator = () => {
    const { user, loader } = useContext(AuthContext);

    if(loader) {
       return <Splash />
    }

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {user?.logged ?
                <Stack.Screen name={Constants.Screen.HomeStack} component={HomeStack} />
                :
                <Stack.Screen name={Constants.Screen.AuthStack} component={AuthStack} />
            }
        </Stack.Navigator>
    );
}

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <AppStackNavigator />
        </NavigationContainer>
    );
};

export default AppNavigator;