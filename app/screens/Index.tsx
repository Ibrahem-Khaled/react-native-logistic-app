import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Auth/Login';
import SignUp from './Auth/Register';
import ForgotPassword from './Auth/ForgetPassword';
import TrackShipment from './stackScreen/TrackShipment';
import ShipmentsOnWay from './stackScreen/ShipmentsOnWay';
import { AuthContext } from '../Context/AuthContext';
import Loading from '../components/Loading';
import Notification from './stackScreen/Notification';
import ShipmentDetails from './stackScreen/ShipmentDetails';
import Profile from './Auth/Profile';
import ContactUs from './stackScreen/ContactUs';
import SeeAll from './stackScreen/SeeAll';
import DrawerNav from '../components/Drawer';
import BuyFromChina from './stackScreen/BuyFromChina';
import Branches from './stackScreen/Branches';



const Stack = createNativeStackNavigator();

const Index = () => {
    const { user, isLoading } = React.useContext(AuthContext)
    
    if (isLoading) {
        return <Loading />
    }

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='login'>
                {!user ?
                    <>
                        <Stack.Screen name="login" component={Login} />
                        <Stack.Screen name="Register" component={SignUp} />
                        <Stack.Screen name="ForgetPassword" component={ForgotPassword} />
                    </>
                    :
                    <>
                        <Stack.Screen name="Home" component={DrawerNav} />
                        <Stack.Screen name="profile" component={Profile} />
                        <Stack.Screen name="trackShipment" component={TrackShipment} />
                        <Stack.Screen name="ShipmentsOnWay" component={ShipmentsOnWay} />
                        <Stack.Screen name="NotificationScreen" component={Notification} />
                        <Stack.Screen name="ShipmentDetails" component={ShipmentDetails} />
                        <Stack.Screen name="contactUs" component={ContactUs} />
                        <Stack.Screen name="SeeAll" component={SeeAll} />
                        <Stack.Screen name="BuyFromChina" component={BuyFromChina} />
                        <Stack.Screen name="branches" component={Branches} />
                    </>}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Index