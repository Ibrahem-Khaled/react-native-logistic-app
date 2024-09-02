import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { HeaderBack } from '../../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { baseURL } from '../../../env';
import { AuthContext } from '../../Context/AuthContext';
import { useTranslation } from 'react-i18next';

const ContactUs = () => {
    const { t } = useTranslation();
    const [size, setSize] = useState('');
    const [weight, setWeight] = useState('');
    const [goodsType, setGoodsType] = useState('');
    const [cartonsCount, setCartonsCount] = useState('');
    const [pickupLocation, setPickupLocation] = useState('');
    const [deliveryLocation, setDeliveryLocation] = useState('');
    const [errors, setErrors] = useState({});
    const { token } = useContext(AuthContext);

    const validateFields = () => {
        const newErrors = {};
        if (!size) newErrors.size = t('requiredField');
        if (!weight) newErrors.weight = t('requiredField');
        if (!goodsType) newErrors.goodsType = t('requiredField');
        if (!cartonsCount) newErrors.cartonsCount = t('requiredField');
        if (!pickupLocation) newErrors.pickupLocation = t('requiredField');
        if (!deliveryLocation) newErrors.deliveryLocation = t('requiredField');
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const submit = async () => {
        if (!validateFields()) {
            return;
        }

        try {
            const response = await axios.post(`${baseURL}/api/contact-us`, {
                size,
                weight,
                goodsType,
                cartonsCount,
                pickupLocation,
                deliveryLocation,
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log(response.data);
            alert(t('successMessage'));
            setSize('');
            setWeight('');
            setGoodsType('');
            setCartonsCount('');
            setPickupLocation('');
            setDeliveryLocation('');
            setErrors({});
        } catch (error) {
            console.log(error);
            alert(t('errorMessage'));
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='handled'>
                <HeaderBack name={t('quoteRequest')} />
                <View style={styles.form}>
                    <TextInput
                        style={styles.input}
                        placeholder={t('shipmentSize')}
                        placeholderTextColor="#666"
                        value={size}
                        onChangeText={setSize}
                    />
                    {errors.size && <Text style={styles.errorText}>{errors.size}</Text>}
                    <TextInput
                        style={styles.input}
                        placeholder={t('shipmentWeight')}
                        keyboardType='numeric'
                        placeholderTextColor="#666"
                        value={weight}
                        onChangeText={setWeight}
                    />
                    {errors.weight && <Text style={styles.errorText}>{errors.weight}</Text>}
                    <TextInput
                        style={styles.input}
                        placeholder={t('goodsType')}
                        placeholderTextColor="#666"
                        value={goodsType}
                        onChangeText={setGoodsType}
                    />
                    {errors.goodsType && <Text style={styles.errorText}>{errors.goodsType}</Text>}
                    <TextInput
                        style={styles.input}
                        placeholder={t('cartonsCount')}
                        keyboardType='numeric'
                        placeholderTextColor="#666"
                        value={cartonsCount}
                        onChangeText={setCartonsCount}
                    />
                    {errors.cartonsCount && <Text style={styles.errorText}>{errors.cartonsCount}</Text>}
                    <TextInput
                        style={styles.input}
                        placeholder={t('pickupLocation')}
                        placeholderTextColor="#666"
                        value={pickupLocation}
                        onChangeText={setPickupLocation}
                    />
                    {errors.pickupLocation && <Text style={styles.errorText}>{errors.pickupLocation}</Text>}
                    <TextInput
                        style={styles.input}
                        placeholder={t('deliveryLocation')}
                        placeholderTextColor="#666"
                        value={deliveryLocation}
                        onChangeText={setDeliveryLocation}
                    />
                    {errors.deliveryLocation && <Text style={styles.errorText}>{errors.deliveryLocation}</Text>}
                    <TouchableOpacity onPress={submit} style={styles.button}>
                        <Text style={styles.buttonText}>{t('submit')}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ContactUs;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    form: {
        marginBottom: 20,
        paddingHorizontal: 15,
    },
    input: {
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 16,
        marginBottom: 15,
        fontFamily: 'Cairo-Regular',
        borderWidth: 1,
        borderColor: '#ccc',
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginBottom: 15,
        fontFamily: 'Cairo-Regular',
    },
    button: {
        backgroundColor: '#53045F',
        borderRadius: 8,
        paddingVertical: 15,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'Cairo-SemiBold',
    },
});
