import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Home from '../screens/Home';
import Chat from '../screens/Chat';
import Audio from '../screens/Audio';
import Teste from '../screens/Teste';

const screens = {
    Home: {
        screen: Chat,
    }
};

const HomeStack = createStackNavigator( screens );

export default createAppContainer( HomeStack );