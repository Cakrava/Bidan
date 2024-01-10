import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DataBidan from './DataBidan';
import TambahDataBidan from './TambahDataBidan';

const Stack = createNativeStackNavigator();

export default function NavBidan() {
  return (
    <NavigationContainer independent>
      <Stack.Navigator initialRouteName="DataBidan">
        <Stack.Screen
          name="DataBidan"
          component={DataBidan}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Tambah" component={TambahDataBidan} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
