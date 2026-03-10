import React, { useContext } from 'react';
import { View, Text, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components';
import { Strings } from '../../common';
import styles from './style';
import { AuthContext } from '../../context/authContext';
import { showToast } from '../../common/utils';

const Home = () => {
    const { user, logout } = useContext(AuthContext);

    const onLogout = () => {
        Alert.alert(
            Strings.Logout,
            Strings.logoutMsg,
            [
                {
                    text: Strings.Cancel,
                    style: "cancel",
                    onPress: () => console.log("Cancel Pressed"),
                },
                {
                    text: Strings.Logout,
                    style: "destructive",
                    onPress: () => {
                        logout();
                        showToast(Strings.Logout, Strings.LogoutSuccess, 'success')
                    },
                },
            ],
            { cancelable: true }
        );
    };


    return (
        <View style={styles.container}>
            <SafeAreaView edges={['top', 'left', 'right']} />
            <Text style={styles.title}>{Strings.Welcome}</Text>
            <View style={styles.subContainer}>
                <Text>{Strings.Name}: {user?.name}</Text>
                <Text>{Strings.Email}: {user?.email}</Text>
            </View>
            <View style={styles.btnView}>
                <Button mode="outlined" onPress={() => onLogout()}>{Strings.Logout}</Button>
            </View>
            <SafeAreaView edges={['bottom']} />
        </View>
    )
}
export default Home;