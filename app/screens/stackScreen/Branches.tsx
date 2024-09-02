import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { HeaderBack } from '../../components/Header';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

const Branches = () => {
    const { t } = useTranslation();
    const branches = [
        {
            id: '1',
            country: 'IRAQ',
            name: 'Baghdad : Mansour Al-Dawoodi',
            address: 'Mansour Al-Dawoodi, Baghdad',
            phones: ['07733222232', '07811222232'],
            image: require('../../images/fix-images/baghdad.jpg'),
        },
        {
            id: '2',
            country: 'IRAQ',
            name: 'Basra : ALJAZIER next to Sanshal Mall',
            address: 'ALJAZIER next to Sanshal Mall, Basra',
            phones: ['07870707789'],
            image: require('../../images/fix-images/basra.jpg'),
        },
        {
            id: '3',
            country: 'UAE',
            name: 'Dubai : The Prism Tower, Office - 707, Business Bay',
            address: 'The Prism Tower, Office - 707, Business Bay, Dubai',
            phones: ['+971502141937', '+971502726368'],
            image: require('../../images/fix-images/emarats.jpg'),
        },
        {
            id: '4',
            country: 'CHINA',
            name: '仓库地 lNo.97 Lishui Avenue, Nanhai District',
            address: 'No.97 Lishui Avenue, Nanhai District, 广东省佛山市南海区里水大道中 号',
            phones: [],
            image: require('../../images/fix-images/china.jpg'),
        },
        {
            id: '5',
            country: 'LONDON',
            name: '54-2 Tweedmouth Rd, Floor 1, Tx201',
            address: '54-2 Tweedmouth Rd, Floor 1, Tx201, London',
            phones: ['+447383015353'],
            image: require('../../images/fix-images/london.jpg'),
        },
    ];

    const renderBranchItem = ({ item }) => (
        <TouchableOpacity style={styles.branchContainer}>
            <Image source={item.image} style={styles.branchImage} />
            <View style={styles.branchDetails}>
                <Text style={styles.branchCountry}>{item.country}</Text>
                <Text style={styles.branchName}>{item.name}</Text>
                <Text style={styles.branchAddress}>{item.address}</Text>
                {item.phones.map((phone, index) => (
                    <View key={index} style={styles.branchContact}>
                        <Ionicons name="call-outline" size={16} color="#333" />
                        <Text style={styles.branchPhone}>{phone}</Text>
                    </View>
                ))}
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <HeaderBack name={t('branches')} />
            <FlatList
                data={branches}
                renderItem={renderBranchItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.branchList}
            />
        </SafeAreaView>
    );
};

export default Branches;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
    },
    branchList: {
        padding: 20,
    },
    branchContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
        alignItems: 'center',
    },
    branchImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
    },
    branchDetails: {
        marginLeft: 15,
        justifyContent: 'center',
        flex: 1,
    },
    branchCountry: {
        fontSize: 14,
        fontFamily: 'Cairo-Bold',
        color: '#777',
        marginBottom: 5,
    },
    branchName: {
        fontSize: 18,
        fontFamily: 'Cairo-Bold',
        color: '#333',
        marginBottom: 5,
    },
    branchAddress: {
        fontSize: 14,
        fontFamily: 'Cairo-Regular',
        color: '#666',
        marginBottom: 5,
    },
    branchContact: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 3,
    },
    branchPhone: {
        fontSize: 14,
        fontFamily: 'Cairo-Regular',
        color: '#333',
        marginLeft: 5,
    },
});
