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
import { colorPrimaryDark, colorPrimary, colorGreen, white, black, purple } from '../../../colors';
import { RETURNIMAGE, FARMIMAGE, ICONCOWBOY, SETTINGSIMAGE, ICONCOWGIRL, ICONENGENHEIRO, ICONENGENHEIRA, ICONFAZENDEIRO, ICONFAZENDEIRA, ICONCOWBOYLOCKED, ICONENGENHEIROLOCKED, ICONENGENHEIRALOCKED, ICONFAZENDEIROLOCKED, ICONFAZENDEIRALOCKED, PLUSICONGREY, MINUSICONGREY, TIMESICONGREY, DIVISIONICONGREY } from '../../../images'
import { isIn } from '../../globalComponents/GlobalFunctions';

export default class SelectOperations extends Component {

  static navigationOptions = {
    headerShown: false
  }

  constructor(props) {
    super(props)
    const { navigation } = this.props

    let data = navigation.getParam('data', {})
    let selecionados = [1]

    this.state = {
      selecionados: selecionados,
      data: data
    }
  }

  setSelecionado(position) {
    let selecionados = this.state.selecionados
    let retorno = []

    if (isIn(position, selecionados)) {
      selecionados.map((it) => {
        if (it!=position) {
          retorno.push(it)
        }
      })
    } else {
      selecionados.map((it) => {
        retorno.push(it)
      })

      retorno.push(position)
    }

    this.setState({
      selecionados: retorno
    })
  }

  isSelecionado(position) {
    let selecionados = this.state.selecionados
    let retorno = false

    selecionados.map((it) => {
      if (it==position) {
        retorno = true
      }
    })

    return retorno
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
                <Text style={{fontSize: 20, fontWeight: 'bold', color: colorPrimaryDark}}>SELECIONE AS OPERAÇÕES</Text>
                <View style={{
                    width: '100%',
                    backgroundColor: white,
                    borderRadius: 15,
                    marginTop: 16,
                    padding: 6
                }}>
                    <View style={styles.lineCharacterView}>
                        <TouchableOpacity 
                          onPress={() => {
                            this.setSelecionado(1)
                          }}
                          style={[styles.characterView, {backgroundColor: this.isSelecionado(1) ? purple : white}]}> 
                            <Image source={PLUSICONGREY} style={styles.characterIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity 
                          onPress={() => {
                            this.setSelecionado(2)
                          }}
                          style={[styles.characterView, {backgroundColor: this.isSelecionado(2) ? purple : white}]}> 
                            <Image source={MINUSICONGREY} style={styles.characterIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity 
                          onPress={() => {
                            this.setSelecionado(3)
                          }}
                          style={[styles.characterView, {backgroundColor: this.isSelecionado(3) ? purple : white}]}> 
                            <Image source={TIMESICONGREY} style={styles.characterIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity 
                          onPress={() => {
                            this.setSelecionado(4)
                          }}
                          style={[styles.characterView, {backgroundColor: this.isSelecionado(4) ? purple : white}]}> 
                            <Image source={DIVISIONICONGREY} style={styles.characterIcon} />
                        </TouchableOpacity>
                    </View>

                </View>
          </View>
          <View style={styles.firstViewBottom}>
                <TouchableOpacity onPress={() => {
                  let data = this.state.data
                  data.operations = this.state.selecionados
                  this.props.navigation.replace('QuestionScreen', { data: data })
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
                  <Text style={{fontSize: 18, fontWeight: 'bold', color: colorPrimaryDark}}>JOGAR</Text>
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
    paddingTop: 6,
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
    backgroundColor: colorPrimary
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
      height: 100,
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
