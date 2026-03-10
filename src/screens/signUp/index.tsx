import React, { useState, useContext } from 'react'
import { View, TouchableOpacity, Keyboard, Image } from 'react-native'
import { Text, TextInput as Input } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Utils, Strings, Icons } from '../../common';
import { Button, TextInput, Header } from '../../components';
import styles from './style';
import { AuthContext } from '../../context/authContext';
import { showToast } from '../../common/utils';

const SignUp = ({ navigation }) => {
    const [name, setName] = useState({ value: '', error: '' });
    const [email, setEmail] = useState({ value: '', error: '' });
    const [password, setPassword] = useState({ value: '', error: '' });
    const [confirmPassword, setConfirmPassword] = useState({ value: '', error: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [showCPassword, setShowCPassword] = useState(false);
    const { signup } = useContext(AuthContext);

    const onSignUpPressed = async () => {
        const nameError = Utils.nameValidator(name.value);
        const emailError = Utils.emailValidator(email.value);
        const passwordError = Utils.passwordValidator(password.value);
        const confirmPasswordError = Utils.confirmPasswordValidator(password.value, confirmPassword.value);
        if (nameError || emailError || passwordError || confirmPasswordError) {
            setName({ ...name, error: nameError });
            setEmail({ ...email, error: emailError });
            setPassword({ ...password, error: passwordError });
            setConfirmPassword({ ...confirmPassword, error: confirmPasswordError });
            return;
        }
        Keyboard.dismiss();
        await signup(name?.value, email?.value, password?.value, false);
        showToast('Success', Strings.SignUpSuccess, 'success');
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <SafeAreaView edges={['top', 'left', 'right']} />
            <Header title={Strings.CreateAccount} goBack={() => navigation.goBack()} />
            <View style={styles.subContainer}>
                <TextInput
                    label={Strings.Name}
                    returnKeyType="next"
                    value={name.value}
                    onChangeText={(text: string) => setName({ value: text, error: '' })}
                    error={!!name.error}
                    errorText={name.error}
                />
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
                    returnKeyType="next"
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
                <TextInput
                    label={Strings.CPassword}
                    returnKeyType="done"
                    value={confirmPassword.value}
                    onChangeText={(text: string) => setConfirmPassword({ value: text, error: '' })}
                    error={!!confirmPassword.error}
                    errorText={confirmPassword.error}
                    secureTextEntry={!showCPassword}
                    right={
                        <Input.Icon
                            icon={() => <Image source={showCPassword ? Icons.eye : Icons.eyeHide} style={styles.eyeStyle} />}
                            onPress={() => setShowCPassword(!showCPassword)}
                        />
                    }
                />
                <Button mode="contained" onPress={() => onSignUpPressed()} style={styles.singUpBtn}>{Strings.SignUp}</Button>
                <View style={styles.row}>
                    <Text>{Strings.alreadyAcc} </Text>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={styles.link}>{Strings.Login}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <SafeAreaView edges={['bottom']} />
        </View>
    )
}

export default SignUp;