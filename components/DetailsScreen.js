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
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <View style={styles.headerLeftGoBack}>
                                <Image source={require('../assets/images/goback.png')} style={{ width: 25, height: 25 }} />
                            </View>
                        </TouchableOpacity>

                        <View style={styles.headerRightCart}>
                            <Image source={require('../assets/images/el_shopping-cart.png')} style={{ width: 18, height: 18 }} />
                        </View>
                    </View>

                    {/* Showcase Product */}
                    <View style={styles.productImageWrapper}>
                        <Image source={item.largeImage} style={{ width: item.dX, height: item.dY }}></Image>
                    </View>

                    {/* View Info Container Box */}
                    <View style={styles.viewInfoContainerWrapper}>
                        <Text style={styles.fullProductName}>{item.fullProductName}</Text>
                        <View style={styles.reviewWrapper}>
                            <View style={styles.starsWrapper}>
                                <Image source={require('../assets/images/star-filled.png')} style={styles.star} />
                                <Image source={require('../assets/images/star-filled.png')} style={styles.star} />
                                <Image source={require('../assets/images/star-filled.png')} style={styles.star} />
                                <Image source={require('../assets/images/star-filled.png')} style={styles.star} />
                                <Image source={require('../assets/images/star-unfilled.png')} style={styles.star} />
                                <Text style={styles.reviewCount}>{Math.floor(Math.random() * 150) + 1} reviews</Text>
                            </View>
                        </View>
                        <View style={styles.productInfoDescriptionWrapper}>
                            <Text style={styles.productDescText}>
                                {item.description}
                            </Text>
                        </View>
                        <TouchableOpacity>
                            <View style={styles.orderButton}>
                                <Text style={styles.orderButtonText}>Add to cart</Text>
                                <Text style={styles.orderButtonTextPrice}>₹{item.price}</Text>

                            </View>
                        </TouchableOpacity>
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
        paddingVertical: 40,
        elevation: 17,
    },
    fullProductName: {
        fontFamily: 'Montserrat-Bold',
        color: colors.black,
        fontSize: 24,
        marginTop: 20,
        width: '95%'
    },
    reviewWrapper: {
        marginTop: 12,
        flexDirection: 'row'
    },
    starsWrapper: {
        flexDirection: 'row',
        marginLeft: 0.5
    },
    star: {
        marginHorizontal: -0.5
    },
    reviewCount: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 14,
        color: "#8B8B8B",
        paddingLeft: 14
    },
    productInfoDescriptionWrapper: {},
    productDescText: {
        fontFamily: 'Montserrat-Medium',
        color: "#8B8B8B",
        fontSize: 17,
        lineHeight: 25,
        marginTop: 26
    },
    orderButton: {
        paddingHorizontal: 23,
        paddingVertical: 15,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: "#9F67E3",
        borderRadius: 200,
        marginTop: 27
    },
    orderButtonText: {
        color: colors.white,
        fontFamily: "Montserrat-Bold",
        fontSize: 17
    },
    orderButtonTextPrice: {
        color: "#ddd",
        fontFamily: "Montserrat-Bold",
        fontSize: 17
    }
})