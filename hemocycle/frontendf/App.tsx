/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './pages/HomeScreen';
import NewRecord from './pages/NewRecord';
import Data from './pages/Data';

const Stack = createNativeStackNavigator()

function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="New record" component={NewRecord}/>
        <Stack.Screen name="Data" component={Data}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
