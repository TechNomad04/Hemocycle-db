import HomeScreen from './Screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import NewRecord from './Screens/NewRecord';
import UploadPage from './Screens/Uploads';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="New Record" component={NewRecord}/>
        <Stack.Screen name="Uploads" component={UploadPage}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}