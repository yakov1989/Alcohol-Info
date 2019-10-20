import React, { Component } from "react";
import { Container, Content } from "native-base";
import { Keyboard, YellowBox, Text } from "react-native";
import SearchCocktailHeader from "./SearchCocktailHeader";
import SearchCocktailBody from "./SearchCocktailBody";
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";

YellowBox.ignoreWarnings(["@firebase/database"]);
class SearchCocktailTab extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    searchCocktail: "",
    cocktailData: {},
    cocktailFound: "",
    error: ""
  };

  CocktailSearch = () => {
    Keyboard.dismiss();
    const cocktailName = this.state.searchCocktail.toLowerCase();
    if (cocktailName.length == 0) {
      alert("Please Enter valid Cocktail Name!");
    } else {
      const query =
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=` +
        cocktailName;

      axios
        .get(query)
        .then(response => {
          var data = response.data.drinks[0] ? response.data.drinks[0] : false;
          //   console.log(data);

          if (data) {
            this.setState({
              cocktailData: data,
              cocktailFound: true
            });
          }
        })
        .catch(error => {
          this.setState({
            cocktailFound: false,
            error: "Cocktail Not Found"
          });
          console.log(error);
        });
    }
  };
  renderContent = () => {
    if (this.state.cocktailFound) {
      return (
        <SearchCocktailBody
          cocktailName={this.props.cocktailName}
          cocktailData={this.state.cocktailData}
        />
      );
    } else {
    }
  };

  render() {
    return (
      <Container>
        <SearchCocktailHeader
          value={this.state.CocktailSearch}
          onChangeText={searchCocktail => this.setState({ searchCocktail })}
          CocktailSearch={this.CocktailSearch}
        ></SearchCocktailHeader>
        <ScrollView>
          {this.state.cocktailFound ? (
            this.renderContent()
          ) : (
            <Text style={{ color: "red", fontSize: 16 }}>
              {this.state.error}
            </Text>
          )}
        </ScrollView>
        {/* <Text style={{ color: "red", fontSize: 16 }}>{this.state.error}</Text> */}
      </Container>
    );
  }
}

export default SearchCocktailTab;
