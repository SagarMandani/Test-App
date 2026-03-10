import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    subContainer: {
        flex: 1,
        padding: 20,
        paddingTop: 0,
    },
    appLogo: {
        height: 50,
        width: 150,
    },
    title: {
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10
    },
    btnView: {
        marginBottom: 10,
        marginLeft: 20,
        marginRight: 20 
    },
})

export default styles;