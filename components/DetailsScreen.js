import * as React from 'react';
import {
    Text, View, Image, SafeAreaView,
    ScrollView,
    StyleSheet,
    FlatList,
    ImageBackground,
    Dimensions,
    TouchableOpacity
} from 'react-native'
import categoriesData from '../assets/data/categoriesData';
import colors from '../assets/theme/colors'
import productsData from '../assets/data/productsData';

export default DetailsScreen = ({ route, navigation }) => {
    const { item } = route.params;
    return (
        <View style={styles.container}>
            <SafeAreaView>
                <ScrollView contentInsetAdjustmentBehavior="automatic" showsVerticalScrollIndicator={false}>
                    {/* Header */}
                    <View style={styles.headerWrapper}>
                        <View style={styles.headerLeftGoBack}>
                            <Image source={require('../assets/images/goback.png')} style={{ width: 25, height: 25 }} />
                        </View>
                        <View style={styles.headerRightCart}>
                            <Image source={require('../assets/images/el_shopping-cart.png')} style={{ width: 18, height: 18 }} />
                        </View>
                    </View>

                    {/* Showcase Product */}
                    <View style={styles.productImageWrapper}>
                        <Image source={item.largeImage} style={{width: item.dX, height: item.dY}}></Image>
                    </View>

                    {/* View Info Container Box */}
                    <View style={styles.viewInfoContainerWrapper}>

                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}
const win = Dimensions.get('window');
const ratio = (win.width - 50) / 350;
console.log(ratio)
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    headerWrapper: {
        marginTop: 30,
        marginHorizontal: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 10
    },
    headerLeftGoBack: {
        backgroundColor: colors.white,
        width: 43,
        height: 43,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 2,
    },
    headerRightCart: {
        backgroundColor: colors.white,
        width: 43,
        height: 43,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 2,
    },
    productImageWrapper: {
        marginTop: 40,
        height: 230,
        marginHorizontal: 25,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    viewInfoContainerWrapper: {
        flex: 1,
        minHeight: 515,
        maxHeight: 'auto',
        width: '100%',
        backgroundColor: colors.white,
        padding: 30,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.46,
        shadowRadius: 11.14,
        
        elevation: 17,
    }
})