import { StyleSheet } from 'react-native'
import { Colors } from '../../common';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    subContainer: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginTitle: {
        fontSize: 26,
        fontWeight: 'bold',
    },
    row: {
        flexDirection: 'row',
        marginTop: 4,
    },
    link: {
        fontWeight: 'bold',
        color: Colors.Black,
    },
    singUpBtn: {
        marginTop: 14
    },
    eyeStyle: {
        height: 16,
        width: 16,
        tintColor: Colors.Black
    }
})

export default styles;