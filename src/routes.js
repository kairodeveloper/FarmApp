import { createAppContainer } from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack';
import Main from './pages/Main'
import SplashScreen1 from './pages/SplashScreen1'
import { white, colorPrimary } from '../colors';
import SetName from './pages/register_player/SetName';
import SetCharacter from './pages/register_player/SetCharacter';
import SelectAnimals from './pages/game_screens/SelectAnimals';
import SelectOperations from './pages/game_screens/SelectOperations';
import QuestionScreen from './pages/game_screens/QuestionScreen';
import ResultsScreen from './pages/game_screens/ResultsScreen';

const navigationOptions = {
    headerTitleStyle: {
        color: white,
    },
    headerTitleStyle: {
        color: white
    },
    headerTintColor:  white,
    headerStyle: {
        backgroundColor: colorPrimary
    }
}


const RootStack = createStackNavigator({
    Splash1: {
        screen: SplashScreen1,
        navigationOptions: navigationOptions
    },
    Main: {
        screen: Main,
        navigationOptions: navigationOptions
    },
    SetName: {
        screen: SetName,
        navigationOptions: navigationOptions
    },
    SetCharacter: {
        screen: SetCharacter,
        navigationOptions: navigationOptions
    },
    SelectAnimals: {
        screen: SelectAnimals,
        navigationOptions: navigationOptions
    },
    SelectOperations: {
        screen: SelectOperations,
        navigationOptions: navigationOptions
    },
    QuestionScreen: {
        screen: QuestionScreen,
        navigationOptions: navigationOptions
    },
    ResultsScreen: {
        screen: ResultsScreen,
        navigationOptions: navigationOptions
    }
},{
    initialRouteName: 'Splash1'
});

const AppContainer = createAppContainer(RootStack);

export default AppContainer;