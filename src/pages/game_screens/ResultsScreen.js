import React, { Component, AsyncStorage } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Platform,
  StatusBar
} from 'react-native'
import { colorPrimaryDark, colorPrimary, colorGreen, white, black, purple, greyTextColor } from '../../../colors';
import { RETURNIMAGE, FARMIMAGE, ICONCOWBOY, SETTINGSIMAGE, ICONCOWGIRL, ICONENGENHEIRO, ICONENGENHEIRA, ICONFAZENDEIRO, ICONFAZENDEIRA, ICONCOWBOYLOCKED, ICONENGENHEIROLOCKED, ICONENGENHEIRALOCKED, ICONFAZENDEIROLOCKED, ICONFAZENDEIRALOCKED, ICONVACA, ICONPASSARO, ICONPORCO, ICONGALINHA, ICONOVELHA, ICONSAPO, ICONCACHORRO, ICONPEIXE, ICONTARTARUGA } from '../../../images'
import { maskForDate, getJogadorImage } from '../../globalComponents/GlobalFunctions';
import { findAllNotRemoved } from '../../../realm_services/RealmService';

export default class ResultsScreen extends Component {

  static navigationOptions = {
    headerShown: false
  }

  constructor(props) {
    super(props)
    const { navigation } = this.props

    let partidas = findAllNotRemoved('Partida', 'createdAt', true)
    let jogadores = findAllNotRemoved('Usuario')

    this.state = {
      partidas: partidas,
      jogadores: jogadores
    }
  }

  countDecimals(value) {
    let result = value.toString().split(".")[1]

    return parseInt(result, 10)==0
  }

  getJogadoresByMid(mid) {
    let retorno = ""

    this.state.jogadores.map((it) => {
      if (it.mid==mid) {
        retorno = it.nome
      }
    })

    return retorno
  }

  getPercentual(questoesCorretas, totalQuestoes) {
    let value = (questoesCorretas*(100/totalQuestoes)).toFixed(1)
    let isEqualZero = this.countDecimals(value)

    if (isEqualZero) {
      return(parseInt(value, 10))
    } else {
      return(value)
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
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: colorPrimaryDark }}>Resultados</Text>
            <View style={{
              flex: 1,
              width: '100%',
              backgroundColor: white,
              borderTopEndRadius: 15,
              borderTopStartRadius: 15,
              marginTop: 16,
              padding: 6
            }}>

            <FlatList
                style={{flex: 1}}
                data={this.state.partidas}
                renderItem={({ item }) => 
                  <View
                    style={{minHeight: 60, borderBottomWidth: 1, borderColor: greyTextColor, flexDirection: 'row', marginTop: 16, justifyContent: 'center', paddingEnd: 16, paddingStart: 16, borderRadius: 15, backgroundColor: white}}>
                    <View style={{flex: 2, minHeight: 60, justifyContent: 'center'}}>
                        <Image source={getJogadorImage(item.imageJogador)} style={{height: 56, width: 56}} />
                    </View>
                    <View style={{flex: 6, paddingBottom: 16, minHeight: 60, flexDirection: 'column'}}>
                        <View style={{minHeight: 30, flexDirection: 'row'}}>
                            <View style={{flex: 6, justifyContent: 'center'}}>
                                <Text style={{textTransform: 'capitalize', fontSize: 16, fontWeight: 'bold'}}>{this.getJogadoresByMid(item.jogador)}</Text>
                            </View>    
                            <View style={{flex: 4, justifyContent: 'center', alignItems: 'flex-end'}}>
                                <Text style={{fontSize: 16, fontWeight: 'bold', color: greyTextColor}}>{maskForDate(item.createdAt)}</Text>
                            </View>    
                        </View>
                        <View style={{minHeight: 36}}>
                            <Text style={{fontSize: 16, color: greyTextColor}}>{item.questoesCorretas} de {item.totalQuestoes} questões acertadas</Text>
                            <Text style={{fontSize: 16, marginTop: 6, color: greyTextColor}}>{this.getPercentual(item.questoesCorretas, item.totalQuestoes)}% de aproveitamento</Text>
                        </View>
                    </View>
                  </View>
              }/>

            </View>
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
    paddingBottom: 0,
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
    marginEnd: 32,
    marginTop: -32,
    height: '90%',
    aspectRatio: 1
  }
});
