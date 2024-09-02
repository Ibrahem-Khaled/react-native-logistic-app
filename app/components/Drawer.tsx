import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Modal, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../Context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { Drawer } from 'react-native-drawer-layout';
import Home from '../screens/stackScreen/Home';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import '../lang/i18n';

const DrawerNav = () => {
    const { user, logout, token } = React.useContext(AuthContext);
    const nav = useNavigation();
    const [open, setOpen] = useState(false);
    const { t, i18n } = useTranslation();
    const [currentLanguage, setCurrentLanguage] = useState('ar');

    const toggleSidebar = () => setOpen(!open);


    const handleLanguageChange = (value) => {
        i18n.changeLanguage(value)
            .then(() => setCurrentLanguage(value))
            .catch((err) => console.log(err));
    };

    return (
        <Drawer
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            drawerType="slide"
            hideStatusBarOnOpen={true}
            renderDrawerContent={() => (
                <View style={styles.drawerContent}>
                    <View style={styles.userInfo}>
                        <Image
                            source={{ uri: user?.avatar || 'https://cdn-icons-png.flaticon.com/128/16869/16869838.png' }}
                            style={styles.avatar}
                        />
                        <Text style={styles.userName}>{user?.name || 'Guest'}</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={() => {
                            setOpen(false);
                            nav.navigate('profile');
                        }}
                    >
                        <Ionicons name="person" size={24} color="#333" />
                        <Text style={styles.menuText}>{t('profile')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={() => handleLanguageChange(currentLanguage === 'ar' ? 'curdi' : 'ar')}
                    >
                        <Ionicons name="language" size={24} color="#333" />
                        <Text style={styles.menuText}>
                            {currentLanguage === 'ar' ? 'Kurdî' : 'العربية'}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={() => {
                            setOpen(false);
                            logout();
                        }}
                    >
                        <Ionicons name="log-out" size={24} color="#53045F" />
                        <Text style={[styles.menuText, { color: '#53045F' }]}>{t('logout')}</Text>
                    </TouchableOpacity>
                </View>
            )}
        >
            <Home openSideBar={toggleSidebar} />

        </Drawer>
    );
};

export default DrawerNav;

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
        padding: 20,
    },
    userInfo: {
        alignItems: 'center',
        marginVertical: 30,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 10,
    },
    userName: {
        fontSize: 18,
        color: '#333',
        fontWeight: 'bold',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        borderBottomWidth: 1,
        borderColor: '#ddd',
        padding: 10,
    },
    menuText: {
        marginLeft: 15,
        fontSize: 16,
        color: '#333',
        fontFamily: 'Cairo-Regular',
    },
});
