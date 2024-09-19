import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { useTranslation } from 'react-i18next';

const ForgotPassword = () => {
    const nav = useNavigation();
    const { t } = useTranslation();

    return (
        <View style={styles.container}>
            <Image source={require('../../images/logo-white.png')} resizeMode='contain' style={styles.logo} />
            <Text style={styles.title}>{t('forgotPassword')}</Text>
            <Text style={styles.subtitle}>{t('enterEmail')}</Text>
            <TextInput
                style={styles.input}
                placeholder={t('emailPlaceholder')}
                placeholderTextColor="#666"
            />
            <TouchableOpacity onPress={() => {/* إعادة تعيين كلمة المرور */ }} style={styles.button}>
                <Text style={styles.buttonText}>{t('resetPassword')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => nav.navigate('login')}>
                <Text style={styles.backToLogin}>{t('backToLogin')}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ForgotPassword;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        color: '#333',
        marginBottom: 20,
        fontFamily: 'Cairo-Bold',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 20,
        fontFamily: 'Cairo-Regular',
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 16,
        marginBottom: 20,
        fontFamily: 'Cairo-Regular',
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#53045F',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'Cairo-SemiBold',
    },
    backToLogin: {
        color: '#53045F',
        fontSize: 16,
        fontFamily: 'Cairo-Regular',
        textDecorationLine: 'underline',
        marginVertical: 10,
    },
});
