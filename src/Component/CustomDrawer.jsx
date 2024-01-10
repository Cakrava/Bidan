import {Image, ImageBackground, StyleSheet, View, Text} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
export default function DesainDrawer(props) {
  return (
    <DrawerContentScrollView {...props}>
      <ImageBackground
        source={require('../../src/assets/img/menu-bg.jpeg')} // Replace with your image path
        style={styles.backgroundImage}>
        <View style={styles.profileContainer}>
          <Image
            source={require('../../src/assets/img/laki.jpg')} // Replace with your image path
            style={styles.profileImage}
          />
          <View
            style={{marginLeft: 20, justifyContent: 'center', marginTop: 20}}>
            <Text style={styles.profileName}>John Doe</Text>
            <Text style={styles.coinsText}>Admin</Text>
          </View>
        </View>
      </ImageBackground>
      <View style={styles.drawerItemList}>
        <DrawerItemList {...props} />
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    marginTop: -5,
  },
  profileContainer: {
    marginLeft: 20,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    marginTop: 20,
    width: 70,
    height: 70,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 40,
    marginBottom: 10,
  },
  profileName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  coinsText: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 20,
  },
  drawerItemList: {
    backgroundColor: '#fff',
    flex: 1,
  },
});
