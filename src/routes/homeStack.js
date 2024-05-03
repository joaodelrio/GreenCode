// import { createStackNavigator } from 'react-navigation-stack';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
// import { createBottomStackNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Chat from '../screens/Chat';
import * as React from 'react';
import SplashScreen from '../screens/SplashScreen';
import Home from '../screens/Home';
import Login from '../screens/Login';

// const screens = {
//     Home: {
//         screen: Chat,
//     }
// };

const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
      screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Greencode" component={SplashScreen} />
        <Stack.Screen name="Login" component={Login} />        
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Chat" component={Chat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;