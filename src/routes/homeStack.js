import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Home from '../screens/Home';
import Chat from '../screens/Chat';
import Audio from '../screens/Audio';

const screens = {
    Home: {
        screen: Audio,
    }
};

const HomeStack = createStackNavigator( screens );

export default createAppContainer( HomeStack );