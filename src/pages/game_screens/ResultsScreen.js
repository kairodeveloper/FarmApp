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
import { colorPrimaryDark, colorPrimary, colorGreen, white, black, purple } from '../../../colors';
import { RETURNIMAGE, FARMIMAGE, ICONCOWBOY, SETTINGSIMAGE, ICONCOWGIRL, ICONENGENHEIRO, ICONENGENHEIRA, ICONFAZENDEIRO, ICONFAZENDEIRA, ICONCOWBOYLOCKED, ICONENGENHEIROLOCKED, ICONENGENHEIRALOCKED, ICONFAZENDEIROLOCKED, ICONFAZENDEIRALOCKED, ICONVACA, ICONPASSARO, ICONPORCO, ICONGALINHA, ICONOVELHA, ICONSAPO, ICONCACHORRO, ICONPEIXE, ICONTARTARUGA } from '../../../images'
import { maskForDate } from '../../globalComponents/GlobalFunctions';
import { findAllNotRemoved } from '../../../realm_services/RealmService';

export default class ResultsScreen extends Component {

  static navigationOptions = {
    headerShown: false
  }

  constructor(props) {
    super(props)
    const { navigation } = this.props

    let partidas = findAllNotRemoved('Partida')

    this.state = {
      partidas: partidas
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
                    style={{height: 60, flexDirection: 'row', marginTop: 16, justifyContent: 'center', paddingEnd: 16, paddingStart: 16, borderRadius: 15, backgroundColor: white}}>
                    <View style={{flex: 2, height: 60, borderWidth: 1}}>
                        <Text>{item.imageJogador}</Text>
                    </View>
                    <View style={{flex: 6, height: 60, borderWidth: 1, flexDirection: 'column'}}>
                        <View style={{height: 30, borderWidth: 1, flexDirection: 'row'}}>
                            <View style={{flex: 6, borderWidth: 1}}>
                                <Text>{item.jogador}</Text>
                            </View>    
                            <View style={{flex: 4, borderWidth: 1}}>
                                <Text>{maskForDate(item.createdAt)}</Text>
                            </View>    
                        </View>
                        <View style={{height: 30, borderWidth: 1}}>
                            <Text>{item.questoesCorretas} de {item.totalQuestoes} questões acertadas</Text>
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
