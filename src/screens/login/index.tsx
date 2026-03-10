import React, { useState, useContext } from 'react';
import { View, Image, TouchableOpacity, Keyboard } from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icons, Constants, CommonStyles, Utils, Strings } from '../../common';
import { Button, TextInput } from '../../components';
import styles from './style';
import { AuthContext } from '../../context/authContext';
import { showToast } from '../../common/utils';
import { TextInput as Input } from 'react-native-paper';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState({ value: '', error: '' });
    const [password, setPassword] = useState({ value: '', error: '' });
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useContext(AuthContext);

    const onLoginPressed = async () => {
        const emailError = Utils.emailValidator(email.value);
        const passwordError = Utils.passwordValidator(password.value);
        if (emailError || passwordError) {
            setEmail({ ...email, error: emailError });
            setPassword({ ...password, error: passwordError });
            return
        }
        Keyboard.dismiss();
        const response = await login(email.value, password.value);
        if (response) {
            showToast('Success', Strings.LoginSuccess, 'success');
        } else {
            showToast('Error', Strings.InvalidLogin, 'error');
        }
    }

    return (
        <View style={styles.container}>
            <SafeAreaView style={CommonStyles.backgroundPrimary} edges={['top', 'left', 'right']} />
            <Text style={styles.loginTitle}>{Strings.Login}</Text>
            <TextInput
                label={Strings.Email}
                returnKeyType="next"
                value={email.value}
                onChangeText={(text: string) => setEmail({ value: text, error: '' })}
                error={!!email.error}
                errorText={email.error}
                autoCapitalize="none"
                autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"
            />
            <TextInput
                label={Strings.Password}
                returnKeyType="done"
                value={password.value}
                onChangeText={(text: string) => setPassword({ value: text, error: '' })}
                error={!!password.error}
                errorText={password.error}
                secureTextEntry={!showPassword}
                right={
                    <Input.Icon
                        icon={() => <Image source={showPassword ? Icons.eye : Icons.eyeHide} style={styles.eyeStyle} />}
                        onPress={() => setShowPassword(!showPassword)}
                    />
                }
            />
            <View style={styles.forgotPassword}>
                <Text style={styles.forgot}>{Strings.ForgotPass}</Text>
            </View>
            <Button mode="contained" onPress={() => onLoginPressed()}>{Strings.Login}</Button>
            <View style={styles.row}>
                <Text style={styles.forgot}>{Strings.DoNotAcc}</Text>
                <TouchableOpacity onPress={() => navigation.navigate(Constants.Screen.SignUp)}>
                    <Text style={styles.link}> {Strings.SignUp}</Text>
                </TouchableOpacity>
            </View>
            <SafeAreaView edges={['bottom']} />
        </View>
    )
}

export default Login;