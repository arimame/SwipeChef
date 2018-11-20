// SwipeCards.js
'use strict';

import React, { Component } from 'react';
import {StyleSheet, Text, View, Image, Button} from 'react-native';

import SwipeCards from 'react-native-swipe-cards';

const cards = [
  {
    type: 'question',
    text: 'Alright, here comes the fun part 🕺 Let us know what you think of the following\n\n(Swipe to continue)',
    yupQuery: ''
  },
  {
    type: 'question',
    text: 'American food 🍔',
    yupQuery: '&allowedCuisine[]=cuisine^cuisine-american',
    nopeQuery: '&excludedCuisine[]=cuisine^cuisine-american'
  },
  {
    type: 'question',
    text: 'Italian food 🍝',
    yupQuery: '&allowedCuisine[]=cuisine^cuisine-italian',
    nopeQuery: '&excludedCuisine[]=cuisine^cuisine-italian'
  },
  {
    type: 'question',
    text: 'Asian food 🍜',
    yupQuery: '&allowedCuisine[]=cuisine^cuisine-asian',
    nopeQuery: '&excludedCuisine[]=cuisine^cuisine-asian'
  },
  {
    type: 'question',
    text: 'Mexican food 🌮',
    yupQuery: '&allowedCuisine[]=cuisine^cuisine-mexican',
    nopeQuery: '&excludedCuisine[]=cuisine^cuisine-mexican',
    lastCard: true
  },
  {
    type: 'question',
    text: 'Southern & Soul food',
    yupQuery: '&allowedCuisine[]=cuisine^cuisine-southern',
    nopeQuery: '&excludedCuisine[]=cuisine^cuisine-southern'
  },
  {
    type: 'question',
    text: 'French food 🥖',
    yupQuery: '&allowedCuisine[]=cuisine^cuisine-french',
    nopeQuery: '&excludedCuisine[]=cuisine^cuisine-french'
  },
  {
    type: 'question',
    text: 'Southwestern food',
    yupQuery: '&allowedCuisine[]=cuisine^cuisine-southwestern',
    nopeQuery: '&excludedCuisine[]=cuisine^cuisine-southwestern'
  },
  {
    type: 'question',
    text: 'Barbecue 🍖',
    yupQuery: '&allowedCuisine[]=cuisine^cuisine-barbecue',
    nopeQuery: '&excludedCuisine[]=cuisine^cuisine-barbecue'
  },
  {
    type: 'question',
    text: 'Indian food 🍛',
    yupQuery: '&allowedCuisine[]=cuisine^cuisine-indian',
    nopeQuery: '&excludedCuisine[]=cuisine^cuisine-indian'
  },
  {
    type: 'question',
    text: 'Chinese food 🥡',
    yupQuery: '&allowedCuisine[]=cuisine^cuisine-chinese',
    nopeQuery: '&excludedCuisine[]=cuisine^cuisine-chinese'
  },
  {
    type: 'question',
    text: 'Cajun & Creole food 🥡',
    yupQuery: '&allowedCuisine[]=cuisine^cuisine-cajun',
    nopeQuery: '&excludedCuisine[]=cuisine^cuisine-cajun'
  },
  {
    type: 'question',
    text: 'English food 🇬🇧',
    yupQuery: '&allowedCuisine[]=cuisine^cuisine-english',
    nopeQuery: '&excludedCuisine[]=cuisine^cuisine-english'
  },
  {
    type: 'question',
    text: 'Mediterranean food',
    yupQuery: '&allowedCuisine[]=cuisine^cuisine-mediterranean',
    nopeQuery: '&excludedCuisine[]=cuisine^cuisine-mediterranean'
  },
  {
    type: 'question',
    text: 'Greek food 🥗',
    yupQuery: '&allowedCuisine[]=cuisine^cuisine-greek',
    nopeQuery: '&excludedCuisine[]=cuisine^cuisine-greek'
  },
  {
    type: 'question',
    text: 'Spanish food 🥘',
    yupQuery: '&allowedCuisine[]=cuisine^cuisine-spanish',
    nopeQuery: '&excludedCuisine[]=cuisine^cuisine-spanish'
  },
  {
    type: 'question',
    text: 'German food 🇩🇪',
    yupQuery: '&allowedCuisine[]=cuisine^cuisine-german',
    nopeQuery: '&excludedCuisine[]=cuisine^cuisine-german'
  },
  {
    type: 'question',
    text: 'Thai food',
    yupQuery: '&allowedCuisine[]=cuisine^cuisine-thai',
    nopeQuery: '&excludedCuisine[]=cuisine^cuisine-thai'
  },
  {
    type: 'question',
    text: 'Moroccan food',
    yupQuery: '&allowedCuisine[]=cuisine^cuisine-morroccan',
    nopeQuery: '&excludedCuisine[]=cuisine^cuisine-morroccan'
  },
  {
    type: 'question',
    text: 'Irish food 🇮🇪',
    yupQuery: '&allowedCuisine[]=cuisine^cuisine-irish',
    nopeQuery: '&excludedCuisine[]=cuisine^cuisine-irish'
  },
  {
    type: 'question',
    text: 'Japanese food 🍣',
    yupQuery: '&allowedCuisine[]=cuisine^cuisine-japanese',
    nopeQuery: '&excludedCuisine[]=cuisine^cuisine-japanese'
  },
  {
    type: 'question',
    text: 'Cuban food',
    yupQuery: '&allowedCuisine[]=cuisine^cuisine-cuban',
    nopeQuery: '&excludedCuisine[]=cuisine^cuisine-cuban'
  },
  {
    type: 'question',
    text: 'Hawaiian food 🍍',
    yupQuery: '&allowedCuisine[]=cuisine^cuisine-hawaiian',
    nopeQuery: '&excludedCuisine[]=cuisine^cuisine-hawaiian'
  },
  {
    type: 'question',
    text: 'Swedish food',
    yupQuery: '&allowedCuisine[]=cuisine^cuisine-swedish',
    nopeQuery: '&excludedCuisine[]=cuisine^cuisine-swedish'
  },
  {
    type: 'question',
    text: 'Hungarian food',
    yupQuery: '&allowedCuisine[]=cuisine^cuisine-hungarian',
    nopeQuery: '&excludedCuisine[]=cuisine^cuisine-hungarian'
  },
  {
    type: 'question',
    text: 'Portugese food',
    yupQuery: '&allowedCuisine[]=cuisine^cuisine-portugese',
    nopeQuery: '&excludedCuisine[]=cuisine^cuisine-portugese'
  },
  {
    type: 'question',
    text: 'Something sweet 🍬',
    yupQuery: '&flavor.sweet.min=0.5',
    nopeQuery: '&flavor.sweet.max=0.2'
  },
  {
    type: 'question',
    text: 'Something savoury',
    yupQuery: '&flavor.meaty.min=0.5',
    nopeQuery: '&flavor.meaty.max=0.2'
  },
  {
    type: 'question',
    text: 'Something salty 🥨',
    yupQuery: '&flavor.salty.min=0.5',
    nopeQuery: '&flavor.salty.max=0.2'
  },
  {
    type: 'question',
    text: 'Something spicy 🔥',
    yupQuery: '&flavor.piquant.min=0.5',
    nopeQuery: '&flavor.piquant.max=0.2'
  },
  {
    type: 'question',
    text: 'Chicken',
    yupQuery: '&q=chicken',
    nopeQuery: '&excludedIngredient[]=chicken'
  },
  {
    type: 'question',
    text: 'Beef',
    yupQuery: '&q=beef',
    nopeQuery: '&excludedIngredient[]=beef'
  },
  {
    type: 'question',
    text: 'Pork',
    yupQuery: '&q=pork',
    nopeQuery: '&excludedIngredient[]=pork'
  },
  {
    type: 'question',
    text: 'Seafood',
    yupQuery: '&q=seafood',
    nopeQuery: '&excludedIngredient[]=fish'
  },
  {
    type: 'question',
    text: 'Lamb',
    yupQuery: '&q=lamb',
    nopeQuery: '&excludedIngredient[]=lamb'
  },
  {
    type: 'question',
    text: 'Pasta 🍝',
    yupQuery: '&q=pasta',
    nopeQuery: '&excludedIngredient[]=pasta'
  },
  {
    type: 'question',
    text: 'Rice 🍚',
    yupQuery: '&q=rice',
    nopeQuery: '&excludedIngredient[]=rice'
  },
  {
    type: 'question',
    text: 'Quinoa',
    yupQuery: '&q=quinoa',
    nopeQuery: '&excludedIngredient[]=quinoa'
  },
  {
    type: 'question',
    text: 'Turkey',
    yupQuery: '&q=turkey',
    nopeQuery: '&excludedIngredient[]=turkey'
  },
  {
    type: 'question',
    text: 'Eggs 🥚',
    yupQuery: '&q=egg',
    nopeQuery: '&excludedIngredient[]=eggs'
  },
  {
    type: 'question',
    text: 'Cheese 🧀',
    yupQuery: '&q=cheese',
    nopeQuery: '&excludedIngredient[]=cheese'
  },
  {
    type: 'question',
    text: 'Eggplant 🍆',
    yupQuery: '&q=eggplant',
    nopeQuery: '&excludedIngredient[]=eggplant'
  },
  {
    type: 'question',
    text: 'Butternut Squash',
    yupQuery: '&q=butternut+squash',
    nopeQuery: '&excludedIngredient[]=butternut+squash'
  },
  {
    type: 'question',
    text: 'Zucchini',
    yupQuery: '&q=zucchini',
    nopeQuery: '&excludedIngredient[]=zucchini'
  },
  {
    type: 'question',
    text: 'Mushrooms 🍄',
    yupQuery: '&q=mushroom',
    nopeQuery: '&excludedIngredient[]=mushrooms'
  },
  {
    type: 'question',
    text: 'Tofu',
    yupQuery: '&q=tofu',
    nopeQuery: '&excludedIngredient[]=tofu'
  },
  {
    type: 'question',
    text: 'Avocado 🥑',
    yupQuery: '&q=avocado',
    nopeQuery: '&excludedIngredient[]=avocado'
  },
  {
    type: 'question',
    text: 'Bacon 🥓',
    yupQuery: '&q=bacon',
    nopeQuery: '&excludedIngredient[]=bacon'
  },
  {
    type: 'question',
    text: 'Kale',
    yupQuery: '&q=kale',
    nopeQuery: '&excludedIngredient[]=kale'
  }
]

const generateCards = () => {
  const numArr = [0];
  while (numArr.length < 11) {
    const rand = Math.floor(Math.random() * cards.length) + 1;
    if (numArr.indexOf(rand) === -1) numArr.push(rand);
  }
  const cardArr = [];
  for (const i of numArr) {
    cardArr.push(cards[i])
  }
  return cardArr;
}

const funCards = generateCards();

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
    yupQuery: '&allowedHoliday[]=holiday^holiday-christmas',
  },
  {
    type: 'question',
    text: 'Is health a factor?',
    yupQuery: '',
    nopeUpdateCards: funCards
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
    yupQuery: '&nutrition.FIBTG.min=2',
    nopeUpdateCards: funCards,
    yupUpdateCards: funCards
  } 
]

const courseCards = [
  {
    type: 'question',
    text: 'Let\'s get cooking! 👨‍🍳\n\nAre you making a main dish? 🍽',
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
  }
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
      if (card.yupUpdateCards) {
        this.updateCards(card.yupUpdateCards);
      }
      if (card.lastCard) {
        this.lastCard();
      }
    }

    else {
      console.log(`Yup for ${card.text}`)
        fetch("http://172.46.0.254:3000/recipes", {
        method: 'POST',
        headers:
          {"Accept": "application/json",
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `api_ref=${card.id}&name=${card.text}&image=${card.image}` // <-- Post parameters
      }).then( results => {
         let parsedResults = JSON.parse(results._bodyInit);
         fetch(`http://172.46.0.254:3000/users/${parsedResults.user_id}/fridges`, {
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

  handleNope = (card) => {
    
    if (card.type === "question") {
      if (card.nopeQuery) {
        this.addToQuery(card.nopeQuery);
      }
      if (card.nopeUpdateCards) {
        this.updateCards(card.nopeUpdateCards);
      }
      if (card.lastCard) {
        this.lastCard();
      }
    }
  }

  handleMaybe = (card) => {
    if (card.lastCard) {
      this.lastCard();
    }
  }

  lastCard = () => {
    const encodedQuery = encodeURI(this.query)
    console.log('-----------this.query---------------', encodedQuery)
    fetch(`http://172.46.0.254:3000?query=${encodedQuery}`, {
     method: "GET",
     headers: {
       "Accept": "application/json",
       "Content-Type": "application/json"
     }
   })
   .then(results => {
     console.log(results._bodyInit)
     let parsedResults = JSON.parse(results._bodyInit);
     const newCards = [];
     for (let match of parsedResults.matches) {
       let image = match.imageUrlsBySize["90"]
       let largeImage = image.substring(0, image.length - 5)
       largeImage += "s1200-c"
       console.log(largeImage)
       newCards.push({text: match.recipeName, image: largeImage, backgroundColor: "black", id: match.id})
     }

      // var lol = JSON.parse(results)
      // console.log("TEST")
      // console.log(results)
      // let test = results._bodyText
      // let newCards = this.state.cards
      // newCards = newCards.concat({text: test, backgroundColor: 'pink'})
      // console.log('newcards', newCards)
     this.setState({cards: newCards}, () => {
        // console.log('state', this.state.cards);
     })
   })
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