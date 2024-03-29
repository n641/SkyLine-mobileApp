import { StyleSheet, Text, View, ImageBackground, Dimensions, ScrollView } from 'react-native'
import React from 'react'

import TabBarOFSearchTickets from '../../../Components/SubScreensOfTicket/TabBarOFSearchTickets';

import Colors from '../../../Conestant/Colors';
import bg from '../../../assets/bg-dark.jpg';

import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from '@expo/vector-icons';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default function TicketSearch({ navigation }) {
  return (
    <View>
      <ImageBackground
        source={bg}
        resizeMode='repeat'
        style={{
          width: width,
          height: height + 50,
          justifyContent: 'flex-end',
        }}
      >
        <View style={{ marginLeft: 20 }}>
          <AntDesign name="arrowleft" size={30} color="white" onPress={() => {
            navigation.goBack()
          }} />
        </View>

        <View style={{
          alignItems: 'center',
          marginBottom: 75,
          marginLeft: 20
        }}>

          <Text style={styles.title}>Flight search</Text>

        </View>
        <LinearGradient colors={[Colors.first_dark_screen, Colors.second_dark_screen, Colors.third_dark_screen]}
          style={styles.container}
        >

            <TabBarOFSearchTickets navigation={navigation} />

        </LinearGradient>

      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // width: width,
    height: (height + 50) / 1.3,
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80
  },
  title: {
    fontFamily: 'item',
    color: "white",
    fontSize: 30,
  },

})