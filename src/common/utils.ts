import { Dimensions } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import Strings from './strings';
import Colors from './colors';
const { height, width } = Dimensions.get('window');
const aspectRatio = height / width;

// common method file

export const Capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const strReplace = (str) => {
    return (str && str.replace(/["']/g, ""))
}

export const isTabletBasedOnRatio = () => {
    if (aspectRatio > 1.6) {
        return false;
    } else {
        return true;
    }
}

export const emailValidator = (email) => {
    const re = /\S+@\S+\.\S+/
    if (!email) return Strings.EmailReq;
    if (!re.test(email)) return Strings.InvalidEmail;
    return ''
}

export const nameValidator = (name) => {
    if (!name) return Strings.NameReq
    return ''
}

export const passwordValidator = (password) => {
    if (!password) return Strings.PassRed
    if (password.length < 6) return Strings.PassLength
    return ''
}

export const confirmPasswordValidator = (password, confirmPassword) => {
    if (!confirmPassword) return Strings.CPassReq
    if (confirmPassword.length < 6) return Strings.CPassLength
    if (password.trim() !== confirmPassword.trim()) return Strings.PassSame
    return ''
}

export const showToast = (title = 'Error', message, type = 'error') => {
    showMessage({
        message: title,
        description: message,
        type,
        backgroundColor: type === 'error' ? Colors.Red1 : Colors.Green1,
        icon: {
            icon: type === 'error' ? 'danger' : type,
            position: 'left',
            style: { marginTop: 2 },
        },
    });
};