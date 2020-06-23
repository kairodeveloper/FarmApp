import React, { Component, AsyncStorage } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  Alert,
  Image,
  Dimensions,
  ToastAndroid,
  Modal,
  TouchableOpacity,
  ImageBackground,
  Platform,
  StatusBar
} from 'react-native'
import { colorPrimaryDark, colorPrimary, blackSemiTransparent, white, black } from '../../colors';
import { HAPPYFACEIMAGE, NEUTRALFACEIMAGE } from '../../images'

export default class ModalIncorrect extends Component {
  static navigationOptions = {
    headerShown: false
  }

  constructor(props) {
    super(props)
    
    this.state = {
    }
  }

  render() {
    return(
        <View style={styles.container}>
            <Text style={styles.titleText}>QUASE LÁ!!!</Text>
            <Image source={NEUTRALFACEIMAGE} style={styles.imageFace} />
            <Text style={styles.messageText}>Acerte mais {5-this.props.numeroJogadas} questões para vencer a partida!</Text>
        </View>
    )
  }

}

const styles = StyleSheet.create({
    container: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleText: {
        fontSize: 24,
        textAlign: 'center'
    },
    imageFace: {
        height: 100,
        width: 100
    },
    messageText: {
        fontSize: 18,
        marginStart: 16,
        marginEnd: 16,
        textAlign: 'center'
    }
})

module.exports = ModalIncorrect