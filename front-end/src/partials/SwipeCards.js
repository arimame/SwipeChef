// SwipeCards.js
'use strict';

import React, { Component } from 'react';
import {StyleSheet, Text, View, Image, Button} from 'react-native';

import SwipeCards from 'react-native-swipe-cards';

// const flavor

const randomAndNutritionCards = [
  {
    type: 'question',
    text: 'Are you in a rush? 🏃‍♀️💨',
    yupQuery: '&maxTotalTimeInSeconds=1800'
  },
  {
    type: 'question',
    text: 'Does it need to be kid-friendly? 👧🧒',
    yupQuery: '&allowedCuisine[]=cuisine^cuisine-kid-friendly'
  },
  {
    type: 'question',
    text: 'Feeling festive? ❄🎄',
    yupQuery: '&allowedHoliday[]=holiday^holiday-christmas'
  },
  {
    type: 'question',
    text: 'Is health a factor?',
    yupQuery: '',
    // nopeUpdateCards: 
  },
  {
    type: 'question',
    text: 'Good for you! 💪 Swipe right for everything you want to keep into account:\n\nCalorie intake',
    yupQuery: '&nutrition.ENERC_KCAL.max=750'
  },
  {
    type: 'question',
    text: 'Low fat',
    yupQuery: '&nutrition.FAT.max=20'
  },
  {
    type: 'question',
    text: 'Low sugar 🍭',
    yupQuery: '&nutrition.SUGAR.max=20'
  },
  {
    type: 'question',
    text: 'High protein 🏋️‍♀️',
    yupQuery: '&nutrition.PROCNT.min=25'
  },
  {
    type: 'question',
    text: 'Low carbs 🍞',
    yupQuery: '&nutrition.CHOCDF.max=30'
  },
  {
    type: 'question',
    text: 'Low cholesterol',
    yupQuery: '&nutrition.CHOLE.max=0.3'
  },
  {
    type: 'question',
    text: 'Low sodium 🧂',
    yupQuery: '&nutrition.NA.max=0.5'
  },
  {
    type: 'question',
    text: 'High fiver',
    yupQuery: '&nutrition.FIBTG.min=2'
  }
]

const courseCards = [
  {
    type: 'question',
    text: 'Let\'s get cooking! 👨‍🍳\nAre you making a main dish? 🍽',
    yupQuery: '&allowedCourse[]=course^course-Main+Dishes',
    yupUpdateCards: randomAndNutritionCards
  },
  {
    type: 'question',
    text: 'How about an appetizer?',
    yupQuery: '&allowedCourse[]=course^course-Appetizers',
    yupUpdateCards: randomAndNutritionCards
  },
  {
    type: 'question',
    text: 'Dessert? 🤤',
    yupQuery: '&allowedCourse[]=course^course-Desserts',
    yupUpdateCards: randomAndNutritionCards
  },
  {
    type: 'question',
    text: 'Breakfast/brunch?',
    yupQuery: '&allowedCourse[]=course^course-Breakfast+and+Brunch',
    yupUpdateCards: randomAndNutritionCards
  },
  {
    type: 'question',
    text: 'Ok, you\'re making lunch?',
    yupQuery: '&allowedCourse[]=course^course-Lunch',
    yupUpdateCards: randomAndNutritionCards
  },
]

class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  detailsButtonPress = (e) => {
    this.props.trx.updateCurrentRecipe(this.props.id, "swipe")
  }

  render() {
    return (
      <View style={[styles.card, {backgroundColor: 'black'}]}>
        <Text
          style={{fontSize:18, color:"white", fontWeight:"bold"}}
        >{this.props.text}
        </Text>
        <Image
          style={{width:325, height: 325}}
          source={{uri: this.props.image}}
        />
        <Button
          onPress={this.detailsButtonPress}
          title="Details"
          color="white"
        />
      </View>
    )
  }
}

class NoMoreCards extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text style={styles.noMoreCardsText}>{this.props.query}</Text>
      </View>
    )
  }
}

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: courseCards
    };
    this.query = "";
  }

  //componentDidMount() {
  //  fetch('http://172.46.3.249:3000', {
  //    method: "GET",
  //    headers: {
  //      "Accept": "application/json",
  //      "Content-Type": "application/json"
  //    }
  //  })
  //  .then(results => {
  //    console.log(results._bodyInit)
  //    let parsedResults = JSON.parse(results._bodyInit);
  //    const newCards = [];
  //    for (let match of parsedResults.matches) {
  //      let image = match.imageUrlsBySize["90"]
  //      let largeImage = image.substring(0, image.length - 5)
  //      largeImage += "s1200-c"
  //      console.log(largeImage)
  //      newCards.push({text: match.recipeName, image: largeImage, backgroundColor: "black", id: match.id})
  //    }

      // var lol = JSON.parse(results)
      // console.log("TEST")
      // console.log(results)
      // let test = results._bodyText
      // let newCards = this.state.cards
      // newCards = newCards.concat({text: test, backgroundColor: 'pink'})
      // console.log('newcards', newCards)
  //    this.setState({cards: newCards}, () => {
        // console.log('state', this.state.cards);
  //    })
  //  })
  //}

  handleYup = (card) => {

    if (card.type === "question") {
      this.addToQuery(card.yupQuery);
      console.log('-------------newDeck', card.updateCards)
      if (card.yupUpdateCards) {
        this.updateCards(card.yupUpdateCards);
      }
    }

    else {
      console.log(`Yup for ${card.text}`)
        fetch("http://172.46.3.249:3000/recipes", {
        method: 'POST',
        headers:
          {"Accept": "application/json",
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `api_ref=${card.id}&name=${card.text}&image=${card.image}` // <-- Post parameters
      }).then( results => {
         let parsedResults = JSON.parse(results._bodyInit);
         fetch(`http://172.46.3.249:3000/users/${parsedResults.user_id}/fridges`, {
          method: 'POST',
          headers:
            {"Accept": "application/json",
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: `recipe_id=${parsedResults.recipe_id}` // <-- Post parameters
        })
      })
    }
  }

  addToQuery = (str) => {
    this.query += str;
  }

  updateCards = (cardDeck) => {
    this.setState({cards: cardDeck})
  }

  handleNope (card) {
    console.log(`Nope for ${card.text}`)
  }
  handleMaybe (card) {
    console.log(`Maybe for ${card.text}`)
  }
  render() {
    // If you want a stack of cards instead of one-per-one view, activate stack mode
    // stack={true}
    // console.log('Im rendering')
    // console.log('wat', this.state.cards);
    return (
      <SwipeCards
        loop={false}
        cards={this.state.cards}
        renderCard={(cardData) => <Card {...cardData} trx={this.props.trx} />}
        renderNoMoreCards={() => <NoMoreCards query={this.query} />}
        showYup={false}
        showNope={false}
        showMaybe={false}

        handleYup={this.handleYup}
        handleNope={this.handleNope}
        handleMaybe={this.handleMaybe}
        hasMaybeAction
      />
    )
  }
}

const height = '90%';

const styles = StyleSheet.create({
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    height,
    width: 350,
    borderRadius:10
  },
  noMoreCardsText: {
    fontSize: 22,
  }
})