import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabRoutes from './TabRoutes';

const Drawer = createDrawerNavigator();


const CustomDrawerContent = ({ navigation }) => {
 

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "lightgray" }}>
            <View style={{
                width:'100%',
                height:200,
                backgroundColor: 'lightblue',
            }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', padding: 10 }}>Custom Drawer Content</Text>
            </View>
        </SafeAreaView>

    )
}



const DrawerRoutesNavigation = () => {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false,
            }}
            drawerContent={props => <CustomDrawerContent {...props} />}
        >
            <Drawer.Screen name="TabRoutes" component={TabRoutes} />
        </Drawer.Navigator>
    )
}

export default DrawerRoutesNavigation

const styles = StyleSheet.create({})