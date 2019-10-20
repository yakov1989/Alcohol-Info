import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  YellowBox,
  Share
} from "react-native";
import { ListItem, List, Icon } from "native-base";
import * as firebase from "firebase";
import "firebase/auth";

YellowBox.ignoreWarnings(["Setting a timer"]);

class SearchCocktailBody extends Component {
  addToFavourites = async cocktailName => {
    currentUser = await firebase.auth().currentUser;
    //get a uniqe key
    var ref = firebase
      .database()
      .ref(currentUser.uid)
      .child("favourites");

    //check if item exists in favourites
    ref
      .orderByChild("name")
      .equalTo(cocktailName)
      .once("value", snaphot => {
        if (snaphot.exists()) {
          alert("item is already in favourites!");
          return;
        } else {
          ref.push().set({
            name: cocktailName
          });

          //update the beername at the uniqe key
        }
      });
  };

  handleShare = (name, image) => {
    const br = "\n";
    Share.share({
      message:
        "You Have to Try this Cocktail!" +
        br +
        name +
        br +
        br +
        "Alcohol Info App",
      url: image
    }).then(({ action }) => {
      if (action === Share.sharedAction) console.log("Share was successful");
      else console.log("Share was dismissed");
    });
  };
  render() {
    const cocktailData = this.props.cocktailData;

    return (
      <View>
        <List style={{ backgroundColor: "white" }}>
          <ListItem style={{ justifyContent: "center" }}>
            <Image
              source={{ uri: cocktailData.strDrinkThumb }}
              style={{ height: 150, width: 150 }}
            ></Image>
          </ListItem>

          <ListItem style={{ flexDirection: "row-reverse" }} itemDivider>
            <Text>Name</Text>
          </ListItem>
          <ListItem
            style={{
              flexDirection: "row-reverse",
              justifyContent: "space-between"
            }}
          >
            <View>
              <Text>{cocktailData.strDrink}</Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => this.addToFavourites(cocktailData.strDrink)}
              >
                <Text style={{ color: "blue" }}>+ Favourites</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  this.handleShare(
                    cocktailData.strDrink,
                    cocktailData.strDrinkThumb
                  )
                }
              >
                {/* <Text style={{ color: "green" }}>Share</Text> */}
                <Icon
                  name="md-share"
                  style={{ fontSize: 20, paddingTop: 10 }}
                />
              </TouchableOpacity>
            </View>
          </ListItem>
          <ListItem style={{ flexDirection: "row-reverse" }} itemDivider>
            <Text>Category</Text>
          </ListItem>
          <ListItem
            style={{
              flexDirection: "row-reverse",
              justifyContent: "space-between"
            }}
          >
            <View>
              <Text>{cocktailData.strCategory}</Text>
            </View>
          </ListItem>

          <ListItem style={{ flexDirection: "row-reverse" }} itemDivider>
            <Text>Alcoholic?</Text>
          </ListItem>
          <ListItem
            style={{
              flexDirection: "row-reverse",
              justifyContent: "space-between"
            }}
          >
            <View>
              <Text>{cocktailData.strAlcoholic}</Text>
            </View>
          </ListItem>
          <ListItem style={{ flexDirection: "row-reverse" }} itemDivider>
            <Text>Ingredients</Text>
          </ListItem>
          <ListItem
            style={{
              flexDirection: "row-reverse",
              justifyContent: "space-between"
            }}
          >
            <View>
              <Text>
                {cocktailData.strMeasure1
                  ? cocktailData.strMeasure1 + cocktailData.strIngredient1 + ","
                  : ""}
                {cocktailData.strMeasure2
                  ? cocktailData.strMeasure2 + cocktailData.strIngredient2 + ","
                  : ""}
                {cocktailData.strMeasure3
                  ? cocktailData.strMeasure3 + cocktailData.strIngredient3 + ","
                  : ""}{" "}
                {cocktailData.strMeasure4
                  ? cocktailData.strMeasure4 + cocktailData.strIngredient4 + ","
                  : ""}
                {cocktailData.strMeasure5
                  ? cocktailData.strMeasure5 + cocktailData.strIngredient5 + ","
                  : ""}
                {cocktailData.strMeasure6
                  ? cocktailData.strMeasure6 + cocktailData.strIngredient6 + ","
                  : ""}
                {cocktailData.strMeasure7
                  ? cocktailData.strMeasure7 + cocktailData.strIngredient7 + ","
                  : ""}
                {cocktailData.strMeasure8
                  ? cocktailData.strMeasure8 + cocktailData.strIngredient8 + ","
                  : ""}
                {cocktailData.strMeasure9
                  ? cocktailData.strMeasure9 + cocktailData.strIngredient9 + ","
                  : ""}
                {cocktailData.strMeasure10
                  ? cocktailData.strMeasure10 +
                    cocktailData.strIngredient10 +
                    ","
                  : ""}
              </Text>
            </View>
          </ListItem>
          <ListItem style={{ flexDirection: "row-reverse" }} itemDivider>
            <Text>Glass</Text>
          </ListItem>
          <ListItem
            style={{
              flexDirection: "row-reverse",
              justifyContent: "space-between"
            }}
          >
            <View>
              <Text>{cocktailData.strGlass}</Text>
            </View>
          </ListItem>
          <ListItem style={{ flexDirection: "row-reverse" }} itemDivider>
            <Text>Instructions</Text>
          </ListItem>
          <ListItem
            style={{
              flexDirection: "row-reverse",
              justifyContent: "space-between"
            }}
          >
            <View>
              <Text>{cocktailData.strInstructions}</Text>
            </View>
          </ListItem>
        </List>
      </View>
    );
  }
}

export default SearchCocktailBody;
