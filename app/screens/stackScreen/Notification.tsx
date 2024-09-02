import React, { useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeaderBack } from '../../components/Header';
import axios from 'axios';
import { baseURL } from '../../../env';
import Loading from '../../components/Loading';
import { useTranslation } from 'react-i18next';

const Notification = () => {
    const [data, setData] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const { t } = useTranslation();

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${baseURL}/api/notificatins`);
            setData(response.data);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    const renderNotificationItem = ({ item }) => (
        <View style={styles.notificationCard}>
            {item.image && <View style={styles.iconContainer}>
                <Image source={{ uri: item.image }} style={{ width: 50, height: 50 }} />
            </View>}
            <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.body}</Text>
                <Text style={styles.timestamp}>{item.timestamp}</Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <HeaderBack name={t('notification')} />
            {data.length > 0 ? <FlatList
                data={data}
                renderItem={renderNotificationItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
            />
                :
                <Text style={styles.header}>لا يوجد اشعارات</Text>
            }
        </SafeAreaView> 
    );
};

export default Notification;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },

    listContent: {
        paddingBottom: 20,
    },
    notificationCard: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        elevation: 2,
        width: '94%',
        alignSelf: 'center',
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
    },
    textContainer: {
        flex: 1,
        paddingLeft: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
        fontFamily: 'Cairo-SemiBold',
    },
    description: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
        fontFamily: 'Cairo-Regular',
    },
    timestamp: {
        fontSize: 12,
        color: '#999',
        fontFamily: 'Cairo-Regular',
    },
});
