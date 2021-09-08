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
import NumberFormat from 'react-number-format';
import colors from '../assets/theme/colors'
import productsData from '../assets/data/productsData';
import { cartData } from '../assets/data/cartData';
import { useState } from 'react';

export default DetailsScreen = ({ route, navigation }) => {
    const [refresh = true, updateRefresh] = useState();

    let list = [];
    var totalPrice = 0;
    for (var i = 0; i < cartData.length; i++) {
        const item = list.find(o => o.name == cartData[i].name);
        if (item == undefined) {
            list.push({
                name: cartData[i].name,
                quantity: cartData[i].quantity,
                price: parseInt(cartData[i].price.replace(',', '')),
                id: cartData[i].id
            })
        } else {
            item.quantity += 1;
        }
    }
    for (var i = 0; i < list.length; i++) {
        totalPrice += (list[i].price * list[i].quantity);
    }

    function ReduceQuantity(name) {
        console.log(name)
        let item = list.find(o => o.name == name);
        if (item.quantity > 1) item.quantity -= 1;
        item = cartData.find(o => o.name == name);
        if (item.quantity > 1) item.quantity -= 1;

        updateRefresh(!refresh);

        return true;
    }

    function AddQuantity(name) {
        let item = list.find(o => o.name == name);
        item.quantity += 1;
        item = cartData.find(o => o.name == name);
        item.quantity += 1;
        console.log(item)

        updateRefresh(!refresh);

        return true;
    }

    const renderCartItem = (item, index) => {
        console.log(item)
        const product = productsData.find(o => o.name == item.name);
        return (
            <View style={[styles.cartItemWrapper, {
                marginBottom: index == list.length ? 500 : 35
            }]}>
                <View style={styles.rowProductDetails}>
                    <View>
                        <TouchableOpacity onPress={() => {
                            navigation.navigate('Details', {
                                item: product,
                            })
                        }}>
                            <Image source={product.largeImage} style={styles.productImage} />
                        </TouchableOpacity>
                        <View style={styles.quantityWrapper}>
                            <TouchableOpacity onPress={() => {
                                ReduceQuantity(item.name)
                            }} > 
                            <View style={[styles.controlButton, { borderTopLeftRadius: 3, borderBottomLeftRadius: 3 }]}><Text style={styles.insideControl}>-</Text></View>
                            </TouchableOpacity>
                            <View style={styles.quantity}><Text style={styles.quantityText}>{item.quantity}</Text></View>
                            <TouchableOpacity onPress={() => {
                                AddQuantity(item.name)
                            }}>
                                <View style={[styles.controlButton, { borderTopRightRadius: 3, borderBottomRightRadius: 3 }]}><Text style={styles.insideControl}>+</Text></View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.productDetails}>
                        <Text style={styles.productName}>{product.name}</Text>
                        <Text style={styles.productPrice}>₹{product.price}</Text>
                        <Text style={styles.productStock}>Only {Math.floor(Math.random() * 15) + 1} left in stock.</Text>
                        <Text style={styles.productSoldBy}>Sold by <Text style={styles.soldBySpan}>Delhi Public School</Text></Text>
                        <View style={styles.controls}>
                            <TouchableOpacity onPress={() => {
                                const __item = cartData.find(o => o.name == item.name);
                                const index = cartData.indexOf(__item);
                                cartData.splice(index, 1);
                                const _item = list.find(o => o.name == item.name);
                                const _index = list.indexOf(_item);
                                list.splice(_index, 1);
                                updateRefresh(!refresh);
                            }}>
                                <View style={styles.deleteButton}>
                                    <Text style={styles.buttonText}>Delete</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View style={styles.deleteButton}>
                                    <Text style={styles.buttonText}>Save for later</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <SafeAreaView>
                {/* Header */}
                <View style={styles.headerWrapper}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <View style={styles.headerLeftGoBack}>
                            <Image source={require('../assets/images/goback.png')} style={{ width: 25, height: 25 }} />
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.shoppingCartControl}>
                    <Text style={styles.headerText}>Shopping cart</Text>
                    <Text style={styles.subTotal}>Subtotal: ₹<Text style={styles.subTotalText}>{totalPrice}</Text> </Text>
                    <View style={styles.orderButton}>
                        <Text style={styles.orderText}>Proceed to Buy ({list.length} items)</Text>
                    </View>
                    <View style = {{height: Dimensions.get('window').height - 200}}>
                    <FlatList 
                        data={list}
                        renderItem={({ item, index }) => renderCartItem(item, index)}
                        keyExtractor={item => item.id}
                        showsVerticalScrollIndicator={false}
                        extraData={refresh}
                        ListFooterComponent = {(
                            <View></View>
                        )}
                        ListFooterComponentStyle = {{height: 50}}
                    />
                </View>


            </SafeAreaView>
        </View>
    )
}

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
    cartItemWrapper: {
        height: 150,
        marginHorizontal: 25,
        marginBottom: 35,
        padding: 5,
    },
    productImage: {
        width: 120,
        height: 120,
        resizeMode: 'contain',
    },
    rowProductDetails: {
        flexDirection: 'row'
    },
    productDetails: {
        marginLeft: 30,
        marginTop: 10
    },
    productName: {
        fontFamily: 'Montserrat-Regular',
        color: colors.black,
        fontSize: 16
    },
    productPrice: {
        fontFamily: 'Montserrat-Bold',
        color: colors.black,
        fontSize: 18,
        marginTop: 5
    },
    productStock: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 12,
        color: "#c0392b"
    },
    productSoldBy: {
        marginTop: 5,
        fontFamily: 'Montserrat-Regular',
        fontSize: 13
    },
    soldBySpan: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 13,
        color: "#2980b9"
    },
    controls: {
        flexDirection: 'row'
    },
    deleteButton: {
        padding: 6,
        backgroundColor: colors.white,
        borderRadius: 5,
        marginRight: 10,
        marginTop: 19,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 11,
    },
    buttonText: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 11,
    },
    controlButton: {
        width: 30,
        height: 25,
        alignItems: 'center',
        backgroundColor: '#bdc3c7',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.1)'
    },
    quantityWrapper: {
        flexDirection: 'row'
    },
    quantity: {
        width: 40,
        height: 25,
        alignItems: 'center',
        backgroundColor: '#ffff',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.1)'
    },
    insideControl: {
        margin: 0,
        padding: 0,
        fontFamily: "Montserrat-Bold",
        fontSize: 15
    },
    quantityText: {
        margin: 0,
        padding: 0,
        fontFamily: "Montserrat-Bold",
        fontSize: 14,
        color: "#2980b9",
    },
    shoppingCartControl: {
        paddingBottom: 20,
        marginHorizontal: 25
    },
    headerText: {
        fontFamily: "Montserrat-Bold",
        fontSize: 15
    },
    subTotal: {
        fontFamily: "Montserrat-Regular",
        fontSize: 20,
        color: colors.black,
        marginTop: 15
    },
    subTotalText: {
        fontFamily: "Montserrat-Bold"
    },
    orderButton: {
        backgroundColor: "#9F67E3",
        alignItems: 'center',
        justifyContent: 'center',
        padding: 13,
        borderRadius: 7,
        marginTop: 15
    },
    orderText: {
        fontFamily: "Montserrat-Regular",
        fontSize: 13,
        color: colors.white
    },
    seperator: {
        width: '100%',
        height: 1,
        backgroundColor: 'rgba(0,0,0,.5)',
        marginTop: 20
    }
})