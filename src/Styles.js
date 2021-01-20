import {  StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },
    col: {
        flex: 1,
    },
    name: {
        color: '#5a647d',
        fontWeight: 'bold',
        fontSize: 30
    },
    price: {
        fontWeight: 'bold',
        marginBottom: 10
    },
    description: {
        fontSize: 16,
        // color: '#c1c4cd'
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

    },
    cartView: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        backgroundColor: '#fcf6ef',
        borderWidth: 2, 
        borderColor: '#fcb96c',
        marginHorizontal: 15,
        marginVertical: 6,
    },
    cartProductView: {
        flex: 1,
        flexDirection: 'row', 
        marginVertical: 7,
    },
    cartTableHeader: {
        flex: 1,
        flexDirection: 'row', 
        marginTop: 10,
        paddingVertical: 10,
        borderBottomWidth: 2,
        borderBottomColor: '#fcb96c',
    },
    cartTableNormalCell: { 
        flex: 1,
        alignSelf: 'center',
        alignItems: 'center',
    }
});
export default styles;
