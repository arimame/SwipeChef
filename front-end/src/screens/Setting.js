
import React, { Component } from 'react';
import {StyleSheet, Text, View, Image, Button, AsyncStorage, ScrollView} from 'react-native';
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

  logMeOut = (e) => {
    AsyncStorage.removeItem('swipeChefToken').then(results => {
      this.props.trx.updateCurrentScreen(null, 'login')
    })

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

    const settingButtons = this.state.loading ? (<View></View>) : (<ScrollView>
       <Text style={{fontSize: 22, fontFamily: "pacifico-regular", color: '#0F2F47', marginLeft: 5}}>Diet</Text>
        <View style={{margin: 10}}>
        <ToggleSwitch
                isOn={this.state.vegan}
                onColor= "#E88532"
                offColor='#F3C05F'
                label='Vegan                 '
                labelStyle={{color: 'black', fontWeight: '900'}}
                size='medium'
                onToggle={this.onToggleBuilder('vegan')}
            /></View>
        <View style={{margin: 10}}>
        <ToggleSwitch
                isOn={this.state.vegetarian}
                onColor="#E88532"
                offColor='#F3C05F'
                label='Vegetarian        '
                labelStyle={{color: 'black', fontWeight: '900'}}
                size='medium'
                onToggle={this.onToggleBuilder('vegetarian')}
            /></View>
        <Text style={{fontSize: 22, fontFamily: "pacifico-regular", color: '#0F2F47', marginTop: 10, marginLeft: 5}}>Allergies</Text>
        <View style={{margin: 10}}>
        <ToggleSwitch
                isOn={this.state.gluten_allergy}
                onColor="#E88532"
                offColor='#F3C05F'
                label='Gluten Allergy  '
                labelStyle={{color: 'black', fontWeight: '900'}}
                size='medium'
                onToggle={this.onToggleBuilder('gluten_allergy')}
            /></View>
        <View style={{margin: 10}}>
        <ToggleSwitch
                isOn={this.state.peanut_allergy}
                onColor="#E88532"
                offColor='#F3C05F'
                label='Peanut Allergy  '
                labelStyle={{color: 'black', fontWeight: '900'}}
                size='medium'
                onToggle={this.onToggleBuilder('peanut_allergy')}
            /></View>
          <View style={{margin: 10}}>
          <ToggleSwitch
                isOn={this.state.seafood_allergy}
                onColor="#E88532"
                offColor='#F3C05F'
                label='Seafood Allergy'
                labelStyle={{color: 'black', fontWeight: '900'}}
                size='medium'
                onToggle={this.onToggleBuilder('seafood_allergy')}
            /></View>
          <View style={{margin: 10}}>
          <ToggleSwitch
                isOn={this.state.dairy_allergy}
                onColor="#E88532"
                offColor='#F3C05F'
                label='Dairy Allergy      '
                labelStyle={{color: 'black', fontWeight: '900'}}
                size='medium'
                onToggle={this.onToggleBuilder('dairy_allergy')}
            /></View>
          <View style={{margin: 10}}>
          <ToggleSwitch
                isOn={this.state.egg_allergy}
                onColor="#E88532"
                offColor='#F3C05F'
                label='Egg Allergy        '
                labelStyle={{color: 'black', fontWeight: '900'}}
                size='medium'
                onToggle={this.onToggleBuilder('egg_allergy')}
            /></View>
          <View style={{margin: 10}}>
          <ToggleSwitch
                isOn={this.state.soy_allergy}
                onColor="#E88532"
                offColor='#F3C05F'
                label='Soy Allergy        '
                labelStyle={{color: 'black', fontWeight: '900'}}
                size='medium'
                onToggle={this.onToggleBuilder('soy_allergy')}
            /></View>
          <View style={{margin: 10}}>
          <ToggleSwitch
                isOn={this.state.tree_nut_allergy}
                onColor="#E88532"
                offColor='#F3C05F'
                label='Tree nut Allergy'
                labelStyle={{color: "#0F2F47", fontWeight: '900'}}
                size='medium'
                onToggle={this.onToggleBuilder('tree_nut_allergy')}
            /></View>
          <View style={{margin: 10}}>
          <ToggleSwitch
                isOn={this.state.wheat_allergy}
                onColor="#E88532"
                offColor='#F3C05F'
                label='Wheat Allergy     '
                labelStyle={{color: 'black', fontWeight: '900'}}
                size='medium'
                ref='wheat_allergy'
                onToggle={this.onToggleBuilder('wheat_allergy')}
            /></View>
            <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 50}}>
            <Button
                title="Logout"
                color='#C53A32'
                onPress={this.logMeOut}
            /></View>
          </ScrollView>)




    return (
      <View>
        <Navbar stateVars={this.props.stateVars} style={{height: heightPercentageToDP('10%')}} trx={this.props.trx} />
        {settingButtons}
      </View>
    )
  }
}

export default Setting;