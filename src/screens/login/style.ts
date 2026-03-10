import { StyleSheet } from 'react-native';
import { Colors } from '../../common';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginTitle: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    forgotPassword: {
        width: '100%',
        alignItems: 'flex-end',
        marginBottom: 5,
    },
    row: {
        flexDirection: 'row',
        marginTop: 4,
    },
    forgot: {
        fontSize: 13,
        color: Colors.Black,
    },
    link: {
        fontWeight: 'bold',
        color: Colors.Black,
    },
    eyeStyle: {
        height: 16,
        width: 16,
        tintColor: Colors.Black
    }
})

export default styles;