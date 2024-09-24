import React, { useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image, Animated } from 'react-native';
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
    const opacityAnim = React.useRef(new Animated.Value(0)).current; // للرسوم المتحركة

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${baseURL}/api/notificatins`);
            setData(response.data);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        Animated.timing(opacityAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
        }).start();
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    const renderNotificationItem = ({ item }) => (
        <Animated.View
            style={[
                styles.notificationCard,
                item.is_read === 0 && styles.unreadNotificationCard, // إذا كان غير مقروء، طبق نمط مميز
                { opacity: opacityAnim }
            ]}
        >
            {item.image && (
                <View style={styles.iconContainer}>
                    <Image source={{ uri: item.image }} style={styles.imageStyle} />
                </View>
            )}
            <View style={styles.textContainer}>
                <Text style={[styles.title, item.is_read === 0 && styles.unreadTitle]}>{item.title}</Text>
                <Text style={[styles.description, item.is_read === 0 && styles.unreadDescription]}>{item.body}</Text>
                <Text style={styles.timestamp}>{item.created_at}</Text>
            </View>
        </Animated.View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <HeaderBack name={t('notification')} />
            {data.length > 0 ? (
                <FlatList
                    data={data}
                    renderItem={renderNotificationItem}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.listContent}
                />
            ) : (
                <Text style={styles.noNotificationsText}>لا يوجد اشعارات</Text>
            )}
        </SafeAreaView>
    );
};

export default Notification;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f2f5',
    },
    listContent: {
        paddingBottom: 20,
    },
    notificationCard: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 20,
        marginBottom: 15,
        elevation: 3,
        width: '94%',
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        opacity: 0.9,
    },
    unreadNotificationCard: {
        backgroundColor: '#e6f7ff', // لون خلفية مميز للإشعارات غير المقروءة
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#e0e0e0',
        marginRight: 15,
    },
    imageStyle: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    textContainer: {
        flex: 1,
        paddingLeft: 5,
    },
    title: {
        fontSize: 18,
        color: '#333',
        marginBottom: 5,
        fontFamily: 'Cairo-Bold',
    },
    unreadTitle: {
        color: '#007bff', // لون نص مميز للإشعارات غير المقروءة
    },
    description: {
        fontSize: 15,
        color: '#666',
        marginBottom: 5,
        fontFamily: 'Cairo-Regular',
    },
    unreadDescription: {
        fontWeight: 'bold', // تغيير شكل الوصف ليكون مميز للإشعارات غير المقروءة
    },
    timestamp: {
        fontSize: 12,
        color: '#999',
        fontFamily: 'Cairo-Regular',
        marginTop: 8,
    },
    noNotificationsText: {
        textAlign: 'center',
        marginTop: '50%',
        fontFamily: 'Cairo-SemiBold',
        fontSize: 18,
        color: '#999',
    },
});
