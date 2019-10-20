import React, { Component } from "react";
import { Text, View } from "react-native";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Footer, FooterTab, Button, Icon } from "native-base";
import SearchTab from "./TabNavigator/SearchBeer/SearchTab";
import SearchCocktailTab from "./TabNavigator/SearchCocktail/SearchCocktailTab";
import FavouritesTab from "./TabNavigator/FavouritesTab";
// import SearchByInredient from "./TabNavigator/SearchCocktail/SearchByInredient";

const SearchTabNavigator = createBottomTabNavigator(
  {
    // SearchByInredient: { screen: SearchByInredient },
    SearchCocktailTab: { screen: SearchCocktailTab },

    SearchTab: { screen: SearchTab },
    FavouritesTab: { screen: FavouritesTab }
  },

  {
    tabBarComponent: props => {
      return (
        <Footer>
          <FooterTab>
            <Button
              vertical
              onPress={() => props.navigation.navigate("AboutUs")}
            >
              <Icon name="ios-more"></Icon>
              <Text>More</Text>
            </Button>
            <Button
              vertical
              onPress={() => props.navigation.navigate("FavouritesTab")}
            >
              <Icon name="star"></Icon>
              <Text>Favorites</Text>
            </Button>
            <Button
              vertical
              onPress={() => props.navigation.navigate("SearchCocktailTab")}
            >
              <Icon name="wine"></Icon>
              <Text> Cocktail</Text>
            </Button>
            <Button
              vertical
              onPress={() => props.navigation.navigate("SearchTab")}
            >
              <Icon name="beer"></Icon>
              <Text> Beer</Text>
            </Button>
          </FooterTab>
        </Footer>
      );
    }
  }
);

export default SearchTabNavigator;
