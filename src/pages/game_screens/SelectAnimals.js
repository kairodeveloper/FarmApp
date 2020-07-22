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
import { RETURNIMAGE, FARMIMAGE, ICONCOWBOY, SETTINGSIMAGE, ICONCOWGIRL, ICONENGENHEIRO, ICONENGENHEIRA, ICONFAZENDEIRO, ICONFAZENDEIRA, ICONCOWBOYLOCKED, ICONENGENHEIROLOCKED, ICONENGENHEIRALOCKED, ICONFAZENDEIROLOCKED, ICONFAZENDEIRALOCKED, ICONVACA, ICONPASSARO, ICONPORCO, ICONGALINHA, ICONOVELHA, ICONSAPO, ICONCACHORRO, ICONPEIXE, ICONTARTARUGA } from '../../../images'
import { isIn, FARM, getTheme, getIconByTheme, getImageByCode, getTextByTheme } from '../../globalComponents/GlobalFunctions';

export default class SelectAnimals extends Component {

  static navigationOptions = {
    headerShown: false
  }

  constructor(props) {
    super(props)
    const { navigation } = this.props

    let data = navigation.getParam('data', {})
    let selecionados = [1]

    this.state = {
      currentTheme: FARM,
      selecionados: selecionados,
      data: data
    }
  }

  async componentDidMount() {
    let a = await getTheme()
    this.setState({
      currentTheme: a
    })
  }

  setSelecionado(position) {
    let selecionados = this.state.selecionados
    let retorno = []

    if (isIn(position, selecionados)) {
      if (selecionados.length>1) {
        selecionados.map((it) => {
          if (it != position) {
            retorno.push(it)
          }
        })  
      }
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
      if (it == position) {
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
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: colorPrimaryDark }}>{getTextByTheme(this.state.currentTheme)}</Text>
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
                    this.setSelecionado(1)
                  }}
                  style={[styles.characterView, { backgroundColor: this.isSelecionado(1) ? purple : white }]}>
                  <Image source={getImageByCode(1, this.state.currentTheme)} style={styles.characterIcon} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.setSelecionado(2)
                  }}
                  style={[styles.characterView, { backgroundColor: this.isSelecionado(2) ? purple : white }]}>
                  <Image source={getImageByCode(2, this.state.currentTheme)} style={styles.characterIcon} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.setSelecionado(3)
                  }}
                  style={[styles.characterView, { backgroundColor: this.isSelecionado(3) ? purple : white }]}>
                  <Image source={getImageByCode(3, this.state.currentTheme)} style={styles.characterIcon} />
                </TouchableOpacity>
              </View>
              <View style={styles.lineCharacterView}>
                <TouchableOpacity
                  onPress={() => {
                    this.setSelecionado(4)
                  }}
                  style={[styles.characterView, { backgroundColor: this.isSelecionado(4) ? purple : white }]}>
                  <Image source={getImageByCode(4, this.state.currentTheme)} style={styles.characterIcon} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.setSelecionado(5)
                  }}
                  style={[styles.characterView, { backgroundColor: this.isSelecionado(5) ? purple : white }]}>
                  <Image source={getImageByCode(5, this.state.currentTheme)} style={styles.characterIcon} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.setSelecionado(6)
                  }}
                  style={[styles.characterView, { backgroundColor: this.isSelecionado(6) ? purple : white }]}>
                  <Image source={getImageByCode(6, this.state.currentTheme)} style={styles.characterIcon} />
                </TouchableOpacity>
              </View>
              <View style={styles.lineCharacterView}>
                <TouchableOpacity
                  onPress={() => {
                    this.setSelecionado(7)
                  }}
                  style={[styles.characterView, { backgroundColor: this.isSelecionado(7) ? purple : white }]}>
                  <Image source={getImageByCode(7, this.state.currentTheme)} style={styles.characterIcon} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.setSelecionado(8)
                  }}
                  style={[styles.characterView, { backgroundColor: this.isSelecionado(8) ? purple : white }]}>
                  <Image source={getImageByCode(8, this.state.currentTheme)} style={styles.characterIcon} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.setSelecionado(9)
                  }}
                  style={[styles.characterView, { backgroundColor: this.isSelecionado(9) ? purple : white }]}>
                  <Image source={getImageByCode(9, this.state.currentTheme)} style={styles.characterIcon} />
                </TouchableOpacity>
              </View>

            </View>
          </View>
          <View style={styles.firstViewBottom}>
            { this.state.selecionados.length >=1 ? (
              <TouchableOpacity onPress={() => {
                let data = this.state.data
                data.animals = this.state.selecionados
                this.props.navigation.replace('SelectOperations', { data: data })
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
            ) : (
              <View />
            ) }
          </View>
          <ImageBackground source={getIconByTheme(this.state.currentTheme)} style={styles.farmImageBottom} />
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
    height: 50
  }
});
