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

export default Home = () => {

    return (
        <View style={styles.container}>
            <SafeAreaView>
                <ScrollView contentInsetAdjustmentBehavior="automatic" showsVerticalScrollIndicator={false}>
                    {/* Header */}
                    <View style={styles.headerWrapper}>
                        <View>
                            
                        </View>
                    </View>

                </ScrollView>
            </SafeAreaView>
        </View>
    )
}
const win = Dimensions.get('window');
const ratio = (win.width-50)/350;
console.log(ratio)
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
})