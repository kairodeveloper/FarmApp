import React, { Component, AsyncStorage } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
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
import { colorPrimaryDark, colorPrimary, colorGreen, white, black } from '../../../colors';
import { RETURNIMAGE, FARMIMAGE, PODIOIMAGE, SETTINGSIMAGE } from '../../../images'

export default class SetName extends Component {

  static navigationOptions = {
    headerShown: false
  }

  constructor(props) {
    super(props)

    let jogadores = []

    for (let index = 0; index < 10; index++) {
      const element = {}
      element.mid = index+1
      element.nome = "Jogador "+(index+1)
      
      jogadores.push(element)
    }

    this.state = {
      jogadores: jogadores
    }    
  }

  render() {
    return (
      <View style={styles.safeView}>
        <StatusBar barStyle="light-content" backgroundColor={colorPrimaryDark} />
        <View style={styles.container}>
          <View style={styles.secondViewTop}>
            <TouchableOpacity onPress={() => {
              this.props.navigation.goBack()
            }}>
              <Image source={RETURNIMAGE} style={styles.farmImageTop} />
            </TouchableOpacity>
          </View>
          <Text style={{ marginStart: 16, fontSize: 18, fontWeight: 'bold', color: colorPrimaryDark }}>Crie um jogador :)</Text>
          <View style={styles.firstViewTop}>
            <View style={{
              height: 50,
              width: '75%',
              backgroundColor: white,
              borderRadius: 15,
              paddingStart: 16
              }}>
              <TextInput
                fontSize={16}
                textColor={colorPrimary}
                baseColor={colorPrimary}
                placeholder={'Digite o nome...'}
                onChangeText={(name) => this.setState({ name })}
              />
            </View>
            <View style={{height: 50, width: '25%', backgroundColor: black}}>

            </View>
          </View>
          <View style={styles.viewMiddle}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: colorPrimaryDark }}>Ou escolha um jogador</Text>
            <FlatList
              style={{flex: 1}}
              data={this.state.jogadores}
              renderItem={({ item }) => 
                <View style={{height: 50,marginTop: 16,  borderWidth: 1}}>
                  <Text>{item.nome}</Text>
                </View>
            }/>
          </View>
          <View style={styles.firstViewBottom}>
            <TouchableOpacity onPress={() => {
              //this.props.navigation.navigate('SetCharactr')
            }}
              style={{
                height: 50,
                width: '60%',
                backgroundColor: white,
                borderRadius: 15,
                marginBottom: 56,
                borderWidth: 1,
                borderColor: colorPrimaryDark,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: colorPrimaryDark }}>SEGUINTE</Text>

            </TouchableOpacity>
          </View>
          <View style={styles.secondViewBottom}>
            <Image source={FARMIMAGE} style={styles.farmImageBottom} />
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  safeView: {
    paddingTop: Platform.OS === 'ios' ? 44 : 0,
    flex: 1,
    flexDirection: "column",
    backgroundColor: "transparent"
  },
  container: {
    flex: 1,
    backgroundColor: colorPrimary
  },
  firstViewTop: {
    flex: 1,
    padding: 16,
    paddingTop: 6,
    flexDirection: 'row'
  },
  viewMiddle: {
    flex: 5,
    padding: 16,
    paddingTop: 6,
  },
  firstViewBottom: {
    flexDirection: 'column-reverse',
    flex: 2,
    alignItems: 'center',
    padding: 16,
    backgroundColor: colorPrimary
  },
  secondViewTop: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colorPrimary,
    marginTop: 16
  },
  secondViewBottom: {
    flex: 1,
    alignItems: 'flex-end',
    backgroundColor: colorGreen
  },
  startImage: {
    height: 100,
    width: 100
  },
  farmImageTop: {
    height: 32,
    width: 32,
    marginTop: 10,
    marginStart: 16
  },
  farmImageBottom: {
    marginEnd: 32,
    marginTop: -32,
    height: '90%',
    aspectRatio: 1
  }
});
