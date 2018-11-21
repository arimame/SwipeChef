// SwipeCards.js
'use strict';

import React, { Component } from 'react';
import {StyleSheet, Text, View, Image, Button} from 'react-native';

import SwipeCards from 'react-native-swipe-cards';



const nutritionCards = [
  {
    type: 'question',
    text: 'Is health a factor?',
    yupQuery: '',
    nopeUpdateCards: xmasCard
  },
  {
    type: 'question',
    text: 'Good for you! 💪 Swipe right for everything you want to keep into account:\n\n(Swipe to continue)',
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

const xmasCard = [
  {
    type: 'question',
    text: 'Want to browse Christmas recipes? ❄🎄',
    yupQuery: '&allowedHoliday[]=holiday^holiday-christmas',
    yupLastCard: true,
    prevDeck: "xmas",
    nopeUpdateCards: null
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
    return (
      <View style={[styles.card, {backgroundColor: this.props.color || 'black'}]}>
        <Text
          style={{fontSize:18, color:"white", fontWeight:"bold", textAlign: 'center'}}
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
    this.index = 0;
    this.prevDeck = null;
    this.query = '';
    this.nextDeck = null;
    this.deckSize = 3;
  }

  componentDidUpdate() {
    if (this.prevDeck === "xmas") {
      this.index += this.deckSize;
      const OGquery = `http://172.46.0.254:3000?query=${this.query}&start=${this.index}&maxResult=${this.deckSize}`
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
        this.setState({cards: xmasCard})
      } else if (this.prevDeck === "xmas") {
        this.setState({cards: xmasCard})
      } else if (this.prevDeck === "xmas") {
        this.setState({cards: null})
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
      if (card.lastCard) this.updateCards(this.nextDeck);
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
      this.lastCard()
    }
  }

  handleMaybe = (card) => {
    if (card.lastCard) {
      this.lastCard();
    }
  }
 
  lastCard = () => {
    const OGquery = `http://172.46.0.254:3000?query=${this.query}&start=${this.index}&maxResult=${this.deckSize}`
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
     if (this.prevDeck !== "xmas") {
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
  }
})