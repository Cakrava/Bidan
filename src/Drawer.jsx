import React from 'react';
import {View, Text, Image, StyleSheet, ImageBackground} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import Dashboard from './Dahsbord/Dashboard';
import DataBidan from './Bidan/DataBidan';
import DataPasien from './Pasien/DataPasien';
import col from '../src/assets/ColorHunt';
import Icon from 'react-native-vector-icons/Ionicons';
import DesainDrawer from './Component/CustomDrawer';
import NavBidan from './Bidan/NavBidan';
const Drawer = createDrawerNavigator();
const LaporanDrawer = createDrawerNavigator();

export default function Laci() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Dashboard"
        drawerContent={props => <DesainDrawer {...props} />}
        screenOptions={{
          drawerActiveTintColor: col.darkpink,
          drawerInactiveTintColor: col.hitam,
          drawerLabelStyle: {
            fontWeight: 'bold',
          },
          gestureEnabled: true, // Memastikan gesture swipe untuk membuka drawer diaktifkan
          edgeWidth: 50,
        }}>
        <Drawer.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            headerShown: true,
            drawerActiveTintColor: col.darkpink,
            title: 'Dahsboard',
            marginLeft: -25,
            drawerIcon: ({focused, size}) => (
              <Icon
                name="home-outline"
                size={20}
                color={focused ? col.darkpink : col.hitam}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="DataBidan"
          component={NavBidan}
          options={{
            headerShown: false,
            drawerActiveTintColor: col.darkpink,
            title: 'Bidan',
            marginLeft: -25,
            drawerIcon: ({focused, size}) => (
              <Icon
                name="people-outline"
                size={20}
                color={focused ? col.darkpink : col.hitam}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Pasien"
          component={DataPasien}
          options={{
            drawerActiveTintColor: col.darkpink,
            title: 'Pasien',
            marginLeft: -25,
            drawerIcon: ({focused, size}) => (
              <Icon
                name="people-outline"
                size={20}
                color={focused ? col.darkpink : col.hitam}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Obat"
          component={DataPasien}
          options={{
            drawerActiveTintColor: col.darkpink,
            title: 'Obat',
            marginLeft: -25,
            drawerIcon: ({focused, size}) => (
              <Icon
                name="medkit-outline"
                size={20}
                color={focused ? col.darkpink : col.hitam}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Laporan"
          component={LaporanScreens}
          options={{
            drawerActiveTintColor: col.darkpink,
            title: 'Laporan',
            drawerIcon: ({focused, size}) => (
              <Icon
                name="newspaper-outline"
                size={20}
                color={focused ? col.darkpink : col.hitam}
              />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
// Laporan Screens nested navigator
function LaporanScreens() {
  return (
    <LaporanDrawer.Navigator
      screenOptions={{
        drawerActiveTintColor: col.darkpink,
        drawerInactiveTintColor: col.hitam,
        drawerLabelStyle: {
          fontWeight: 'bold',
          // Increase the margin between icon and text
          marginLeft: -25,
        },
      }}>
      <LaporanDrawer.Screen
        name="Keuangan"
        component={DataBidan} // Replace with your actual component for "Keuangan"
        options={{drawerLabel: 'Keuangan'}}
      />
      <LaporanDrawer.Screen
        name="Transaksi"
        component={DataPasien} // Replace with your actual component for "Transaksi"
        options={{drawerLabel: 'Transaksi'}}
      />
    </LaporanDrawer.Navigator>
  );
}
