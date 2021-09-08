import * as React from 'react';
import { useState } from 'react';
import {
  Text,
  TextInput,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  FlatList,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  RecyclerViewBackedScrollViewComponent,
} from 'react-native';
import categoriesData from '../assets/data/categoriesData';
import colors from '../assets/theme/colors';
import searchCategoriesData from '../assets/data/searchCategoriesData';
import productsData from '../assets/data/productsData';
import { NavigationContainer } from '@react-navigation/native';
import { tSTypeQuery } from '@babel/types';

let searchText = ""
let state = {refresh : new Map()}

const renderSearchCategory = ({item}) => {
  return (
    <TouchableOpacity >
        <View style={styles.searchCategoryWrapper}>
          <Text style={styles.searchCategoryText}>{item.title}</Text>
        </View>
    </TouchableOpacity>
  );
}

const refreshListing = () => {
  state.refresh = new Map()
}

const renderProductListings = ({item}) => {
  if(searchText!="" && !item.fullProductName.toLowerCase().includes(searchText.toLowerCase())) return
  return(
    <TouchableOpacity>
      <View style={styles.searchListingWrapper}>
        <View>
          <Image style={styles.searchListingImage} source={item.image}></Image>
        </View>
        <View style={{flexDirection: 'column', alignItems: 'flex-start', justifyContent: "space-around", width: "80%"}}>
          <Text style={styles.searchListingPrice}>${item.price}</Text>
          <Text style={styles.searchListingName} >{item.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}


export default Home = ({navigation}) => {  

  const [query,setQuery] = useState();
  const updateSearch = (text) => {
    //search logic here
    searchText = text
    refreshListing()
    // console.log(searchText)
  }
  return (
    <View style={styles.container}>
      <SafeAreaView>
          {/* Header */}
          <View style={styles.headerWrapper}>
            <View style = {styles.searchWrapper}>
              <View style={styles.iconWrapper}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Image source={require('../assets/images/goback.png')} style = {{width: 18, resizeMode: 'contain'}}></Image>
                </TouchableOpacity>
              </View>
              <View style = {styles.searchBarWrapper}>
                <TextInput 
                  style = {styles.searchPlaceHolderText} 
                  value={query}
                  placeholder="Type here to search" 
                  placeholderTextColor = {"#000"}
                  onChangeText={(text) => {
                    setQuery(text)
                    updateSearch(text)
                  }}
                />
                <Image source={require('../assets/images/carbon_search.png')} style = {{width: 24}}></Image>
              </View>
              <View style = {styles.iconWrapper}>
                <Image source={require('../assets/images/el_shopping-cart.png')} style={{height: 15.5, width: 15.5}}></Image>
              </View>
            </View>
          </View>
          <View style={{height: 50, justifyContent: 'center', alignItems: 'center', marginBottom: 10}}>
            <FlatList
              data={searchCategoriesData}
              renderItem={renderSearchCategory}
              keyExtractor={item => item.id}
              horizontal = {true}
              showsHorizontalScrollIndicator={false}
            />
          </View>
          <View style = {[{height: Dimensions.get('window').height-78, flexDirection: 'column'}, styles.containerOfAllProducts]}>
            <FlatList
              data={productsData}
              renderItem={renderProductListings}
              keyExtractor={item => item.id}
              numColumns={2}
              extraData={query}
              showsVerticalScrollIndicator={false}
            />
          </View>
      </SafeAreaView>
    </View>
  );
};
const win = Dimensions.get('window');
const ratio = (win.width - 50) / 350;
console.log(ratio);
const styles = StyleSheet.create({
  containerOfAllProducts: {
    alignItems: 'center',
    paddingBottom: 100,
  },
  container: {
    flex: 1,
  },
  headerWrapper: {
    // backgroundColor: colors.white,
    height: 90,
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
    // backgroundColor: colors.red,
    color: colors.black,
    width: 220, 
    // height: 19,  
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
  iconWrapper : {
    backgroundColor: colors.white,
    resizeMode: 'contain',
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    height: 43,
    width: 43,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 5,
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 5,
    marginTop: 10
  },
  searchCategoryText: {
    "fontFamily": "Montserrat-Regular",
    "fontWeight": "600",
    "fontSize": 13,
    margin: 5,
  },
  searchListingWrapper : {
    "width": 161,
    "height": 234,
    backgroundColor: colors.white,
    borderRadius: 31,
    margin: 10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  searchListingImage : {
    resizeMode: 'contain',
    width: 134,
    height: 99
  },
  searchListingPrice : {
    "fontFamily": "Montserrat-Bold",
    "fontWeight": "600",
    "fontSize": 24
  },
  searchListingName: {
    "fontFamily": "Montserrat-Regular",
    "fontWeight": "600",
    "fontSize": 14
  },
  columnWrapper : {
    margin: 10
  }

});

