import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Linking } from 'react-native';
import React from 'react';
import { HeaderBack } from '../../components/Header';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';

const BuyFromChina = () => {
    const { t } = useTranslation();
    return (
        <SafeAreaView style={styles.container}>
            <HeaderBack name={t('buy_from_China')} />
            <ScrollView style={styles.content}>
                <Image
                    source={require('../../images/fix-images/buyFromChina.png')}
                    style={styles.image}
                    resizeMode="cover"
                />
                <Text style={styles.title}>{t('buy_from_China')}</Text>
                <Text style={styles.description}>
                    {t('service_description')}
                </Text>
                <TouchableOpacity onPress={() => Linking.openURL('https://wa.me/+9647850800790')} activeOpacity={0.8} style={styles.button}>
                    <FontAwesome5 name="whatsapp" size={24} color="#fff" />
                    <Text style={{ textAlign: 'center', fontFamily: 'Cairo-Bold', fontSize: 18, color: '#fff' }}>+964 785 080 0790</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

export default BuyFromChina;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        padding: 10,
    },
    image: {
        width: '100%',
        height: 350,
        borderRadius: 10,
        marginVertical: 20,
    },
    title: {
        fontSize: 24,
        color: '#333',
        textAlign: 'center',
        marginBottom: 10,
        fontFamily: 'Cairo-Bold',
    },
    description: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginVertical: 20,
        fontFamily: 'Cairo-Regular',

    },
    button: {
        backgroundColor: '#53045F',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    }
});
