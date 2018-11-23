
import React, { Component } from 'react';
import {StyleSheet, Text, View, Image, Button, AsyncStorage} from 'react-native';
import {widthPercentageToDP, heightPercentageToDP} from 'react-native-responsive-screen';
import ToggleSwitch from 'toggle-switch-react-native'


import Navbar from "../partials/Navbar";


class Setting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vegan: false,
      vegetarian: false,
      gluten_allergy: false,
      peanut_allergy: false,
      seafood_allergy: false,
      dairy_allergy: false,
      egg_allergy: false,
      soy_allergy: false,
      tree_nut_allergy: false,
      wheat_allergy: false,
      loading: true
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('swipeChefToken').then(swipeChefToken => {
      fetch(`http://172.46.0.254:3000/user_settings?swipeChefToken=${swipeChefToken}`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      }).then(results => {

        const parsedResults = JSON.parse(results._bodyInit)
       this.setState({
         vegan: parsedResults.vegan,
         vegetarian: parsedResults.vegetarian,
         gluten_allergy: parsedResults.gluten_allergy,
         peanut_allergy: parsedResults.peanut_allergy,
         seafood_allergy: parsedResults.seafood_allergy,
         dairy_allergy: parsedResults.dairy_allergy,
         egg_allergy: parsedResults.egg_allergy,
         soy_allergy: parsedResults.soy_allergy,
         tree_nut_allergy: parsedResults.tree_nut_allergy,
         wheat_allergy: parsedResults.wheat_allergy,
         loading: false
       })
      })
    })
  }

  onToggleBuilder(allergyKey) {
    return (e) => {
      const endState = !this.state[allergyKey];
      this.setState({[allergyKey]: !this.state[allergyKey]})
      submitSettingsUpdate([allergyKey], endState);
    }
  }


  render () {


    onToggleVegan = (e) => {
      const endState = !this.state.vegan
      this.setState({vegan: !this.state.vegan})
      submitSettingsUpdate("vegan", endState)
    }

    onToggleVegetarian = (e) => {
      const endState = !this.state.vegetarian
      this.setState({vegetarian: !this.state.vegetarian})
      submitSettingsUpdate("vegetarian", endState)
    }

    onToggleGluten = (e) => {
      const endState = !this.state.gluten_allergy
      this.setState({gluten_allergy: !this.state.gluten_allergy})
      submitSettingsUpdate("gluten_allergy", endState)
    }

    onTogglePeanut = (e) => {
      const endState = !this.state.peanut_allergy
      this.setState({peanut_allergy: !this.state.peanut_allergy})
      submitSettingsUpdate("peanut_allergy", endState)
    }

    onToggleSeafood = (e) => {
      const endState = !this.state.seafood_allergy
      this.setState({seafood_allergy: !this.state.seafood_allergy})
      submitSettingsUpdate("seafood_allergy", endState)
    }
    onToggleDairy = (e) => {
      const endState = !this.state.dairy_allergy
      this.setState({dairy_allergy: !this.state.dairy_allergy})
      submitSettingsUpdate("dairy_allergy", endState)
    }
    onToggleEgg = (e) => {
      const endState = !this.state.egg_allergy
      this.setState({egg_allergy: !this.state.egg_allergy})
      submitSettingsUpdate("egg_allergy", endState)
    }

    onToggleSoy = (e) => {
      const endState = !this.state.soy_allergy
      this.setState({soy_allergy: !this.state.soy_allergy})
      submitSettingsUpdate("soy_allergy", endState)
    }

    onToggleTreeNut = (e) => {
      const endState = !this.state.tree_nut_allergy
      this.setState({tree_nut_allergy: !this.state.tree_nut_allergy})
      submitSettingsUpdate("tree_nut_allergy", endState)
    }

    onToggleWheat = (e) => {
      const endState = !this.state.wheat_allergy
      this.setState({wheat_allergy: !this.state.wheat_allergy})
      submitSettingsUpdate("wheat_allergy", endState)
    }

    submitSettingsUpdate = (setting, setting_value) => {
      AsyncStorage.getItem('swipeChefToken').then(swipeChefToken => {
        fetch(`http://172.46.0.254:3000/users?swipeChefToken=${swipeChefToken}&setting=${setting}&setting_value=${setting_value}`, {
          method: 'PATCH',
          headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
          }
        })
      })
    }

    const settingButtons = this.state.loading ? (<View></View>) : (<View style={{margin: 10}}>
      <View>

        <ToggleSwitch
                isOn={this.state.vegan}
                onColor='green'
                offColor='red'
                label='Vegan'
                labelStyle={{color: 'black', fontWeight: '900'}}
                size='large'
                onToggle={this.onToggleBuilder('vegan')}
            /></View>
        <View style={{margin: 10}}>
        <ToggleSwitch
                isOn={this.state.vegetarian}
                onColor='green'
                offColor='red'
                label='Vegetarian        '
                labelStyle={{color: 'black', fontWeight: '900'}}
                size='large'
                onToggle={this.onToggleBuilder('vegetarian')}
            /></View>
        <View style={{margin: 10}}>
        <ToggleSwitch
                isOn={this.state.gluten_allergy}
                onColor='green'
                offColor='red'
                label='Gluten Allergy  '
                labelStyle={{color: 'black', fontWeight: '900'}}
                size='large'
                onToggle={this.onToggleBuilder('gluten_allergy')}
            /></View>
        <View style={{margin: 10}}>
        <ToggleSwitch
                isOn={this.state.peanut_allergy}
                onColor='green'
                offColor='red'
                label='Peanut Allergy  '
                labelStyle={{color: 'black', fontWeight: '900'}}
                size='large'
                onToggle={this.onToggleBuilder('peanut_allergy')}
            /></View>
          <View style={{margin: 10}}>
          <ToggleSwitch
                isOn={this.state.seafood_allergy}
                onColor='green'
                offColor='red'
                label='Seafood Allergy'
                labelStyle={{color: 'black', fontWeight: '900'}}
                size='large'
                onToggle={this.onToggleBuilder('seafood_allergy')}
            /></View>
          <View style={{margin: 10}}>
          <ToggleSwitch
                isOn={this.state.dairy_allergy}
                onColor='green'
                offColor='red'
                label='Dairy Allergy      '
                labelStyle={{color: 'black', fontWeight: '900'}}
                size='large'
                onToggle={this.onToggleBuilder('dairy_allergy')}
            /></View>
          <View style={{margin: 10}}>
          <ToggleSwitch
                isOn={this.state.egg_allergy}
                onColor='green'
                offColor='red'
                label='Egg Allergy        '
                labelStyle={{color: 'black', fontWeight: '900'}}
                size='large'
                onToggle={this.onToggleBuilder('egg_allergy')}
            /></View>
          <View style={{margin: 10}}>
          <ToggleSwitch
                isOn={this.state.soy_allergy}
                onColor='green'
                offColor='red'
                label='Soy Allergy        '
                labelStyle={{color: 'black', fontWeight: '900'}}
                size='large'
                onToggle={this.onToggleBuilder('soy_allergy')}
            /></View>
          <View style={{margin: 10}}>
          <ToggleSwitch
                isOn={this.state.tree_nut_allergy}
                onColor='green'
                offColor='red'
                label='Tree nut Allergy'
                labelStyle={{color: 'black', fontWeight: '900'}}
                size='large'
                onToggle={this.onToggleBuilder('tree_nut_allergy')}
            /></View>
          <View style={{margin: 10}}>
          <ToggleSwitch
                isOn={this.state.wheat_allergy}
                onColor='green'
                offColor='red'
                label='Wheat Allergy     '
                labelStyle={{color: 'black', fontWeight: '900'}}
                size='large'
                ref='wheat_allergy'
                onToggle={this.onToggleBuilder('wheat_allergy')}
            /></View>
          </View>)



    return (
      <View>
        <Navbar stateVars={this.props.stateVars} style={{height: heightPercentageToDP('10%')}} trx={this.props.trx} />
        {settingButtons}
      </View>
    )
  }
}

export default Setting;