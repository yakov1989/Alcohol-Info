import React, { Component } from "react";
import { Container, Content, List, ListItem, Image } from "native-base";
import { Keyboard, YellowBox, View, FlatList, Text } from "react-native";
import SearchCocktailHeader from "./SearchCocktailHeader";
// import SearchCocktailBody from "./SearchCocktailBody";
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";

YellowBox.ignoreWarnings(["@firebase/database"]);
class SearchByInredient extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    searchCocktail: "",
    cocktailData: [],
    cocktailFound: ""
  };

  componentWillMount() {
    this.CocktailSearch();
  }
  CocktailSearch = () => {
    Keyboard.dismiss();
    const cocktailName = this.state.searchCocktail.toLowerCase();
    const query =
      "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail ";

    axios
      .get(query)
      .then(response => {
        var data = response.data.drinks ? response.data.drinks : false;
        // console.log(data[0].strDrinkThumb);

        if (data) {
          this.setState({
            cocktailData: data,
            cocktailFound: true
          });
          //   console.log(this.state.cocktailData);
        }
      })
      .catch(error => {
        this.setState({
          cocktailFound: false
        });
        console.log(error);
      });
  };

  //   renderContent = () => {
  //     if (this.state.cocktailFound) {
  //       return (

  //       );
  //     } else {
  //       console.log("Cocktail not Found");
  //     }
  //   };

  render() {
    const cocktailData = this.state.cocktailData;
    console.log(cocktailData[0].idDrink);
    return (
      <Container>
        <SearchCocktailHeader
          value={this.state.CocktailSearch}
          onChangeText={searchCocktail => this.setState({ searchCocktail })}
          CocktailSearch={this.CocktailSearch}
        ></SearchCocktailHeader>
        <View>
          {/* <FlatList
            data={this.state.cocktailData}
            keyExtractor={(x, i) => i}
            renderItem={({ item }) => (
              <Text>
                {item.strDrink} {item.idDrink}
              </Text>
            )}
          ></FlatList> */}
          {/* <Image
            source={{ uri: cocktailData[0].strDrinkThumb }}
            style={{ height: 150, width: 150 }}
          ></Image> */}
        </View>
      </Container>
    );
  }
}

export default SearchByInredient;
