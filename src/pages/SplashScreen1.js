import React, { Component, useRef } from 'react'
import {
    SafeAreaView,
    StyleSheet,
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
    StatusBar,
    Animated,
    Button
} from 'react-native'
import { colorPrimaryDark, colorPrimary, colorGreen, colorGreenDark, white } from '../../colors';
import { STARTIMAGE, FARMIMAGE, PODIOIMAGE, SETTINGSIMAGE, CHANGEAMBIENT, ZOOIMAGE, JUNGLEIMAGE, THEMEFARM, THEMEZOO, THEMEJUNGLE, ICONCACHORRO, ICONCAMARAO, LOGOUFPI, LOGOPROFNIT } from '../../images'
import { removeAll } from '../../realm_services/RealmService'
import AsyncStorage from '@react-native-community/async-storage'
import { FARM, ZOO, JUNGLE, getIconByTheme, getTheme, maskForDate } from '../globalComponents/GlobalFunctions';

export default class SplashScreen1 extends Component {

    static navigationOptions = {
        headerShown: false
    }

    constructor(props) {
        super(props)

        this.state = {
            currentTheme: FARM,
            timer: 1,
            fadeAnim: new Animated.Value(0)
        }
        //removeAll()
    }

    componentDidMount() {
        this.interval = setInterval(
            () => this.setState((prevState) => ({ timer: prevState.timer + 1 })),
            1000
        );
    }

    componentDidUpdate() {
        if (this.state.timer === 10) {
            clearInterval(this.interval);
            this.props.navigation.replace('Main')
        }
    }


    componentWillUnmount() {
        clearInterval(this.interval);
    }

    fadeIn = () => {
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.timing(this.state.fadeAnim, {
          toValue: 1,
          duration: 1000
        }).start();
      };
    
      fadeOut = () => {
        // Will change fadeAnim value to 0 in 5 seconds
        Animated.timing(this.state.fadeAnim, {
          toValue: 0,
          duration: 1000
        }).start();
      };

    render() {
        
        if (this.state.timer==1 || this.state.timer==6) {
            this.fadeIn()
        }
        
        if (this.state.timer==4 || this.state.timer==9) {
            this.fadeOut()
        }   
        
        return (
            <View style={styles.safeView}>
                <StatusBar barStyle="light-content" backgroundColor={colorPrimaryDark} />
                <View style={styles.container}>
                    {
                        this.state.timer<=5 ? (
                            <Animated.View
                                style={[
                                styles.fadingContainer,
                                {
                                    opacity: this.state.fadeAnim // Bind opacity to animated value
                                }
                                ]}
                            >
                                <Image source={LOGOUFPI} style={{height: 300, aspectRatio:1}} />
                            </Animated.View>        
                        ) : (
                            <Animated.View
                                style={[
                                styles.fadingContainer,
                                {
                                    opacity: this.state.fadeAnim // Bind opacity to animated value
                                }
                                ]}
                            >
                                <Image source={LOGOPROFNIT} style={{height: 250, width: 350}} />
                            </Animated.View>
        
                        )
                    }
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
        backgroundColor: white,
        justifyContent: 'center',
        alignItems: 'center'
    },
    firstView: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 8,
        backgroundColor: colorPrimary
    },
    secondViewTop: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: colorPrimary
    },
    secondViewBottom: {
        flex: 1,
        alignItems: 'flex-end',
        backgroundColor: colorGreen
    },
    startImage: {
        height: 150,
        aspectRatio: 1
    },
    farmImageTop: {
        height: 50,
        width: 50,
    },
    farmImageBottom: {
        height: 50
    }
});
