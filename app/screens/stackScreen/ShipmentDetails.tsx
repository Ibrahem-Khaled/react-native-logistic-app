import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { FontAwesome5, MaterialIcons, Ionicons, Entypo } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../../Context/AuthContext';
import { HeaderBack } from '../../components/Header';
import { useTranslation } from 'react-i18next';
import { translate } from '@vitalets/google-translate-api';
import Loading from '../../components/Loading';

const ShipmentDetails = ({ route }) => {
    const { shipment } = route.params;
    const { user, token } = useContext(AuthContext);
    const { t, i18n } = useTranslation();
    const [translatedShipment, setTranslatedShipment] = useState(shipment);
    const [loading, setLoading] = useState(false);
    console.log(token)
    const translateKurdish = async (text) => {
        try {
            const result = await translate(text, { to: 'ckb', from: 'auto' });
            return result.text;
        } catch (error) {
            console.error("Translation Error:", error);
            return text; // Return original text in case of an error
        }
    };

    const handleTranslation = async () => {
        if (i18n.language !== 'ar') {
            setLoading(true);
            const translated = {
                ...shipment,
                sent_area: await translateKurdish(shipment.sent_area),
                delivered_area: await translateKurdish(shipment.delivered_area),
                container: {
                    ...shipment.container,
                    location: await Promise.all(
                        shipment.container.location.map(async (loc) => ({
                            ...loc,
                            region: await translateKurdish(loc.region),
                            address: await translateKurdish(loc.address),
                        }))
                    ),
                },
            };
            setTranslatedShipment(translated);
            setLoading(false);
        }
    };

    useEffect(() => {
        handleTranslation();
    }, []);

    if (loading) {
        return <Loading />
    }

    return (
        <SafeAreaView style={styles.container}>
            <HeaderBack name={t('shipmentDetails')} />
            <ScrollView>
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>{t('shipmentInfo')}</Text>
                    <View style={styles.row}>
                        <FontAwesome5 name="shipping-fast" size={24} color="#53045F" />
                        <Text style={styles.text}>{translatedShipment.tracking_number}</Text>
                        <Text style={styles.title}>{t('trackingNumber')}:</Text>
                    </View>
                    <View style={styles.row}>
                        <FontAwesome5 name="user-alt" size={24} color="#53045F" />
                        <Text style={styles.text}>{user.name}</Text>
                        <Text style={styles.title}>{t('sender')}:</Text>
                    </View>
                    <View style={styles.row}>
                        <MaterialIcons name="location-on" size={24} color="#53045F" />
                        <Text style={styles.text}>{translatedShipment.sent_area}</Text>
                        <Text style={styles.title}>{t('sentArea')}:</Text>
                    </View>
                    <View style={styles.row}>
                        <MaterialIcons name="location-on" size={24} color="#53045F" />
                        <Text style={styles.text}>{translatedShipment.delivered_area}</Text>
                        <Text style={styles.title}>{t('deliveredArea')}:</Text>
                    </View>
                    <View style={styles.row}>
                        <FontAwesome5 name="calendar-alt" size={24} color="#53045F" />
                        <Text style={styles.text}>{translatedShipment.sent_date.slice(0, 10)}</Text>
                        <Text style={styles.title}>{t('sentDate')}:</Text>
                    </View>
                    <View style={styles.row}>
                        <FontAwesome5 name="calendar-alt" size={24} color="#53045F" />
                        <Text style={styles.text}>{translatedShipment.delivered_date.slice(0, 10)}</Text>
                        <Text style={styles.title}>{t('deliveredDate')}:</Text>
                    </View>
                    <View style={styles.row}>
                        <FontAwesome5 name="weight" size={24} color="#53045F" />
                        <Text style={styles.text}>{translatedShipment.weight} kg</Text>
                        <Text style={styles.title}>{t('weight')}:</Text>
                    </View>
                    <View style={styles.row}>
                        <FontAwesome5 name="weight" size={24} color="#53045F" />
                        <Text style={styles.text}>{translatedShipment.dimensions}</Text>
                        <Text style={styles.title}>{t('dimensions')}:</Text>
                    </View>
                    <View style={styles.row}>
                        <FontAwesome5 name="box" size={24} color="#53045F" />
                        <Text style={styles.text}>{translatedShipment.shipment_count}</Text>
                        <Text style={styles.title}>{t('shipmentCount')}:</Text>
                    </View>
                    <View style={styles.row}>
                        <Ionicons name="pricetag" size={24} color="#53045F" />
                        <Text style={styles.text}>{translatedShipment.price}  USD</Text>
                        <Text style={styles.title}>{t('price')}:</Text>
                    </View>
                </View>
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>{t('containerDetails')}</Text>
                    <View style={styles.row}>
                        <Entypo name="box" size={24} color="#53045F" />
                        <Text style={styles.text}>{translatedShipment.container.container_number}</Text>
                        <Text style={styles.title}>{t('containerNumber')}:</Text>
                    </View>
                    <View style={styles.row}>
                        <Entypo name="resize-full-screen" size={24} color="#53045F" />
                        <Text style={styles.text}>{translatedShipment.container.size}</Text>
                        <Text style={styles.title}>{t('size')}:</Text>
                    </View>
                    <View style={styles.row}>
                        <Entypo name="info" size={24} color="#53045F" />
                        <Text style={styles.text}>{translatedShipment.container.notes}</Text>
                        <Text style={styles.title}>{t('notes')}:</Text>
                    </View>
                </View>
                <View style={styles.timelineContainer}>
                    <Text style={styles.sectionTitle}>{t('track_shipment')}</Text>
                    {translatedShipment.container.location.map((loc, index) => (
                        <View key={loc.id} style={styles.timelineItem}>
                            <View style={styles.timelineContent}>
                                <Text style={styles.timelineText}>{loc.region || 'N/A'}</Text>
                                <Text style={styles.timelineText}>{loc.region || 'N/A'}</Text>
                                <Text style={styles.timelineText}>{loc.address || 'N/A'}</Text>
                                <Text style={styles.timelineText}>{loc?.pivot?.expected_arrival_date?.slice(0, 10) || 'N/A'}</Text>
                            </View>
                            <View style={styles.timelineCircle} />
                            {index < translatedShipment.container.location.length - 1 && (
                                <View style={styles.timelineLine} />
                            )}
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ShipmentDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        padding: 10,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        marginBottom: 15,
        elevation: 3,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        justifyContent: 'space-between',
        alignSelf: 'center',
    },
    title: {
        fontSize: 16,
        color: '#333',
        fontFamily: 'Cairo-SemiBold',
        marginLeft: 10,
        flex: 1,
    },
    text: {
        fontSize: 16,
        color: '#666',
        fontFamily: 'Cairo-Regular',
        flex: 1,
        textAlign: 'left',
        marginLeft: 40,
    },
    sectionTitle: {
        fontSize: 18,
        color: '#53045F',
        fontFamily: 'Cairo-Bold',
        marginBottom: 10,
    },
    timelineContainer: {
        paddingHorizontal: 20,
    },
    timelineItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        justifyContent: 'space-between',
    },
    timelineCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#53045F',
        zIndex: 1,
    },
    timelineLine: {
        width: 2,
        height: '100%',
        backgroundColor: '#53045F',
        position: 'absolute',
        top: '67%',
        left: '97%',
        zIndex: 0,
    },
    timelineContent: {
        paddingLeft: 20,
        alignItems: 'flex-end',
        flex: 1,
        right: 10,
    },
    timelineText: {
        fontSize: 14,
        color: '#666',
        fontFamily: 'Cairo-Regular',
        textAlign: 'right',
    },
});
