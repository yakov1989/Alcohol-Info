import React, { Component } from "react";
import {
  Text,
  View,
  Button,
  TouchableOpacity,
  YellowBox,
  StyleSheet,
  Share
} from "react-native";
import { ListItem, List, Icon } from "native-base";
import * as firebase from "firebase";
import "firebase/auth";

YellowBox.ignoreWarnings(["Setting a timer"]);

var currentUser;

class SearchBody extends Component {
  constructor(props) {
    super(props);
    this.handleShare = this.handleShare.bind(this);
    this.state = {};
  }

  addToFavourites = async beerName => {
    //get current user id

    currentUser = await firebase.auth().currentUser;
    //get a uniqe key
    var ref = firebase
      .database()
      .ref(currentUser.uid)
      .child("favourites");

    //check if item exists in favourites
    ref
      .orderByChild("name")
      .equalTo(beerName)
      .once("value", snaphot => {
        if (snaphot.exists()) {
          alert("item is already in favourites!");
          return;
        } else {
          //update the beername at the uniqe key

          ref.push().set({
            name: beerName
          });
        }
      });
  };
  handleShare = name => {
    const br = "\n";
    console.log(name);
    Share.share({
      message:
        "You Have to Try this Beer!" + br + name + br + br + "Alcohol Info App"
    }).then(({ action }) => {
      if (action === Share.sharedAction) console.log("Share was successful");
      else console.log("Share was dismissed");
    });
  };

  render() {
    const beerData = this.props.beerData;
    return (
      <View>
        <List style={{ backgroundColor: "white", height: "100%" }}>
          <ListItem style={{ flexDirection: "row-reverse" }} itemDivider>
            <Text style={styles.textTitle}>Name</Text>
          </ListItem>
          <ListItem
            style={{
              flexDirection: "row-reverse",
              justifyContent: "space-between"
            }}
          >
            <View>
              <Text>{beerData.name}</Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => this.addToFavourites(beerData.name)}
              >
                <Text style={{ color: "blue" }}>+ Favourites</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.handleShare(beerData.name)}>
                {/* <Text style={{ color: "green" }}>Share</Text> */}
                <Icon
                  name="md-share"
                  style={{ fontSize: 20, paddingTop: 10 }}
                />
              </TouchableOpacity>
            </View>
          </ListItem>
          <ListItem style={{ flexDirection: "row-reverse" }} itemDivider>
            <Text style={styles.textTitle}>Category</Text>
          </ListItem>
          <ListItem
            style={{
              flexDirection: "row-reverse",
              justifyContent: "space-between"
            }}
          >
            <View>
              <Text>{beerData.cat_name}</Text>
            </View>
          </ListItem>
          <ListItem style={{ flexDirection: "row-reverse" }} itemDivider>
            <Text style={styles.textTitle}>Country</Text>
          </ListItem>
          <ListItem
            style={{
              flexDirection: "row-reverse",
              justifyContent: "space-between"
            }}
          >
            <View>
              <Text>{beerData.country}</Text>
            </View>
          </ListItem>

          <ListItem style={{ flexDirection: "row-reverse" }} itemDivider>
            <Text style={styles.textTitle}>Description</Text>
          </ListItem>
          <ListItem
            style={{
              flexDirection: "row-reverse",
              justifyContent: "space-between"
            }}
          >
            <View>
              <Text>{beerData.descript ? beerData.descript : "No Info"}</Text>
            </View>
          </ListItem>
          <ListItem style={{ flexDirection: "row-reverse" }} itemDivider>
            <Text style={styles.textTitle}>ABV</Text>
          </ListItem>
          <ListItem
            style={{
              flexDirection: "row-reverse",
              justifyContent: "space-between"
            }}
          >
            <View>
              <Text>{beerData.abv}</Text>
            </View>
          </ListItem>
        </List>
      </View>
    );
  }
}

export default SearchBody;

const styles = StyleSheet.create({
  textTitle: {
    fontWeight: "bold"
  }
});
