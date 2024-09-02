import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign, FontAwesome, Feather, FontAwesome6, FontAwesome5 } from '@expo/vector-icons';
import { HeaderBack } from '../../components/Header';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../Context/AuthContext';
import { baseURL } from '../../../env';
import axios from 'axios';
import Loading from '../../components/Loading';


const shipmentsData = [
    {
        id: '1',
        trackingNumber: '453',
        boxNumber: '534',
        status: 'pending',
        time: '3 hours ago',
    },
    // Additional shipments...
];

const ShipmentsList = () => {
    const { t } = useTranslation();

    const navigation = useNavigation();
    const { token, user } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchAllShipment = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${baseURL}/api/all-shipments`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
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

    const renderShipmentItem = ({ item }) => (
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
                <View style={styles.shipmentHeader}>
                    <AntDesign name="setting" size={15} color="#53045F" />
                    <Text style={styles.shipmentText}>{item.status === 'pending' ? 'قيد الانتظار' : 'تم التسليم'}</Text>
                </View>
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                <Text style={[styles.shipmentText, { color: 'gray', marginBottom: 10 }]}>
                    {item.created_at.slice(0, 10)}
                </Text>
                <FontAwesome5 name="clock" size={24} color="gray" />
            </View>
        </TouchableOpacity>
    );

    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={renderShipmentItem}
            contentContainerStyle={styles.shipmentsContainer}
        />
    );
};

const ShipmentsOnWay = () => {
    const { t } = useTranslation();

    return (
        <SafeAreaView style={styles.container}>
            <HeaderBack name={t('historyShipment')} />
            <ShipmentsList />
        </SafeAreaView>
    );
};

export default ShipmentsOnWay;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    tabsContainer: {
        backgroundColor: '#53045F',
    },
    shipmentsContainer: {
        padding: 10,
    },
    shipmentCard: {
        backgroundColor: '#fff',
        borderLeftWidth: 5,
        borderColor: '#53045F',
        borderRadius: 10,
        padding: 10,
        margin: 5,
        elevation: 5,
        shadowColor: '#000',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    shipmentHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    shipmentText: {
        color: '#333',
        fontSize: 14,
        marginLeft: 10,
        fontFamily: 'Cairo-Regular',
    },
});
