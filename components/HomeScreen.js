/* eslint-disable prettier/prettier */
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

export default Home = ({ navigation }) => {
    const renderCategoryItem = ({ item }) => {
        return (
            <TouchableOpacity>
                <View style={[styles.categoriesItemWrapper, {
                    marginLeft: item.id == '1' ? 25 : 0
                }]}>
                    <View style={styles.categoriesItemContentWrapper}>
                        <Image source={item.image} style={styles.categoriesItemImage} />
                        <Text style={styles.categoriesItemText}>{item.text}</Text>
                    </View>
                </View>
            </TouchableOpacity>

        );
    };

    const renderTrendingItem = ({ item }) => {
        if (item.cat == "trending") {
            return (
                <TouchableOpacity onPress={() => {
                    navigation.navigate('Details', {
                        item: item,
                    })
                }}>
                    <View style={[styles.trendingItemWrapper, {
                        marginLeft: item.id == '1' ? 25 : 0
                    }]}>
                        <ImageBackground source={require('../assets/images/shadowBg.png')} style={styles.backgroundWithShadow}>
                            <View style={styles.imageContainer}>
                                <Image style={styles.productImage} source={item.image} />
                            </View>
                            <View style={styles.trendingProductDataWrapper}>
                                <Text style={styles.tProductPrice}>₹{item.price}</Text>
                                <Image source={require('../assets/images/filled-heart.png')} style={styles.heartIcon} />
                            </View>
                            <Text style={styles.trendingProductTitle}>{item.name}</Text>
                        </ImageBackground>
                    </View>
                </TouchableOpacity>

            )
        }
    }

    const renderJFYItem = ({ item }) => {
        if (item.cat == "jfy") {
            return (
                <TouchableOpacity onPress={() => {
                    navigation.navigate('Details', {
                        item: item,
                    })
                }}>
                <View style={[styles.trendingItemWrapper, {
                    marginLeft: item.id == '5' ? 25 : 0,
                    height: 135
                }]}>
                    <ImageBackground source={require('../assets/images/shadowBg.png')} style={[styles.backgroundWithShadow,
                    {
                        height: 135
                    }
                    ]}>
                        <View style={styles.imageContainer}>
                            <Image style={[styles.productImage, {
                                width: 69,
                                height: 69
                            }]} source={item.image} />
                        </View>
                        <View style={styles.trendingProductDataWrapper}>
                            <Text style={styles.tProductPrice}>₹{item.price}</Text>
                            <Image source={require('../assets/images/filled-heart.png')} style={styles.heartIcon} />
                        </View>
                        <Text style={styles.trendingProductTitle}>{item.name}</Text>
                    </ImageBackground>
                </View>
                </TouchableOpacity>
            )
        }
    }

    return (
        <View style={styles.container}>
            <SafeAreaView>
                <ScrollView contentInsetAdjustmentBehavior="automatic" showsVerticalScrollIndicator={false}>
                    {/* Header */}
                    <View style={styles.headerWrapper}>
                        <View style={styles.headerHamburgerIconWrapper}>
                            <Image source={require('../assets/images/heroicons-outline_menu.png')} style={styles.headerIcon} />
                        </View>
                        <View style={styles.headerBrandingTextWrapper}>
                            <Text style={styles.headerBrandingText}>VIEW REALITY</Text>
                        </View>
                        <TouchableOpacity onPress = {() => {
                                navigation.navigate("Search")
                            }}>
                        <View style={styles.headerSearchIconWrapper}>

                            <Image source={require('../assets/images/carbon_search.png')} style={[styles.headerIcon], {
                                width: 15.5,
                                height: 15.5
                            }} />
                        </View>
                        </TouchableOpacity>

                    </View>

                    {/* Categories title */}
                    <View style={styles.categoriesTitleWrapper}>
                        <Text style={styles.categoriesTitle}>What’s the right deal for <Text style={styles.bold}>you? </Text></Text>
                    </View>

                    {/* Categories */}
                    <View style={styles.categoriesListWrapper}>
                        <FlatList
                            data={categoriesData}
                            renderItem={renderCategoryItem}
                            keyExtractor={item => item.id}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>

                    {/* Section Title */}
                    <View style={styles.sectionTitleWrapper}>
                        <Text style={styles.sectionTitle}>Trending now</Text>
                        <Text style={styles.sectionButton}>See all</Text>
                    </View>

                    {/* Product Flat List Trending */}
                    <View style={styles.trendingProductListWrapper}>
                        <FlatList
                            data={productsData}
                            renderItem={renderTrendingItem}
                            keyExtractor={item => item.id}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>

                    {/* Feature Show case */}

                    <View style={styles.showcaseSMWrapper}>
                        <View style={styles.SMContent}>
                            <View style={styles.SMContentTextWrapper}>
                                <Text style={styles.showcaseHeader}>Explore items
                                    with people. </Text>
                                <TouchableOpacity>
                                    <View style={styles.buttonExplore}>
                                        <Text style={styles.buttonText}>Explore </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <Image source={require('../assets/images/sm.png')} style={styles.imageContainMode} />
                        </View>
                    </View>

                    {/* Section Title */}
                    <View style={styles.sectionTitleWrapper}>
                        <Text style={styles.sectionTitle}>Just for you</Text>
                        <Text style={styles.sectionButton}>See all</Text>
                    </View>

                    {/* Product Flat List JFY */}
                    <View style={[styles.trendingProductListWrapper, {
                        height: 180
                    }]}>
                        <FlatList
                            data={productsData}
                            renderItem={renderJFYItem}
                            keyExtractor={item => item.id}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>

                    {/* Offer Show case */}
                    <View style={styles.offerWrapper}>
                        <View style={styles.offerTextWrapper}>
                            <Text style={styles.offerText}>
                                Up to 30% off | Smart & easy appliances for the home chef.
                            </Text>
                        </View>
                        <View style={styles.imageWrapperOffer}>
                            <Image source={require('../assets/images/Frame7.png')} style={styles.imageOffer} />
                            <Image source={require('../assets/images/Frame8.png')} style={styles.imageOffer} />
                        </View>
                        <View style={styles.imageWrapperOffer}>
                            <Image source={require('../assets/images/Frame9.png')} style={styles.imageOffer} />
                            <Image source={require('../assets/images/Frame10.png')} style={styles.imageOffer} />
                        </View>
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
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30,
        paddingLeft: 25,
        paddingRight: 31
    },
    bold: {
        fontFamily: 'Montserrat-Bold'
    },
    headerHamburgerIconWrapper: {
        width: '10%',
        backgroundColor: colors.white,
        borderRadius: 200,
        justifyContent: 'center',
        alignItems: 'center',
        height: 43,
        width: 43,
    },
    headerSearchIconWrapper: {
        width: '10%',
        backgroundColor: colors.white,
        borderRadius: 11,
        justifyContent: 'center',
        alignItems: 'center',
        height: 43,
        width: 43,
    },
    headerBrandingTextWrapper: {
        width: '80%',
        alignItems: 'center',
    },
    headerBrandingText: {
        fontFamily: 'Montserrat-Bold',
        color: colors.black,
        fontSize: 18
    },
    headerIcon: {
        width: 20,
        height: 20,
        marginTop: 3
    },
    categoriesTitleWrapper: {
        marginTop: 45,
        marginHorizontal: 25,
        width: 178
    },
    categoriesListWrapper: {
        height: 71,
    },
    categoriesTitle: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 16,
    },
    categoriesItemWrapper: {
        width: 110,
        height: 28,
        marginTop: 18,
        backgroundColor: colors.white,
        borderRadius: 5,
        marginRight: 14,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        shadowColor: colors.black,
        elevation: 3
    },
    categoriesItemContentWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 6
    },
    categoriesItemImage: {
        resizeMode: 'contain',
        width: 15,
        height: 15,
        marginRight: 4
    },
    categoriesItemText: {
        fontFamily: 'Montserrat-SemiBold',
        color: colors.black,
        fontSize: 12
    },
    sectionTitleWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 25,
        alignItems: 'center'
    },
    sectionTitle: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 16,
        color: colors.black
    },
    sectionButton: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 12,
        color: colors.lightBlack
    },
    trendingProductListWrapper: {
        height: 170,
        marginTop: 10,
    },
    trendingItemWrapper: {
        marginTop: 5,
        width: 131,
        height: 131,
        marginRight: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 11,
        borderRadius: 5
    },
    backgroundWithShadow: {
        width: 131,
        height: 131
    },
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    productImage: {
        marginTop: 10,
        width: 87,
        height: 64
    },
    trendingProductDataWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 12,
        marginTop: 13,
    },
    tProductPrice: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 14,
        color: colors.black
    },
    trendingProductTitle: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 12,
        color: colors.lightBlack,
        marginHorizontal: 12
    },
    showcaseSMWrapper: {
        height: 150,
        marginTop: -14,
        marginHorizontal: 25,
        backgroundColor: "#C544C7",
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 25,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 10,
    },
    SMContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    SMContentTextWrapper: {
        width: '55%',
    },
    imageContainMode: {
        resizeMode: 'contain'
    },
    showcaseHeader: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 18,
        color: colors.white,
        marginTop: 25,
        marginLeft: 25,
        width: 135,
        lineHeight: 26
    },
    buttonExplore: {
        height: 27,
        width: 97,
        backgroundColor: "#ECF0F1",
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 25,
        marginTop: 19
    },
    buttonText: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 12,
        color: colors.black,
    },
    offerWrapper: {
        marginHorizontal: 25,
        minHeight: 328,
        maxHeight: 'auto',
        padding: 21,
        backgroundColor: colors.white,
        borderRadius: 5,
        marginTop: -14,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        marginBottom: 30,
        elevation: 8,
    },
    offerText: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 16,
        color: colors.black,
    },
    imageWrapperOffer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 17,
    },
    imageOffer: {
        width: '46%',
        height: 107 * ratio,
        borderRadius: 5,
    },
})