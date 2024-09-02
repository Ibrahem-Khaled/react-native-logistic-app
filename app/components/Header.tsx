import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

export function Header({ openSideBar }) {
    const nav = useNavigation();
    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={() => openSideBar()}>
                <FontAwesome name="bars" size={24} color="#fff" />
            </TouchableOpacity>
            <Image source={require('../images/logo.png')} style={{ width: 50, height: 50 }} resizeMode='contain' />
            <FontAwesome onPress={() => nav.navigate('NotificationScreen')} name="bell" size={24} color="#fff" />
        </View>
    )
}

export function HeaderBack({ name }) {
    const nav = useNavigation();
    return (
        <View style={[styles.header, { borderBottomLeftRadius: 0, borderBottomRightRadius: 0, borderRadius: 10 }]}>
            <AntDesign onPress={() => nav.goBack()} name="arrowleft" size={24} color="#fff" />
            {name && <Text style={{ color: '#fff', fontSize: 20, fontFamily: 'Cairo-Bold' }}>{name}</Text>}
            <View style={{ width: 24 }} />
        </View>
    )
}


const styles = StyleSheet.create({
    header: {
        height: 70,
        backgroundColor: '#53045F',
        marginBottom: 10,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
})