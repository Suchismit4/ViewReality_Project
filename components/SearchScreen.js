import * as React from 'react';
import {
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  FlatList,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import categoriesData from '../assets/data/categoriesData';
import colors from '../assets/theme/colors';
import productsData from '../assets/data/productsData';

export default Home = () => {  
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.headerWrapper}>
            <View style = {styles.searchWrapper}>
              <Image source={require('../assets/images/heroicons-outline_menu.png')}></Image>
              <View style = {styles.searchBarWrapper}>
                <Text style = {styles.searchPlaceHolderText}>Type stuff here!</Text>
                <Image source={require('../assets/images/carbon_search.png')} style = {{width: 24}}></Image>
              </View>
              <Image source={require()}></Image>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};
const win = Dimensions.get('window');
const ratio = (win.width - 50) / 350;
console.log(ratio);
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerWrapper: {
    backgroundColor: colors.white,
    height: 112,
  },
  searchWrapper : {
    top: 47,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  searchBarWrapper : {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: colors.white,
    "borderRadius": 27,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 5,
    height: 46,
    width: 257,
  },
  searchPlaceHolderText: {
    color: colors.black,
    width: 189, 
    height: 19,  
    fontFamily: "Montserrat-Regular", 
    fontWeight: "500", 
    fontSize: 14, 
  }
});

