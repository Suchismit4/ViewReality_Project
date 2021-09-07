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
import searchCategoriesData from '../assets/data/searchCategoriesData';
import productsData from '../assets/data/productsData';

const renderSearchCategory = ({item}) => {
  return (
    <TouchableOpacity >
        <View style={styles.searchCategoryWrapper}>
          <Text style={styles.searchCategoryText}>{item.title}</Text>
        </View>
    </TouchableOpacity>
  );
}

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
              <Image source={require('../assets/images/heroicons-outline_menu.png')} style = {{width: 29}}></Image>
              <View style = {styles.searchBarWrapper}>
                <Text style = {styles.searchPlaceHolderText}>Type stuff here!</Text>
                <Image source={require('../assets/images/carbon_search.png')} style = {{width: 24}}></Image>
              </View>
              <Image source={require('../assets/images/el_shopping-cart.png')} style = {{width: 29}}></Image>
            </View>
          </View>
          {/* <View style={styles.searchSection}>
            <Text style={styles.searchTitles}>Your top categories</Text>
            <View>

            </View>
          </View>
          <View style={styles.searchSection}>
            <Text style={styles.searchTitles}>Your top categories</Text>
          </View> */}
          <View>
            <FlatList
              data={searchCategoriesData}
              renderItem={renderSearchCategory}
              keyExtractor={item => item.id}
              horizontal = {true}
              showsHorizontalScrollIndicator={false}
            />
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
    height: 90,
    marginBottom: 10
  },
  searchWrapper : {
    top: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
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
    width: 280,
  },
  searchPlaceHolderText: {
    color: colors.black,
    width: 220, 
    height: 19,  
    fontFamily: "Montserrat-Regular", 
    fontWeight: "500", 
    fontSize: 14, 
  },
  searchSection: {
    // backgroundColor: colors.red,
    height: 333,
    marginHorizontal: 20,
    marginVertical: 10,
    alignItems: 'flex-start'
  },
  searchTitles : {
    "fontFamily": "Montserrat-Regular",
    "fontWeight": "600",
    "fontSize": 24,
    margin: 5,
  },
  searchCategoryWrapper : {
    width: 113.07,
    height: 37,
    backgroundColor: colors.white,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  searchCategoryText: {
    "fontFamily": "Montserrat-Regular",
    "fontWeight": "600",
    "fontSize": 13,
    margin: 5,
  }
});

