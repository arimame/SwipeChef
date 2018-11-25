// SwipeCards.js
'use strict';

import React, { Component } from 'react';
import {StyleSheet, Text, View, Image, Button, AsyncStorage, TouchableHighlight} from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

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
      text: 'Ok, time to look at some ingredients.',
      subText: 'Swipe right for yes, left for no, and up for maybe\n\n(Swipe to continue)',
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
      text: 'Alright, let\'s look at some cuisines',
      subText: 'Swipe right for any cuisine you would like to view recipes for\n\n(Swipe to continue)',
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
    text: 'Good for you! 💪',
    subText: 'Swipe right for everything you want to keep into account: \n\n (Swipe to continue)',
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
    text: 'Are you in a rush? 🏃‍♀️💨',
    subText: '(We\'ll limit cooking times to less than 30 mins)',
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

const tutorialCards = [
  {
    type: 'question',
    text: 'Swipe left on a question card to respond \'no\'',
    subText: '(Swipe left to continue)',
    icon: 'gesture-swipe-left',
    yupQuery: ''
  },
  {
    type: 'question',
    text: 'Swipe right on a question card to respond \'yes\'',
    subText: '(Swipe right to continue)',
    icon: 'gesture-swipe-right',
    yupQuery: ''
  },
  {
    type: 'question',
    text: 'Tap a picture of a recipe to view more information about it',
    subText: '(Swipe to continue)',
    icon: 'gesture-tap',
    yupQuery: ''
  },
  {
    type: 'question',
    text: 'Swipe left on a recipe card to view the next recipe',
    subText: '(Swipe left to continue)',
    icon: 'gesture-swipe-left',
    yupQuery: ''
  },
  {
    type: 'question',
    text: 'Swipe right on a recipe card to add the recipe to your fridge',
    subText: '(Swipe right to continue)',
    icon: 'gesture-swipe-right',
    yupQuery: ''
  },
  {
    type: 'question',
    text: 'Your Fridge',
    subText: 'Recipes in your fridge expire in 10 days\n\n(Swipe to continue)',
    icon: "fridge",
    yupQuery: ''
  },
  {
    type: 'question',
    text: 'Your Cookbook',
    subText: 'Save your favourite recipes by adding them to your cookbook. Your cookbook can be shared with other chefs.\n\n(Swipe to continue)',
    icon: "book-open-variant",
    yupQuery: ''
  },
  {
    type: 'question',
    text: 'Your Settings',
    subText: 'Specify diet preferences and allergies in your settings (accessible through your cookbook)\n\n(Swipe to continue)',
    icon: "settings-outline",
    yupQuery: ''
  },
  {
    type: 'question',
    text: 'Your Grocery List',
    subText: 'Add a recipe to your grocery list from your fridge or cookbook\n\n(Swipe to continue)',
    icon: "playlist-edit",
    yupQuery: ''
  },
  {
    type: 'question',
    text: 'You\'re all set! Happy swiping!',
    subText: '(Swipe to continue)',
    icon: 'emoticon-happy',
    yupQuery: '',
    yupUpdateCards: courseCards,
    nopeUpdateCards: courseCards
  },
  {
    type: 'question',
    text: '',
    color: 'white',
    yupQuery: ''
  },
]

const welcomeCard = [
  {
    type: 'question',
    text: 'Welcome to SwipeChef!',
    subText: 'Would you like to view the tutorial?\n\nSwipe right for \'yes\' or left for \'no\'',
    icon: "silverware-fork-knife",
    yupQuery: '',
    yupUpdateCards: tutorialCards,
    nopeUpdateCards: courseCards
  },
  {
    type: 'question',
    text: '',
    color: 'white',
    yupQuery: ''
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

    const image = (
      <TouchableHighlight onPress={this.detailsButtonPress}>
        <Image
          style={{width:325, height: 325, borderRadius: 5}}
          source={{uri: this.props.image}}
        />
      </TouchableHighlight>
    )

    const getRating = () => {
      const ratingN = this.props.rating
      console.log(ratingN)
      let ratingS = ""
      for (var i = 0; i < ratingN; i++) {
        ratingS += "⭐"
      }
      return ratingS
    }

    const recipeRating = getRating();

    const icon = this.props.icon ? (
      <Icon name = {this.props.icon} style={{textAlign: "center", fontSize: 60, color: "#F3C05F"}} />
    ) : (
      <View></View>
    )

    const cardRender = this.props.type === "question" || this.props.type === "addFilters" ?
    (<View style={styles.question_card_container}>
        <Text style={styles.question_card}>{this.props.text}</Text>
        {icon}
        <Text style={styles.question_card_sub}>{this.props.subText}</Text>
        <View style={{position: "absolute", bottom: 20}}>
        <Button
          onPress={this.props.reset}
          title="Start New Search"
          color="#0F2F47"

        />
        </View>
      </View>) :

      (<View style={styles.recipe_card_container}>
        <Text
          style={styles.recipe_card}
        >{this.props.text}
        </Text>
        {image}
        <View style={{flexDirection: 'row'}}>
          <Text style={{padding: 10, fontFamily: "arimo-regular", color:"#0F2F47"}}>Rating: {recipeRating}</Text>
          <Text style={{padding: 10, fontFamily: "arimo-regular", color:"#0F2F47"}}>⏲ Prep Time: {this.props.time} mins</Text>
        </View>
        <View style={{marginTop: 15}}>
          <Button
            onPress={this.props.reset}
            title="Start New Search"
            color="#0F2F47"
          />
        </View>
      </View>)

    return (
      <View>
      {cardRender}
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
      cards: [{type: 'question', text: '', color: 'white', yupQuery: '' }]
    };
    this.index = 0;
    this.prevDeck = null;
    this.query = '';
    this.nextDeck = null;
    this.deckSize = 5;
    this.moreQuestions = true;
  }

  componentDidMount() {
    (async () => {
      try {
        const storedState = await AsyncStorage.getItem("state");
        const storedIndex = await AsyncStorage.getItem("index");
        const storedPrevDeck = await AsyncStorage.getItem("prevDeck");
        const storedQuery = await AsyncStorage.getItem("query");
        const storedNextDeck = await AsyncStorage.getItem("nextDeck");

        const cards = JSON.parse(storedNextDeck).cards;
        if (storedState) {
          this.setState(JSON.parse(storedState));
          this.index = Number(storedIndex);
          this.prevDeck = storedPrevDeck;
          this.query = storedQuery || "";
          if (cards !== "false") {
            this.nextDeck = cards;
          }
         else {
          this.setState({cards: welcomeCard});
        }
      }
      } catch (error) {
        console.log(error);
      }
    })();
  }

  componentWillUnmount() {
    (async () => {
      try {
        await AsyncStorage.setItem("state", JSON.stringify(this.state));
        await AsyncStorage.setItem("index", this.index.toString());
        if (this.prevDeck) {
          await AsyncStorage.setItem("prevDeck", this.prevDeck);
        }
        if (this.query) {
          await AsyncStorage.setItem("query", this.query);
        }
        if (this.nextDeck) {
          await AsyncStorage.setItem("nextDeck", JSON.stringify({cards: this.nextDeck}))
        } else {
          await AsyncStorage.setItem("nextDeck", "false")
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }

  componentDidUpdate() {
    if (!this.moreQuestions || this.prevDeck === "xmas" || this.prevDeck === "ingredients") {
      AsyncStorage.getItem('swipeChefToken').then(swipeChefToken => {
        this.index += this.deckSize;
        const OGquery = `http://172.46.0.254:3000?query=${this.query}&maxResult=${this.deckSize}&start=${this.index}&swipeChefToken=${swipeChefToken}`
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
            const timeInMins = Math.round(match.totalTimeInSeconds / 60);
            newCards.push({text: match.recipeName, image: largeImage, id: match.id, rating: match.rating, time: timeInMins})
          }
          newCards[newCards.length - 1].lastCard = true;
          this.nextDeck = newCards;
        })
      })
    }
  }

  reset = () => {
    (async () => {
      try {
        await AsyncStorage.removeItem("state");
        await AsyncStorage.removeItem("index");
        await AsyncStorage.removeItem("prevDeck");
        await AsyncStorage.removeItem("query");
        await AsyncStorage.removeItem("nextDeck")
      } catch (error) {
        console.log(error)
      }
    })();
    this.setState({cards: welcomeCard});
    this.index = 0;
    this.prevDeck = null;
    this.query = '';
    this.nextDeck = null;
    this.moreQuestions = true;
  }

  handleYup = (card) => {
    // console.log("PREVDECK:", this.prevDeck)
    // console.log("NEXTDECK:", this.nextDeck)

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
        fetch(`http://172.46.0.254:3000/recipes`, {

          method: 'POST',
          headers:
            {"Accept": "application/json",
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: `api_ref=${card.id}&name=${card.text}&image=${card.image}` // <-- Post parameters
        }).then( results => {
           let parsedResults = JSON.parse(results._bodyInit);
           fetch(`http://172.46.0.254:3000/fridges?swipeChefToken=${swipeChefToken}`, {

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
      if (card.lastCard) {
        this.updateCards(this.nextDeck);
      }
      else {
        this.updateCards(this.state.cards.slice(1))
      }
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
      this.index += this.deckSize;
      this.moreQuestions = false;
      this.lastCard()
    }

    else {
      if (card.lastCard) {
        this.updateCards(this.nextDeck);
      }
      else {
        this.updateCards(this.state.cards.slice(1))
      }
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
      if (card.lastCard) {
        this.updateCards(this.nextDeck);
      }
      else {
        this.updateCards(this.state.cards.slice(1))
      }
    }
  }

  lastCard = () => {
    AsyncStorage.getItem('swipeChefToken').then(swipeChefToken => {
    const OGquery = `http://172.46.0.254:3000?query=${this.query}&maxResult=${this.deckSize}&start=${this.index}&swipeChefToken=${swipeChefToken}`
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
        const timeInMins = Math.round(match.totalTimeInSeconds / 60);
        newCards.push({text: match.recipeName, image: largeImage, rating: match.rating, time: timeInMins, id: match.id})
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
        renderCard={(cardData) => <Card {...cardData} trx={this.props.trx} reset={this.reset} />}
        renderNoMoreCards={() => <NoMoreCards query={this.query} />}
        showYup={false}
        showNope={false}
        showMaybe={false}

        handleYup={this.handleYup}
        handleNope={this.handleNope}
        handleMaybe={this.handleMaybe}
        hasMaybeAction
        onClickHandler={console.log("click")}
      />
    )
  }
}

const height = '95%';

const styles = StyleSheet.create({
  noMoreCardsText: {
    fontSize: 22,
    textAlign: 'center'
  },
  question_card_container: {
    backgroundColor:'#C53A32',
    justifyContent: 'center',
    alignItems: 'center',
    height,
    width: 350,
    borderRadius:10
  },
   question_card: {
    fontSize: 35,
    color:"#E9E2BB",
    textAlign: 'center',
    fontFamily: "fredokaone-regular",
    padding: 20
  },
  question_card_sub: {
    fontSize: 20,
    color:"#E9E2BB",
    textAlign: 'center',
    fontFamily: "fredokaone-regular",
    padding: 20
  },
  recipe_card_container: {
    backgroundColor:"#E88532",
    justifyContent: 'center',
    alignItems: 'center',
    height,
    width: 350,
    borderRadius:10
  },
  recipe_card: {
    fontSize: 25,
    color:"#0F2F47",
    textAlign: 'center',
    fontFamily:"pacifico-regular",
    marginBottom: 10
  }
})