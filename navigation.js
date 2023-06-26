import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './screens/TabScreens/home';
import NewBook from './screens/TabScreens/newbook';
import AllBooks from './screens/TabScreens/allbooks';
import Profile from './screens/TabScreens/profile';
import {Ionicons} from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import Bookmarks from './screens/TopTabAllB/bookmarks';
import Wishlist from './screens/TopTabAllB/wishList';

//top allbooks
const TopAllBooksNavigation= createMaterialTopTabNavigator();

function TopTabsGrup(){
   return(<TopAllBooksNavigation.Navigator
    screenOptions={
        {tabBarLabelStyle:{
            textTransform:"capitalize",
            fontWeight:"bold"},
         tabBarIndicatorStyle:{
            height:5,
            borderRadius:5,
            backgroundcolor:"#5C469C",
         }}
    }>
        <TopAllBooksNavigation.Screen name="main" component={AllBooks}/>
        <TopAllBooksNavigation.Screen name="bookmarks" component={Bookmarks}/>
        <TopAllBooksNavigation.Screen name="wishlist" component={Wishlist}/>
    </TopAllBooksNavigation.Navigator>)
}
//tabb navigation '
const TabNavigation = createBottomTabNavigator();

function TabGrup() {
    return ( <TabNavigation.Navigator screenOptions={({route, navigation}) => ({
        tabBarIcon:({color, focused,size}) => {
            let iconName;
            if (route.name=== "Home"){
                iconName="home-outline";
            } else if(route.name=== "NewBook"){
                iconName="add-circle-outline";
            }else if(route.name=== "All"){
                iconName="book-outline";
            }else if(route.name=== "Profile"){
                iconName="person-outline";
            }

            return <Ionicons name={iconName} size={size} color={color}/>
        },
        tabBarActiveTintColor:"#654E92",
        tabBarInactiveTintColor:"#E5BEEC"
    })} >
        <TabNavigation.Screen name = "Home"
        component = { Home }
        /> 
        <TabNavigation.Screen name = "NewBook"
        component = { NewBook }
        /> 
        <TabNavigation.Screen name = "All"
        component = { TopTabsGrup }
        /> 
        <TabNavigation.Screen name = "Profile"
        component = { Profile }
        /> 
        </TabNavigation.Navigator>
    )
}

export default function Navigation() {
    return ( <NavigationContainer >
        <TabGrup/>
        </NavigationContainer>
    )
}