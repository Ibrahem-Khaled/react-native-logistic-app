import axios from 'axios';
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { baseURL } from '../../env';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext<any | undefined>(undefined);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [isLoading, setIsLoading] = useState(false);


    const login = useCallback(async (email, password) => {
        setIsLoading(true);
        try {
            const response = await axios.post(`${baseURL}/api/login`, { email, password });
            const { token, user } = response.data;
            await AsyncStorage.setItem('token', token);
            setToken(token);
            setUser(user);
        } catch (error) {
            console.error('Login failed:', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const register = useCallback(async (fullName, email, password, phone, address, country, city, workType) => {
        setIsLoading(true);
        try {
            const response = await axios.post(`${baseURL}/api/register`, {
                name: fullName,
                email,
                password,
                phone,
                address,
                country,
                city,
                type_of_work: workType,
            });
            const { token, user } = response.data;
            await AsyncStorage.setItem('token', token);
            setToken(token);
            setUser(user);
        } catch (error) {
            console.error('Registration failed:', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const updateUser = useCallback(async (name, email, phone, address, country, city, workType, userToken) => {
        setIsLoading(true);
        try {
            const response = await axios.post(`${baseURL}/api/update`, {
                name: name,
                email,
                phone,
                address,
                country,
                city,
                type_of_work: workType,
            }, { headers: { Authorization: `Bearer ${userToken}` } });
            alert('تم التعديل بنجاح')
        } catch (error) {
            console.error('update failed:', error);
            console.log(userToken);
            console.warn(error.response.data);
        } finally {
            checkAuthStatus();
            setIsLoading(false);
        }
    }, []);

    const logout = useCallback(async () => {
        setIsLoading(true);
        try {
            await AsyncStorage.removeItem('token');
            setToken(null);
            setUser(null);
        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const checkAuthStatus = useCallback(async () => {
        setIsLoading(true);
        try {
            const storedToken = await AsyncStorage.getItem('token');
            if (storedToken) {
                setToken(storedToken);
                const response = await axios.get(`${baseURL}/api/user`, { headers: { Authorization: `Bearer ${storedToken}` } })
                setUser(response.data);
            }
        } catch (error) {
            console.error('Failed to check auth status:', error);
            await logout();
        } finally {
            setIsLoading(false);
        }
    }, [logout]);

    const sendExpoToken = async (expoToken) => {
        try {
            const storedToken = await AsyncStorage.getItem('token');
            if (storedToken) {
                const response = await axios.post(`${baseURL}/api/update`, { expo_push_token: expoToken }, {
                    headers: { Authorization: `Bearer ${storedToken}` },
                });
                console.log('Expo token sent successfully: sent expo token');
            }
        } catch (error) {
            console.error('Failed to send Expo token:', error);
        } finally {
            console.log('done');
        }
    };


    useEffect(() => {
        checkAuthStatus();
    }, [checkAuthStatus]);

    return (
        <AuthContext.Provider value={{ user, token, isLoading, login, register, logout, updateUser, sendExpoToken }}>
            {children}
        </AuthContext.Provider>
    );
};
