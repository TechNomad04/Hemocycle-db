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
import UploadImages from './pages/UploadImages';
import EditPage from './pages/EditPage';
import ViewImages from './pages/ViewImages';
import Part from './pages/Part';

const Stack = createNativeStackNavigator()

function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home' >
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="New record" component={NewRecord}/>
        <Stack.Screen name="Data" component={Data}/>
        <Stack.Screen name="Upload" component={UploadImages}/>
        <Stack.Screen name='Edit' component={EditPage}/>
        <Stack.Screen name='View Images' component={ViewImages}/>
        <Stack.Screen name="Part" component={Part}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
