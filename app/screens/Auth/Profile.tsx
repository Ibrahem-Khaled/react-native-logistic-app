import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Alert, Modal, ScrollView } from 'react-native';
import { FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeaderBack } from '../../components/Header';
import { AuthContext } from '../../Context/AuthContext';
import { useTranslation } from 'react-i18next';
import { baseURL } from '../../../env';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';

const Profile = () => {
    const { t } = useTranslation();
    const { user, updateUser, token, logout } = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(user.name || '');
    const [email, setEmail] = useState(user.email || '');
    const [phone, setPhone] = useState(user.phone || '');
    const [address, setAddress] = useState(user.address || '');
    const [country, setCountry] = useState(user.country || '');
    const [city, setCity] = useState(user.city || '');
    const [workType, setWorkType] = useState(user.type_of_work || '');
    const [modalVisible, setModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false); // Delete modal visibility
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSave = () => {
        updateUser(name, email, phone, address, country, city, workType, token);
    };

    const handleChangePassword = async () => {
        if (newPassword !== confirmPassword) {
            Alert.alert(t('error_mismatch'));
            return;
        }

        try {
            await axios.post(
                `${baseURL}/api/change-password`,
                {
                    old_password: currentPassword,
                    new_password: newPassword,
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setModalVisible(false);
            Alert.alert(t('success_change'));
        } catch (error) {
            Alert.alert(t('error_change'));
        }
    };

    const handleDeleteAccount = async () => {
        try {
            await axios.post(`${baseURL}/api/deleteAccount`, {}, { headers: { Authorization: `Bearer ${token}` } });
            setDeleteModalVisible(false);
            logout();
            Alert.alert(t('account_deleted'));
        } catch (error) {
            Alert.alert(t('error_deleting_account'));
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <HeaderBack name={t('profile')} />
                <View style={styles.profileHeader}>
                    <Image
                        source={user.avatar ? { uri: user.avatar } : { uri: 'https://cdn-icons-png.flaticon.com/128/16869/16869838.png' }}
                        style={styles.avatar}
                    />
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.role}>{user.role}</Text>
                </View>
                <View style={styles.infoSection}>
                    {isEditing ? (
                        <>
                            <View style={styles.infoRow}>
                                <Ionicons name="person-outline" size={24} color="#333" />
                                <TextInput
                                    style={styles.input}
                                    placeholder={t('name')}
                                    value={name}
                                    onChangeText={setName}
                                />
                            </View>
                            <View style={styles.infoRow}>
                                <Ionicons name="mail-outline" size={24} color="#333" />
                                <TextInput
                                    style={styles.input}
                                    placeholder={t('email')}
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                />
                            </View>
                            <View style={styles.infoRow}>
                                <FontAwesome name="phone" size={24} color="#333" />
                                <TextInput
                                    style={styles.input}
                                    placeholder={t('phone')}
                                    value={phone}
                                    onChangeText={setPhone}
                                    keyboardType="phone-pad"
                                />
                            </View>
                            <View style={styles.infoRow}>
                                <MaterialIcons name="location-pin" size={24} color="#333" />
                                <TextInput
                                    style={styles.input}
                                    placeholder={t('address')}
                                    value={address}
                                    onChangeText={setAddress}
                                />
                            </View>
                            <View style={styles.infoRow}>
                                <MaterialIcons name="location-city" size={24} color="#333" />
                                <TextInput
                                    style={styles.input}
                                    placeholder={t('country')}
                                    value={country}
                                    onChangeText={setCountry}
                                />
                            </View>
                            <View style={styles.infoRow}>
                                <MaterialIcons name="location-city" size={24} color="#333" />
                                <TextInput
                                    style={styles.input}
                                    placeholder={t('city')}
                                    value={city}
                                    onChangeText={setCity}
                                />
                            </View>
                            <View style={styles.infoRow}>
                                <MaterialIcons name="business-center" size={24} color="#333" />
                                <Picker
                                    selectedValue={workType}
                                    style={styles.picker}
                                    onValueChange={(itemValue) => setWorkType(itemValue)}
                                >
                                    <Picker.Item label={'تاجر'} value="تاجر" />
                                    <Picker.Item label={'شركة'} value="شركة" />
                                    <Picker.Item label={'صاحب محل'} value="صاحب محل" />
                                    <Picker.Item label={"صاحب المتجر"} value="صاحب المتجر" />
                                </Picker>
                            </View>
                            <View style={styles.buttonRow}>
                                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                                    <Text style={styles.buttonText}>{t('save')}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.saveButton, { backgroundColor: '#f44336' }]} onPress={() => setIsEditing(false)}>
                                    <Text style={styles.buttonText}>{t('cancel')}</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    ) : (
                        <>
                            <View style={styles.infoRow}>
                                <Ionicons name="mail-outline" size={24} color="#333" />
                                <Text style={styles.infoText}>{email}</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <FontAwesome name="phone" size={24} color="#333" />
                                <Text style={styles.infoText}>{phone}</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <MaterialIcons name="location-pin" size={24} color="#333" />
                                <Text style={styles.infoText}>{address || t('noAddressProvided')}</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <MaterialIcons name="location-city" size={24} color="#333" />
                                <Text style={styles.infoText}>{country || t('noCountryProvided')}</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <MaterialIcons name="location-city" size={24} color="#333" />
                                <Text style={styles.infoText}>{city || t('noCityProvided')}</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <MaterialIcons name="business-center" size={24} color="#333" />
                                <Text style={styles.infoText}>{t(workType)}</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <MaterialIcons name="verified-user" size={24} color="#333" />
                                <Text style={styles.infoText}>{user.email_verified_at ? t('verified') : t('notVerified')}</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Ionicons name="calendar-outline" size={24} color="#333" />
                                <Text style={styles.infoText}>{t('joined')}: {new Date(user.created_at).toLocaleDateString()}</Text>
                            </View>
                            <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(true)}>
                                <Text style={styles.editButtonText}>{t('editProfile')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.editButton} onPress={() => setModalVisible(true)}>
                                <Ionicons name="key" size={24} color="#fff" />
                                <Text style={styles.editButtonText}>{t('change_password')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.editButton, { backgroundColor: '#f44336' }]}
                                onPress={() => setDeleteModalVisible(true)}
                            >
                                <Ionicons name="trash-outline" size={24} color="#fff" />
                                <Text style={styles.editButtonText}>{t('delete_account')}</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>

                {/* Change Password Modal */}
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>{t('change_password_title')}</Text>
                            <TextInput
                                style={styles.input}
                                placeholder={t('current_password')}
                                placeholderTextColor={'#ccc'}
                                secureTextEntry
                                value={currentPassword}
                                onChangeText={setCurrentPassword}
                            />
                            <TextInput
                                style={styles.input}
                                placeholderTextColor={'#ccc'}
                                placeholder={t('new_password')}
                                secureTextEntry
                                value={newPassword}
                                onChangeText={setNewPassword}
                            />
                            <TextInput
                                style={styles.input}
                                placeholderTextColor={'#ccc'}
                                placeholder={t('confirm_password')}
                                secureTextEntry
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                            />
                            <View style={styles.buttonRow}>
                                <TouchableOpacity style={styles.saveButton} onPress={handleChangePassword}>
                                    <Text style={styles.saveButtonText}>{t('save')}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.saveButton, { backgroundColor: '#ddd' }]}
                                    onPress={() => setModalVisible(false)}
                                >
                                    <Text style={[styles.saveButtonText, { color: '#333' }]}>{t('cancel')}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

                {/* Delete Account Confirmation Modal */}
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={deleteModalVisible}
                    onRequestClose={() => setDeleteModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>{t('confirm_delete_account')}</Text>
                            <Text style={styles.modalDescription}>{t('delete_account_warning')}</Text>
                            <View style={styles.buttonRow}>
                                <TouchableOpacity style={styles.saveButton} onPress={handleDeleteAccount}>
                                    <Text style={styles.saveButtonText}>{t('confirm')}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.saveButton, { backgroundColor: '#ddd' }]}
                                    onPress={() => setDeleteModalVisible(false)}
                                >
                                    <Text style={[styles.saveButtonText, { color: '#333' }]}>{t('cancel')}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    profileHeader: {
        alignItems: 'center',
        marginBottom: 30,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
        backgroundColor: '#ddd',
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        fontFamily: 'Cairo-Bold',
    },
    role: {
        fontSize: 18,
        color: '#666',
        fontFamily: 'Cairo-Regular',
    },
    infoSection: {
        marginTop: 20,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        width: '90%',
        alignSelf: 'center',
    },
    infoText: {
        marginLeft: 10,
        fontSize: 16,
        color: '#333',
        fontFamily: 'Cairo-Regular',
    },
    input: {
        backgroundColor: '#fff',
        width: '95%',
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
        margin: 2,
        fontFamily: 'Cairo-Regular',
        borderWidth: 1,
        borderColor: '#ccc',
        textAlign: 'right',
    },
    picker: {
        height: 50,
        width: '95%',
        color: '#333',
        fontFamily: 'Cairo-Regular',
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        fontSize: 16,
        margin: 10,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        alignSelf: 'center',
    },
    saveButton: {
        backgroundColor: '#53045F',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        margin: 10,
        width: '45%',
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Cairo-SemiBold',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Cairo-SemiBold',
    },
    editButton: {
        backgroundColor: '#53045F',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '90%',
        alignSelf: 'center',
    },
    editButtonText: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'Cairo-SemiBold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        marginBottom: 15,
        textAlign: 'center',
        fontFamily: 'Cairo-SemiBold',
    },
    modalDescription: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 20,
        fontFamily: 'Cairo-Regular',
    },
});
