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
import { colorPrimaryDark, colorPrimary, colorGreen, white, black, blackSemiTransparent, purple } from '../../../colors';
import { RETURNIMAGE, FARMIMAGE, ICONCOWBOY, SETTINGSIMAGE, ICONCOWGIRL, ICONENGENHEIRO, ICONENGENHEIRA, ICONFAZENDEIRO, ICONFAZENDEIRA, ICONCOWBOYLOCKED, ICONENGENHEIROLOCKED, ICONENGENHEIRALOCKED, ICONFAZENDEIROLOCKED, ICONFAZENDEIRALOCKED } from '../../../images'

export default class SetCharacter extends Component {

  static navigationOptions = {
    headerShown: false
  }

  constructor(props) {
    super(props)
    const { navigation } = this.props

    let jogador = navigation.getParam('jogador', {})     
    let liberados = [1, 2]

    this.state = {
      jogador: jogador,
      characterSelected: 1,
      maiorLiberado: liberados[liberados.length-1]
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
          <View style={styles.firstViewTop}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: colorPrimaryDark }}>Selecione o seu personagem</Text>
            <View style={{
              flex: 1,
              width: '100%',
              backgroundColor: white,
              borderRadius: 15,
              marginTop: 16,
              padding: 6
            }}>
              <View style={styles.lineCharacterView}>
                <TouchableOpacity 
                  onPress={() => {
                    this.setState({
                      characterSelected: 1
                    })
                  }}
                  style={[styles.characterView, {backgroundColor: this.state.characterSelected==1 ? purple : white }]}>
                  <Image source={ICONCOWBOY} style={styles.characterIcon} />
                </TouchableOpacity>
                
                <TouchableOpacity  
                  onPress={() => {
                    this.setState({
                      characterSelected: 2
                    })
                  }}
                  style={[styles.characterView, {backgroundColor: this.state.characterSelected==2 ? purple : white }]}>
                  <Image source={ICONCOWGIRL} style={styles.characterIcon} />
                </TouchableOpacity>
                
                <TouchableOpacity 
                  onPress={() => {
                    if (this.state.maiorLiberado >= 3) {
                      this.setState({
                        characterSelected: 3
                      })  
                    } else {
                      let value = 5-this.state.jogador.numeroQuestoes
                      if (value>1) {
                        alert('Acerte mais ' + value + ' questõe(s) para desbloquar o personagem')  
                      } else {
                        alert('Acerte mais ' + value + ' questão para desbloquar o personagem')
                      }
                    }
                  }}
                  style={[styles.characterView, {backgroundColor: this.state.characterSelected==3 ? purple : white }]}>
                  <Image source={this.state.maiorLiberado < 3 ? ICONENGENHEIROLOCKED : ICONENGENHEIRO} style={styles.characterIcon} />
                </TouchableOpacity>
              </View>
              <View style={styles.lineCharacterView}>
                <TouchableOpacity 
                  onPress={() => {
                    if (this.state.maiorLiberado >= 3) {
                      this.setState({
                        characterSelected: 4
                      })
                    } else {
                      let value = 10-this.state.jogador.numeroQuestoes
                      if (value>1) {
                        alert('Acerte mais ' + value + ' questõe(s) para desbloquar o personagem')  
                      } else {
                        alert('Acerte mais ' + value + ' questão para desbloquar o personagem')
                      }
                    }
                  }}
                  style={[styles.characterView, {backgroundColor: this.state.characterSelected==4 ? purple : white }]}> 
                  <Image source={this.state.maiorLiberado < 4 ? ICONENGENHEIRALOCKED : ICONENGENHEIRA} style={styles.characterIcon} />
                </TouchableOpacity>

                <TouchableOpacity 
                  onPress={() => {
                    if (this.state.maiorLiberado >= 3) {
                        this.setState({
                        characterSelected: 5
                      })
                    } else {
                      let value = 15-this.state.jogador.numeroQuestoes
                      if (value>1) {
                        alert('Acerte mais ' + value + ' questõe(s) para desbloquar o personagem')  
                      } else {
                        alert('Acerte mais ' + value + ' questão para desbloquar o personagem')
                      }
                    }
                  }}
                  style={[styles.characterView, {backgroundColor: this.state.characterSelected==5 ? purple : white }]}>
                  <Image source={this.state.maiorLiberado < 5 ? ICONFAZENDEIRALOCKED : ICONFAZENDEIRO} style={styles.characterIcon} />
                </TouchableOpacity>
                
                <TouchableOpacity 
                  onPress={() => {
                    if (this.state.maiorLiberado >= 3) {
                      this.setState({
                        characterSelected: 6
                      })
                    } else {
                      let value = 20-this.state.jogador.numeroQuestoes
                      if (value>1) {
                        alert('Acerte mais ' + value + ' questõe(s) para desbloquar o personagem')  
                      } else {
                        alert('Acerte mais ' + value + ' questão para desbloquar o personagem')
                      }
                    }
                  }}
                  style={[styles.characterView, {backgroundColor: this.state.characterSelected==6 ? purple : white }]}>
                  <Image source={this.state.maiorLiberado < 6 ? ICONFAZENDEIRALOCKED : ICONFAZENDEIRA} style={styles.characterIcon} />
                </TouchableOpacity>
              </View>
              <View style={styles.lineCharacterView} />

            </View>
          </View>
          <View style={styles.firstViewBottom}>
            <TouchableOpacity onPress={() => {
              let data = {}
              data.jogador = this.state.jogador
              data.characterSelected = this.state.characterSelected

              this.props.navigation.replace('SelectAnimals', {data: data})
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
    flex: 4,
    padding: 16,
    backgroundColor: colorPrimary
  },
  firstViewBottom: {
    flexDirection: 'column-reverse',
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: colorPrimary
  },
  secondViewTop: {
    height: 50,
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
  lineCharacterView: {
    flex: 1,
    flexDirection: 'row'
  },
  characterView: {
    flex: 1,
    margin: 6,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  characterIcon: {
    height: '75%',
    aspectRatio: 1
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
