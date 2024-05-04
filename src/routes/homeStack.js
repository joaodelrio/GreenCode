// import { createStackNavigator } from 'react-navigation-stack';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
// import { createBottomStackNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Chat from '../screens/Chat';
import * as React from 'react';
import Home from '../screens/Home';
import Login from '../screens/Login';
import SMSConfirm from '../screens/SMSConfirm';

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
        <Stack.Screen name="Login" component={Login} />    
        <Stack.Screen name="SMSConfirm" component={SMSConfirm} />         
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Chat" component={Chat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;