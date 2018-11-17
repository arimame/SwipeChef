// SwipeCards.js
'use strict';

import React, { Component } from 'react';
import {StyleSheet, Text, View, Image, Button} from 'react-native';

import SwipeCards from 'react-native-swipe-cards';

class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[styles.card, {backgroundColor: this.props.backgroundColor}]}>
        <Text
          style={{fontSize:18, color:"white", fontWeight:"bold"}}
        >{this.props.text}
        </Text>
        <Image
          style={{width:325, height: 325}}
          source={{uri: this.props.image}}
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
        <Text style={styles.noMoreCardsText}>No more cards</Text>
      </View>
    )
  }
}

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [
        {text: 'Tomato', backgroundColor: 'red'},
        {text: 'Aubergine', backgroundColor: 'purple'},
        {text: 'Courgette', backgroundColor: 'green'},
        {text: 'Blueberry', backgroundColor: 'blue'},
        {text: 'Umm...', backgroundColor: 'cyan'},
        {text: 'orange', backgroundColor: 'orange'},
      ]
    };
  }

  // componentDidMount() {
  //   fetch('http://172.46.0.120:3000', {
  //     method: "GET",
  //     headers: {
  //       "Accept": "application/json",
  //       "Content-Type": "application/json"
  //     }
  //   })
  //   .then(results => {
  //     console.log(results._bodyInit)
  //     let parsedResults = JSON.parse(results._bodyInit);
  //     const newCards = [];
  //     for (let match of parsedResults.matches) {
  //       let image = match.imageUrlsBySize["90"]
  //       let largeImage = image.substring(0, image.length - 5)
  //       largeImage += "s1200-c"
  //       console.log(largeImage)
  //       newCards.push({text: match.recipeName, image: largeImage, backgroundColor: "black"})
  //     }

  //     // var lol = JSON.parse(results)
  //     // console.log("TEST")
  //     // console.log(results)
  //     // let test = results._bodyText
  //     // let newCards = this.state.cards
  //     // newCards = newCards.concat({text: test, backgroundColor: 'pink'})
  //     // console.log('newcards', newCards)
  //     this.setState({cards: newCards}, () => {
  //       // console.log('state', this.state.cards);
  //     })
  //   })
  // }

  handleYup = (card) => {
    console.log(`Yup for ${card.text}`)
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
        renderCard={(cardData) => <Card {...cardData} updateViewItem={this.props.updateViewItem} />}
        renderNoMoreCards={() => <NoMoreCards />}
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