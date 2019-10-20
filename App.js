import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./Screens/HomeScreen";
import SearchTabNavigator from "./Screens/SearchTabNavigator";
import LoginScreen from "./Screens/LoginScreen";
import FavouritesTab from "./Screens/TabNavigator/FavouritesTab";
import AboutUs from "./Screens/AboutUs";
import AddBeer from "./Screens/AddAlcohol/AddBeer";
import AddCocktail from "./Screens/AddAlcohol/AddCocktail";
import beerList from "./Screens/Lists/beerList";
import cocktailList from "./Screens/Lists/cocktailList";
import * as firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyALSJlcK8ZQzs2EbNTXJuhX8fCqvLlbyaU",
  authDomain: "findbeercocktail.firebaseapp.com",
  databaseURL: "https://findbeercocktail.firebaseio.com",
  projectId: "findbeercocktail",
  storageBucket: "",
  messagingSenderId: "10107216225",
  appId: "1:10107216225:web:b3743cf9e599886f526520",
  measurementId: "G-C6WJ9NWL72"
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const AppStackNavigator = createStackNavigator(
  {
    HomeScreen: { screen: HomeScreen },
    LoginScreen: { screen: LoginScreen },
    SearchTabNavigator: { screen: SearchTabNavigator },
    FavouritesTab: { screen: FavouritesTab },
    AboutUs: { screen: AboutUs },
    AddBeer: { screen: AddBeer },
    AddCocktail: { screen: AddCocktail },
    beerList: { screen: beerList },
    cocktailList: { screen: cocktailList }
  },
  {
    initialRouteName: "HomeScreen",
    headerMode: "none"
  }
);

export default createAppContainer(AppStackNavigator);
