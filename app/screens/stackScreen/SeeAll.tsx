import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeaderBack } from '../../components/Header';
import { AntDesign, Feather, FontAwesome5, FontAwesome6 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../Context/AuthContext';
import { baseURL } from '../../../env';
import axios from 'axios';
import Loading from '../../components/Loading';
import { useTranslation } from 'react-i18next';

const SeeAll = () => {
    const { t } = useTranslation();
    const navigation = useNavigation();
    const { token, user } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchAllShipment = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${baseURL}/api/all-shipments`,);
            setData(response.data);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAllShipment();
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    const calculateDaysLeft = (deliveredDate) => {
        const currentDate = new Date();
        const deliveredDateObj = new Date(deliveredDate);
        const timeDifference = deliveredDateObj.getTime() - currentDate.getTime();
        const daysLeft = Math.ceil(timeDifference / (1000 * 3600 * 24));
        return daysLeft > 0 ? daysLeft : 0;
    };

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('ShipmentDetails', { shipment: item })}
                style={styles.shipmentCard}
            >
                <View style={{ alignItems: 'flex-start', flex: 1 }}>
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
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <HeaderBack name={t('seeAllShipments')} />
            <FlatList
                style={styles.shipmentsContainer}
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
            />
        </SafeAreaView>
    );
};

export default SeeAll;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    shipmentsContainer: {
        padding: 10,
    },
    shipmentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '70%',
        marginBottom: 5,
        paddingHorizontal: 5,
    },
    shipmentCard: {
        backgroundColor: '#fff',
        borderLeftWidth: 5,
        borderColor: '#53045F',
        borderRadius: 10,
        padding: 10,
        elevation: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 340,
        margin: 10,
        alignSelf: 'center',
    },
    shipmentText: {
        color: '#333',
        fontSize: 14,
        fontFamily: 'Cairo-SemiBold',
    },
});
