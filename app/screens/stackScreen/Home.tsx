import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Linking, FlatList, RefreshControl, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../../components/Header';
import { AntDesign, Entypo, Feather, FontAwesome, FontAwesome5, FontAwesome6 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../Context/AuthContext';
import axios from 'axios';
import { baseURL } from '../../../env';
import SlideShow from '../../components/Slide';
import Loading from '../../components/Loading';
import { useTranslation } from 'react-i18next';
import { usePushNotifications } from '../../../usePushNotifications';

const Home = ({ openSideBar }) => {
    const navigation = useNavigation();
    const { t } = useTranslation();
    const [data, setData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { token, user, sendExpoToken } = useContext(AuthContext);
    const { expoPushToken, notification } = usePushNotifications();
    const dataNotification = JSON.stringify(notification, undefined, 2);
    console.log(expoPushToken?.data)


    const fetchShipment = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${baseURL}/api/shipments`,);
            setData(response.data);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchShipment();
        sendExpoToken(expoPushToken?.data);
    }, [expoPushToken]);

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchShipment();
        setRefreshing(false);
    };

    const calculateDaysLeft = (deliveredDate) => {
        const currentDate = new Date();
        const deliveredDateObj = new Date(deliveredDate);
        const timeDifference = deliveredDateObj.getTime() - currentDate.getTime();
        const daysLeft = Math.ceil(timeDifference / (1000 * 3600 * 24));
        return daysLeft > 0 ? daysLeft : 0;
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header openSideBar={openSideBar} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                <SlideShow />
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{t('latest_shipments')}</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('SeeAll')}>
                        <Text style={styles.showAll}>{t('view_all')}</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    // style={styles.shipmentsContainer}
                    inverted
                    data={data}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => navigation.navigate('ShipmentDetails', { shipment: item })} style={styles.shipmentCard}>
                            <View style={{ alignItems: 'flex-end', flex: 1 }}>
                                <View style={styles.shipmentHeader}>
                                    <FontAwesome6 name="hashtag" size={15} color="#53045F" />
                                    <Text style={styles.shipmentText}>{item.tracking_number}</Text>
                                </View>
                                <View style={styles.shipmentHeader}>
                                    <AntDesign name="user" size={15} color="#53045F" />
                                    <Text style={styles.shipmentText}>{user.name}</Text>
                                </View>
                                <View style={styles.shipmentHeader}>
                                    <Feather name="box" size={15} color="#53045F" />
                                    <Text style={styles.shipmentText}>{item.shipment_count}</Text>
                                </View>
                            </View>
                            <View style={{ alignItems: 'center' }}>
                                <Text style={[styles.shipmentText, { color: 'gray', marginBottom: 10 }]}>
                                    {calculateDaysLeft(item.delivered_date)} {t('days_left')}
                                </Text>
                                <FontAwesome5 name="box" size={24} color="gray" />
                            </View>
                        </TouchableOpacity>
                    )}
                />

                <View style={styles.optionsContainer}>
                    <TouchableOpacity onPress={() => { navigation.navigate('trackShipment') }} style={styles.optionButton}>
                        <FontAwesome5 name="truck" size={24} color="#fff" style={styles.optionIcon} />
                        <Text style={styles.optionText}>{t('track_your_shipment')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { Linking.openURL('https://alfuttaimcargo.com') }} style={styles.optionButton}>
                        <FontAwesome5 name="map-marked-alt" size={24} color="#fff" style={styles.optionIcon} />
                        <Text style={styles.optionText}>{t('points')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { navigation.navigate('ShipmentsOnWay') }} style={styles.optionButton}>
                        <Entypo name="location" size={24} color="#fff" style={styles.optionIcon} />
                        <Text style={styles.optionText}>{t('historyShipment')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { navigation.navigate('contactUs') }} style={styles.optionButton}>
                        <FontAwesome name="dollar" size={24} color="#fff" style={styles.optionIcon} />
                        <Text style={styles.optionText}>{t('get_quote')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { navigation.navigate('BuyFromChina') }} style={styles.optionButton}>
                        <Entypo name="shopping-cart" size={24} color="#fff" style={styles.optionIcon} />
                        <Text style={styles.optionText}>{t('buy_from_China')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { navigation.navigate('branches') }} style={styles.optionButton}>
                        <FontAwesome6 name="magnifying-glass-location" size={24} color="#fff" style={styles.optionIcon} />
                        <Text style={styles.optionText}>{t('branches')}</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    section: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    sectionTitle: {
        fontSize: 18,
        color: '#53045F',
        fontFamily: 'Cairo-SemiBold',
    },
    showAll: {
        fontSize: 12,
        color: 'gray',
        fontFamily: 'Cairo-SemiBold',
        textDecorationLine: 'underline',
    },
    shipmentsContainer: {
        flexDirection: 'row-reverse',
    },
    shipmentHeader: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '70%',
        marginBottom: 5,
        paddingHorizontal: 5,
    },
    shipmentCard: {
        backgroundColor: '#fff',
        borderRightWidth: 5,
        borderColor: '#53045F',
        borderRadius: 10,
        padding: 7,
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignSelf: 'center',
        width: 340,
        margin: 10,
        elevation: 5,
    },
    shipmentText: {
        color: '#333',
        fontSize: 14,
        fontFamily: 'Cairo-SemiBold',
    },
    optionsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        flex: 1,
        padding: 10,
    },
    optionButton: {
        width: '45%',
        backgroundColor: '#53045F',
        borderRadius: 10,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    optionIcon: {
        marginBottom: 10,
    },
    optionText: {
        color: '#fff',
        fontSize: 14,
        textAlign: 'center',
        fontFamily: 'Cairo-SemiBold',
    },
});
