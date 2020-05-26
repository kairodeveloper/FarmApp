import { createAppContainer } from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack';
import Main from './pages/Main'
import { white, colorPrimary } from '../colors';
import SetName from './pages/register_player/SetName';
import SetCharacter from './pages/register_player/SetCharacter';
import SelectAnimals from './pages/game_screens/SelectAnimals';
import SelectOperations from './pages/game_screens/SelectOperations';
import QuestionScreen from './pages/game_screens/QuestionScreen';

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
    }
},{
    initialRouteName: 'Main'
});

const AppContainer = createAppContainer(RootStack);

export default AppContainer;