import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign, Feather, FontAwesome, FontAwesome5, FontAwesome6 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { HeaderBack } from '../../components/Header';
import { baseURL } from '../../../env';
import { useTranslation } from 'react-i18next';

const TrackShipment = () => {
    const { t } = useTranslation();
    const navigation = useNavigation();
    const [search, setSearch] = useState('');
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = async () => {
        if (!search.trim()) return;

        setLoading(true);
        setError('');
        setResults(null);
        try {
            const response = await axios.post(`${baseURL}/api/shipments/search`, { search });
            console.log(response.data);
            if (response.data) {
                setResults(response.data);
            } else {
                setResults(null);
                setError(t('noResultsFound'));
                console.log('No results found');
            }
        } catch (err) {
            setError(t('noResultsFound'));
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const calculateDaysLeft = (deliveredDate) => {
        const currentDate = new Date();
        const deliveredDateObj = new Date(deliveredDate);
        const timeDifference = deliveredDateObj.getTime() - currentDate.getTime();
        const daysLeft = Math.ceil(timeDifference / (1000 * 3600 * 24));
        return daysLeft > 0 ? daysLeft : 0;
    };

    const RenderItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('ShipmentDetails', { shipment: item })} style={styles.shipmentCard}>
            <View style={{ alignItems: 'flex-start', flex: 1 }}>
                <View style={styles.shipmentHeader}>
                    <FontAwesome6 name="hashtag" size={15} color="#53045F" />
                    <Text style={styles.shipmentText}>{item.tracking_number}</Text>
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

    return (
        <SafeAreaView style={styles.container}>
            <HeaderBack name={t('trackShipment')} />
            <View style={{ alignSelf: 'center', width: '100%', alignItems: 'center' }}>
                <View style={styles.inputContainer}>
                    <FontAwesome name="hashtag" size={24} color="#53045F" style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder={t('enterTrackingNumber')}
                        placeholderTextColor="#999"
                        value={search}
                        onChangeText={setSearch}
                    />
                </View>
                <TouchableOpacity style={styles.button} onPress={handleSearch} disabled={loading}>
                    <Text style={styles.buttonText}>{loading ? t('searching') : t('trackYourShipment')}</Text>
                </TouchableOpacity>
            </View>
            {error && (
                <View style={styles.errorContainer}>
                    <AntDesign name="frowno" size={50} color="#53045F" />
                    <Text style={styles.errorMessage}>{error}</Text>
                </View>
            )}
            {results && <RenderItem key={results.tracking_number} item={results} />}
        </SafeAreaView>
    );
};

export default TrackShipment;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '80%',
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 40,
        fontSize: 16,
        color: '#333',
        fontFamily: 'Cairo-Bold',
    },
    button: {
        width: '80%',
        backgroundColor: '#53045F',
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Cairo-SemiBold',
    },
    errorContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
    },
    errorMessage: {
        color: '#53045F',
        fontSize: 18,
        fontFamily: 'Cairo-SemiBold',
        marginTop: 20,
        textAlign: 'center',
        paddingHorizontal: 20,
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
