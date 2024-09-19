import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView, Platform } from 'react-native';
import { AuthContext } from '../../Context/AuthContext';
import { useTranslation } from 'react-i18next';
import { Picker } from '@react-native-picker/picker';

const SignUp = () => {
    const nav = useNavigation();
    const { register } = useContext(AuthContext);
    const { t } = useTranslation();

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [workType, setWorkType] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const handleRegister = () => {
        if (!fullName || !email || !phone || !address || !city || !password) {
            setError(t('fillAllFields'));
            return;
        }
        if (!validateEmail(email)) {
            setError(t('invalidEmail'));
            return;
        }
        if (password !== confirmPassword) {
            setError(t('passwordsDoNotMatch'));
            return;
        }

        register(fullName, email, password, phone, address, country, city, workType);
    };

    return (
        <ScrollView keyboardShouldPersistTaps="handled" style={styles.container}>
            <Image source={require('../../images/logo-white.png')} resizeMode='contain' style={styles.logo} />
            <Text style={styles.title}>{t('signUp')}</Text>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <TextInput
                style={styles.input}
                placeholder={t('fullName')}
                placeholderTextColor="#666"
                value={fullName}
                onChangeText={setFullName}
            />
            <TextInput
                style={styles.input}
                placeholder={t('email')}
                placeholderTextColor="#666"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder={t('phoneNumber')}
                placeholderTextColor="#666"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
            />
            <TextInput
                style={styles.input}
                placeholder={t('address')}
                placeholderTextColor="#666"
                value={address}
                onChangeText={setAddress}
            />
            <TextInput
                style={styles.input}
                placeholder={t('country')}
                placeholderTextColor="#666"
                value={country}
                onChangeText={setCountry}
            />
            <TextInput
                style={styles.input}
                placeholder={t('city')}
                placeholderTextColor="#666"
                value={city}
                onChangeText={setCity}
            />
            <Picker
                selectedValue={workType}
                style={Platform.OS === 'android' ? styles.input : {}}
                onValueChange={(itemValue) => setWorkType(itemValue)}
            >
                <Picker.Item label={'تاجر'} value="تاجر" />
                <Picker.Item label={'شركة'} value="شركة" />
                <Picker.Item label={'صاحب محل'} value="صاحب محل" />
                <Picker.Item label={"صاحب المتجر"} value="صاحب المتجر" />
            </Picker>
            <TextInput
                style={styles.input}
                placeholder={t('password')}
                placeholderTextColor="#666"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TextInput
                style={styles.input}
                placeholder={t('confirmPassword')}
                placeholderTextColor="#666"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>{t('register')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => nav.navigate('login')}>
                <Text style={styles.loginLink}>{t('haveAccount')}</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default SignUp;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 20,
    },
    logo: {
        width: 150,
        height: 150,
        marginVertical: 20,
        alignSelf: 'center',
    },
    title: {
        fontSize: 24,
        color: '#333',
        marginVertical: 20,
        fontFamily: 'Cairo-Bold',
        textAlign: 'center',
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
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
        textAlign: 'right',
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#53045F',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'Cairo-SemiBold',
    },
    loginLink: {
        color: '#53045F',
        fontSize: 16,
        fontFamily: 'Cairo-Regular',
        textDecorationLine: 'underline',
        textAlign: 'center',
        paddingVertical: 20,
        marginVertical: 20,
    },
});
