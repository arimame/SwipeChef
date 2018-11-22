// SwipeCards.js
'use strict';

import React, { Component } from 'react';
import {StyleSheet, Text, View, Image, Button, AsyncStorage} from 'react-native';

import SwipeCards from 'react-native-swipe-cards';

const uniqueNumArr = (maxNum, length) => {
  const numArr = [];
  while (numArr.length < length) {
    const rand = Math.floor(Math.random() * maxNum);
    if (numArr.indexOf(rand) === -1) numArr.push(rand);
  }
  return numArr;
}

const ingredientsDeck = [
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

const cuisineDeck = [
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
    nopeQuery: '&excludedCuisine[]=cuisine^cuisine-mexican'
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
  }
]

const flavourDeck = [
  {
    type: 'question',
    text: 'Are you craving something sweet? 🍬',
    yupQuery: '&flavor.sweet.min=0.3',
    nopeQuery: '&flavor.sweet.max=0.3'
  },
  {
    type: 'question',
    text: 'Are you craving something savoury?',
    yupQuery: '&flavor.meaty.min=0.3',
    nopeQuery: '&flavor.meaty.max=0.3'
  },
  {
    type: 'question',
    text: 'Are you craving something salty? 🥨',
    yupQuery: '&flavor.salty.min=0.3',
    nopeQuery: '&flavor.salty.max=0.3'
  },
  {
    type: 'question',
    text: 'Are you craving something spicy? 🔥',
    yupQuery: '&flavor.piquant.min=0.3',
    nopeQuery: '&flavor.piquant.max=0.3'
  }
]

const buildIngredientsCards = () => {
  const cards = [];
  cards.push(
    {
      type: 'question',
      text: 'Ok, time to look at some ingredients.\n\nSwipe right for yes, left for no, and up for maybe\n\n(Swipe to continue)',
      yupQuery: '',
    }
  );
  const indexArr = uniqueNumArr(ingredientsDeck.length, 5);
  for (const num of indexArr) {
    cards.push(ingredientsDeck[num])
  }
  cards[cards.length - 1].yupLastCard = true;
  cards[cards.length - 1].nopeLastCard = true;
  cards[cards.length - 1].prevDeck = "ingredients";
  cards.push(
    {
      type: 'question',
      text: '',
      color: 'white',
      yupQuery: ''
    }
  )
  return cards;
}

const buildCusineCards = () => {
  const cards = [];
  cards.push(flavourDeck[Math.floor(Math.random() * 4)]);
  cards.push(
    {
      type: 'question',
      text: 'Alright, let\'s look at some cuisines\n\nSwipe right for any cuisine you would like to view recipes for\n\n(Swipe to continue)',
      yupQuery: '',
    }
  );
  const indexArr = uniqueNumArr(cuisineDeck.length, 5);
  for (const num of indexArr) {
    cards.push(cuisineDeck[num])
  }
  cards[cards.length - 1].yupLastCard = true;
  cards[cards.length - 1].nopeLastCard = true;
  cards[cards.length - 1].prevDeck = "cuisine";
  cards.push(
    {
      type: 'question',
      text: '',
      color: 'white',
      yupQuery: ''
    }
  )
  return cards;
}

const ingredientsCards = buildIngredientsCards();

const cuisineCards = buildCusineCards();

const nutritionCards = [
  {
    type: 'question',
    text: 'Good for you! 💪\n\nSwipe right for everything you want to keep into account:\n\n(Swipe to continue)',
    yupQuery: ''
  },
  {
    type: 'question',
    text: 'Calorie intake',
    yupQuery: '&nutrition.ENERC_KCAL.max=750'
  },
  {
    type: 'question',
    text: 'Low fat',
    yupQuery: '&nutrition.FAT.max=20'
  },
  {
    type: 'question',
    text: 'High protein 🏋️‍♀️',
    yupQuery: '&nutrition.PROCNT.min=25'
  },
  {
    type: 'question',
    text: 'Low carbs 🍞',
    yupQuery: '&nutrition.CHOCDF.max=30',
    yupLastCard: true,
    nopeLastCard: true,
    prevDeck: "nutrition"
  },
  {
    type: 'question',
    text: '',
    color: 'white',
    yupQuery: ''
  }
]

const health = [
  {
    type: 'question',
    text: 'Is health a factor?',
    yupQuery: '',
    yupUpdateCards: nutritionCards,
    nopeLastCard: true,
    prevDeck: "nutrition"
  },
  {
    type: 'question',
    text: '',
    color: 'white',
    yupQuery: ''
  },
]

const xmasCard = [
  {
    type: 'question',
    text: 'Want to browse Christmas recipes? ❄🎄',
    yupQuery: '&allowedHoliday[]=holiday^holiday-christmas',
    yupLastCard: true,
    prevDeck: "xmas",
    nopeUpdateCards: health
  },
  {
    type: 'question',
    text: '',
    color: 'white',
    yupQuery: ''
  },
]

const timeCard = [
  {
    type: 'question',
    text: 'Are you in a rush? 🏃‍♀️💨\n\n (We\'ll limit cooking times to less than 30 mins)',
    yupQuery: '&maxTotalTimeInSeconds=1800',
    yupLastCard: true,
    nopeUpdateCards: xmasCard,
    prevDeck: "time"
  },
  {
    type: 'question',
    text: '',
    color: 'white',
    yupQuery: ''
  },
]

const courseCards = [
  {
    type: 'question',
    text: 'Let\'s get cooking! 👨‍🍳\n\nAre you making a main dish? 🍽',
    yupQuery: '&allowedCourse[]=course^course-Main+Dishes',
    yupUpdateCards: timeCard
  },
  {
    type: 'question',
    text: 'How about an appetizer?',
    yupQuery: '&allowedCourse[]=course^course-Appetizers',
    yupUpdateCards: timeCard
  },
  {
    type: 'question',
    text: 'Dessert? 🤤',
    yupQuery: '&allowedCourse[]=course^course-Desserts',
    yupUpdateCards: timeCard
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

    const image = (
      <Image
        style={{width:325, height: 325}}
        source={{uri: this.props.image}}
      />
    )

    return (
      <View style={[styles.card, {backgroundColor: this.props.color || 'black'}]}>
        <Text
          style={{fontSize:18, color:"white", fontWeight:"bold", textAlign: 'center'}}
        >{this.props.text}
        </Text>
        {image}
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
        <Text style={styles.noMoreCardsText}>No more recipes match your search. You're a swiping machine!</Text>
        <Text style={styles.noMoreCardsText}>Start a new swipe session to discover new recipes</Text>
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
    this.index = 0;
    this.prevDeck = null;
    this.query = '';
    this.nextDeck = null;
    this.deckSize = 2;
    this.moreQuestions = true;
  }

  componentDidUpdate() {
    if (!this.moreQuestions || this.prevDeck === "xmas" || this.prevDeck === "ingredients") {
      this.index += this.deckSize;
      const OGquery = `http://172.46.3.249:3000?query=${this.query}&start=${this.index}&maxResult=${this.deckSize}`
      const encodedQuery = encodeURI(OGquery)
      console.log('-----------this.query---------------', encodedQuery)
      fetch(encodedQuery, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(results => {
        // console.log("------------------TEST")
        // console.log(results)
        // console.log("------------------TEST")
        let parsedResults = JSON.parse(results._bodyInit);
        const newCards = [];
        for (let match of parsedResults.matches) {
          let image = match.imageUrlsBySize["90"]
          let largeImage = image.substring(0, image.length - 5)
          largeImage += "s1200-c"
          console.log(largeImage)
          newCards.push({text: match.recipeName, image: largeImage, backgroundColor: "black", id: match.id})
        }
        newCards[newCards.length - 1].lastCard = true;
        this.nextDeck = newCards;
      })
    }
  }

  handleYup = (card) => {
    console.log("PREVDECK:", this.prevDeck)
    console.log("NEXTDECK:", this.nextDeck)

    if (card.type === "question") {
      this.addToQuery(card.yupQuery);
      if (card.yupUpdateCards) {
        this.updateCards(card.yupUpdateCards);
      }
      if (card.yupLastCard) {
        this.lastCard();
        this.prevDeck = card.prevDeck;
      }
    }

    else if (card.type === "addFilters") {
      this.index += this.deckSize;
      if (this.prevDeck === "time") {
        this.updateCards(xmasCard)
      } else if (this.prevDeck === "nutrition") {
        this.updateCards(cuisineCards)
      } else if (this.prevDeck === "cuisine") {
        this.updateCards(ingredientsCards)
      }
    }
    else {
      AsyncStorage.getItem('swipeChefToken').then(swipeChefToken => {
        console.log(`Yup for ${card.text}`)
        fetch(`http://172.46.3.249:3000/recipes`, {
          method: 'POST',
          headers:
            {"Accept": "application/json",
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: `api_ref=${card.id}&name=${card.text}&image=${card.image}` // <-- Post parameters
        }).then( results => {
           let parsedResults = JSON.parse(results._bodyInit);
           fetch(`http://172.46.3.249:3000/fridges?swipeChefToken=${swipeChefToken}`, {
            method: 'POST',
            headers:
              {"Accept": "application/json",
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `recipe_id=${parsedResults.recipe_id}` // <-- Post parameters
          })
        })
        if (card.lastCard) this.updateCards(this.nextDeck);
      })
    }
  }

  addToQuery = (str) => {
    this.query += str;
  }

  updateCards = (cardDeck) => {
    setTimeout(() => {
      this.setState({cards: cardDeck})
    }, 200);
  }

  handleNope = (card) => {

    if (card.type === "question") {
      if (card.nopeQuery) {
        this.addToQuery(card.nopeQuery);
      }
      if (card.nopeUpdateCards) {
        this.updateCards(card.nopeUpdateCards);
      }
      if (card.nopeLastCard) {
        this.lastCard();
        this.prevDeck = card.prevDeck;
      }
    }

    else if (card.type === "addFilters") {
      this.index += this.deckSize
      this.moreQuestions = false;
      this.lastCard()
    }

    else {
      if (card.lastCard) this.updateCards(this.nextDeck);
    }
  }

  handleMaybe = (card) => {
    if (card.type === "question") {
      if (this.prevDeck !== "cuisine")
        this.addToQuery(card.yupQuery);
      }
      if (card.yupUpdateCards) {
        this.updateCards(card.yupUpdateCards);
      }
      if (card.yupLastCard) {
        this.lastCard();
        this.prevDeck = card.prevDeck;
      }

    else if (card.type === "addFilters") {
      this.index += this.deckSize;
      if (this.prevDeck === "time") {
        this.setState({cards: xmasCard})
      } else if (this.prevDeck === "nutrition") {
        this.setState({cards: cuisineCards})
      } else if (this.prevDeck === "cuisine") {
        this.setState({cards: ingredientsCards})
      }
    }

    else {
      if (card.lastCard) this.updateCards(this.nextDeck);
    }
  }

  lastCard = () => {
    const OGquery = `http://172.46.3.249:3000?query=${this.query}&start=${this.index}&maxResult=${this.deckSize}`
    const encodedQuery = encodeURI(OGquery)
    console.log('-----------this.query---------------', encodedQuery)
    fetch(encodedQuery, {
     method: "GET",
     headers: {
       "Accept": "application/json",
       "Content-Type": "application/json"
     }
   })
   .then(results => {
     let parsedResults = JSON.parse(results._bodyInit);
     const newCards = [];
     for (let match of parsedResults.matches) {
       console.log("----------MATCH")
       console.log(match);
       let image = match.imageUrlsBySize["90"]
       let largeImage = image.substring(0, image.length - 5)
       largeImage += "s1200-c"
       console.log(largeImage)
       newCards.push({text: match.recipeName, image: largeImage, backgroundColor: "black", id: match.id})
     }
     if (this.moreQuestions && this.prevDeck !== "xmas" && this.prevDeck !== "ingredients") {
      newCards.push(
        {
          type: 'addFilters',
          text: 'Would you like to add more filters to your search?'
        }
      );
    } else {
      newCards[newCards.length - 1].lastCard = true;
    }
      newCards.push(
        {
          type: 'question',
          text: '',
          color: 'white',
        }
      )

    console.log("-------------")
     console.log('NEWCARDS', newCards)
     this.setState({cards: newCards})
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
    textAlign: 'center'
  }
})