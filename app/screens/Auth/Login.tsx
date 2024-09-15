import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { AuthContext } from '../../Context/AuthContext';
import { useTranslation } from 'react-i18next';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, isLoading } = useContext(AuthContext);
    const nav = useNavigation();
    const { t } = useTranslation();

    const handleLogin = async () => {
        if (email == '' || password == '') {
            Alert.alert('خطأ', 'الرجاء تعبئة جميع الحقول');
            return;
        }
        try {
            await login(email, password);
        } catch (err) {
            setError(t('login_error')); // Add this key in the language files if needed
        }
    };

    return (
        <View style={styles.container}>
            <Image source={require('../../images/logo-white.jpeg')} resizeMode='contain' style={styles.logo} />
            <Text style={styles.title}>{t('login_title')}</Text>
            {error ? <Text style={styles.error}>{error}</Text> : null}

            <TextInput
                style={styles.input}
                placeholder={t('email_placeholder')}
                placeholderTextColor="#666"
                onChangeText={setEmail}
                value={email}
            />
            <TextInput
                style={styles.input}
                placeholder={t('password_placeholder')}
                placeholderTextColor="#666"
                secureTextEntry
                onChangeText={setPassword}
                value={password}
            />
            <TouchableOpacity onPress={handleLogin} style={styles.button} disabled={isLoading}>
                {isLoading ? (
                    <Text style={styles.buttonText}>{t('loading_button')}</Text>
                ) : (
                    <Text style={styles.buttonText}>{t('login_button')}</Text>
                )}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => nav.navigate('Register')}>
                <Text style={styles.forgotPassword}>{t('register_link')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => nav.navigate('ForgetPassword')}>
                <Text style={styles.forgotPassword}>{t('forgot_password')}</Text>
            </TouchableOpacity>
        </View >
    );
};

export default Login;

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
        marginBottom: 40,
        fontFamily: 'Cairo-Bold',
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
    forgotPassword: {
        color: '#53045F',
        fontSize: 16,
        fontFamily: 'Cairo-Regular',
        textDecorationLine: 'underline',
        marginVertical: 10,
    },
});
