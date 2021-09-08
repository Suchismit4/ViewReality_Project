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
  Touchable,
  Picker,
  createElement
} from 'react-native';
import categoriesData from '../assets/data/categoriesData';
import colors from '../assets/theme/colors';
// import searchCategoriesData from '../assets/data/searchCategoriesData';
import productsData from '../assets/data/productsData';
import { NavigationContainer } from '@react-navigation/native';
import { tSTypeQuery } from '@babel/types';
import selectDropDown from 'react-native-select-dropdown'
import SelectDropdown from 'react-native-select-dropdown';

let searchText = ""

const sortingOptions = [
  {
    order:"relevance",
    title:"Sort by relevance"
  },
  {
    order:"ascendingPrice",
    title:"Sort by price (Lowest to Highest)"
  },
  {
    order:"descendingPrice",
    title:"Sort by price (Highest to Lowest)"
  }
]

const ascending = (a, b) => {
  if (parseInt(a.price) > parseInt(b.price)) {
    return 1
  } else if (parseInt(a.price) < parseInt(b.price)) {
    return -1
  } else {
    return 0
  }
}

const descending = (a, b) => {
  if (parseInt(a.price) > parseInt(b.price)) {
    return -1
  } else if (parseInt(a.price) < parseInt(b.price)) {
    return 1
  } else {
    return 0
  }
}

const relevance = (a, b) => {
  if (parseInt(a.id) > parseInt(b.id)) {
    return 1
  } else if (parseInt(a.id) < parseInt(b.id)) {
    return -1
  } else {
    return 0
  }
}

export default Home = ({ route, navigation }) => {

  const {text, id} = route.params 
  const [query,setQuery] = useState();
  const [category = text, setCategory] = useState();
  const [selectedCategory = id, setSelectedCategory] = useState()
  const [sort = "relevance", updateSort] = useState();
  const updateSearch = (text) => {
    //search logic here
    searchText = text
    // console.log(searchText)
  }

  const renderSearchCategory = ({ item }) => {
    return (
      <TouchableOpacity onPress = {() => {
        setCategory(item.text)
        setSelectedCategory(item.id)
      }}>
        <View style={[
          { marginLeft: item.id == '1' ? 25 : 0},
          item.id == selectedCategory ? styles.selectedSearchCategoryWrapper : styles.searchCategoryWrapper
        ]}>
          <Text style={styles.searchCategoryText}>{item.text}</Text>
        </View>
      </TouchableOpacity>
    );
  }
  
  const renderProductListings = ({item}) => {
    if(category != "All Items" && item.searchCat.toLowerCase() != category.toLowerCase()) return
    if(searchText!="" && !item.fullProductName.toLowerCase().includes(searchText.toLowerCase())) return
    return(
      <TouchableOpacity onPress={() => {
        navigation.navigate('Details', {
            item: item,
        })
      }}>
        <View style={[styles.searchListingWrapper]}>
          <View>
            <Image style={styles.searchListingImage} source={item.largeImage}></Image>
          </View>
          <View style={{ flexDirection: 'column', alignItems: 'flex-start', justifyContent: "space-around", width: "80%" }}>
            <Text style={styles.searchListingPrice}>₹{item.price}</Text>
            <Text style={styles.searchListingName} >{item.name}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <SafeAreaView>
        {/* Header */}
        <View style={styles.headerWrapper}>
          <View style={styles.searchWrapper}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <View style={styles.iconWrapper}>
                <Image source={require('../assets/images/goback.png')} style={{ width: 18, resizeMode: 'contain' }}></Image>
              </View>
            </TouchableOpacity>

            <View style={styles.searchBarWrapper}>
              <TextInput
                style={styles.searchPlaceHolderText}
                value={query}
                placeholder="Type here to search"
                placeholderTextColor={"#000"}
                onChangeText={(text) => {
                  setQuery(text)
                  updateSearch(text)
                }}
              />
              <Image source={require('../assets/images/carbon_search.png')} style={{ width: 15, height: 15, resizeMode: 'contain' }}></Image>
            </View>
            <TouchableOpacity  onPress={() => { navigation.navigate('Cart') }}>
            <View style={styles.iconWrapper}>
              <Image source={require('../assets/images/el_shopping-cart.png')} style={{ height: 15.5, width: 15.5 }}></Image>
            </View>
              </TouchableOpacity>

          </View>
        </View>

        {/* Drop down for sorting */}
        <View style={{width: "100%", flexDirection: "column", alignItems: 'center'}}>
          <SelectDropdown
            buttonStyle={styles.sortDropdownContainer}
            buttonTextStyle={{"fontFamily": "Montserrat-Regular","fontWeight": "600","fontSize": 15,}}
            dropdownStyle={styles.sortDropdown}
            rowTextStyle={{"fontFamily": "Montserrat-Regular","fontWeight": "600","fontSize": 15,}}
            data = {sortingOptions}
            defaultButtonText = {sortingOptions[0].title}
            onSelect = {(selectedItem, index) => {
              if (selectedItem.order == "ascendingPrice") {
                productsData.sort(ascending)
              } else if (selectedItem.order == "descendingPrice") {
                productsData.sort(descending)
              } else if (selectedItem.order == "relevance") {
                productsData.sort(relevance)
              }
              updateSort(selectedItem.order)
            }}
            rowTextForSelection = {(selectedItem, index) => {
              return `${selectedItem.title}`
            }}
            buttonTextAfterSelection = {(selectedItem, index) => {
              return `${selectedItem.title}`
            }}
          >
          </SelectDropdown>
        </View>
        <View style={{ height: 50, justifyContent: 'center', alignItems: 'center', marginBottom: 10, }}>
          <FlatList
            data={categoriesData}
            renderItem={renderSearchCategory}
            keyExtractor={item => item.id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            extraData = {selectedCategory}
          />
        </View>
        <View style={[{ height: Dimensions.get('window').height - 90, flexDirection: 'column'}, styles.containerOfAllProducts]}>
          <FlatList
            data={productsData}
            renderItem={renderProductListings}
            keyExtractor={item => item.id}
            numColumns={2}
            extraData={query, sort}
            showsVerticalScrollIndicator={false}
            ListFooterComponent = {(
              <View></View>
            )}
            ListFooterComponentStyle = {{height: 200}}

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
  },
  container: {
    flex: 1,
  },
  headerWrapper: {
    // backgroundColor: colors.white,
    height: 90,
  },
  searchWrapper: {
    top: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  searchBarWrapper: {
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
    height: 50,
    width: 260,
  },
  searchPlaceHolderText: {
    // backgroundColor: colors.red,
    color: colors.black,
    width: 210,
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
  iconWrapper: {
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
  searchTitles: {
    "fontFamily": "Montserrat-Regular",
    "fontWeight": "600",
    "fontSize": 24,
    margin: 5,
  },
  searchCategoryWrapper: {
    width: 113.07,
    height: 37,
    backgroundColor: colors.white,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 5,
    marginTop: 10,
    marginRight: 10
  },
  selectedSearchCategoryWrapper: {
    width: 113.07,
    height: 37,
    backgroundColor: colors.magenta,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 5,
    marginTop: 10,
    marginRight: 10
  },
  searchCategoryText: {
    "fontFamily": "Montserrat-Regular",
    "fontWeight": "600",
    "fontSize": 13,
    margin: 5,
  },
  searchListingWrapper: {
    "width": 161,
    "height": 234,
    backgroundColor: colors.white,
    borderRadius: 20,
    margin: 10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  searchListingImage: {
    resizeMode: 'contain',
    width: 134,
    height: 99
  },
  searchListingPrice: {
    "fontFamily": "Montserrat-Bold",
    "fontWeight": "600",
    "fontSize": 24
  },
  searchListingName: {
    "fontFamily": "Montserrat-Regular",
    "fontWeight": "600",
    "fontSize": 14
  },
  columnWrapper: {
    margin: 10
  },
  sortModal : {
    width: "100%",
    height: "70%",
    backgroundColor: colors.red,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20
  },
  sortDropdownContainer: {
    backgroundColor: colors.white,
    width: 360,
    height: 50,
    borderRadius: 2000,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 5,
  },
  sortDropdown : {
    borderRadius: 10,
    height: 150
  },

});

