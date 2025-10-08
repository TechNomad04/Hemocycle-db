import HomeScreen from './Screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import NewRecord from './Screens/NewRecord';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={NewRecord}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}