import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';
import axios from 'axios';
import { baseURL } from '../../env';
import Carousel from 'react-native-reanimated-carousel';
import Loading from './Loading';

const { width } = Dimensions.get('window');

const SlideShow = () => {
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchImages = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${baseURL}/api/slides`);
            setImages(response.data);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching images:', error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);

    if (images.length === 0) {
        return null;
    }

    return (
        <View style={styles.container}>
            {isLoading ? (
                <Loading />
            ) : (
                <Carousel
                    width={width}
                    height={275}
                    data={images}
                    autoPlay
                    autoPlayInterval={5000} // Auto-scroll every 5 seconds
                    renderItem={({ item }) => (
                        <View style={styles.slide}>
                            <Image source={{ uri: `${baseURL}/public/storage/${item.image}` }} style={styles.image} resizeMode="cover" />
                        </View>
                    )}
                    pagingEnabled
                    mode="parallax"
                    modeConfig={{
                        parallaxScrollingScale: 0.9,
                        parallaxScrollingOffset: 50,
                    }}
                />
            )}
        </View>
    );
};

export default SlideShow;

const styles = StyleSheet.create({
    container: {
        width: width,
        height: 275,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
        padding: 10,
    },
    slide: {
        width: width ,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
});
