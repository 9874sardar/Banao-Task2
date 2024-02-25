import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, Image, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&per_page=20&page=1&api_key=6f102c62f41998d151e5a1b48713cf13&format=json&nojsoncallback=1&extras=url_s';

const Gallery = ({navigation}) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const storedData = await AsyncStorage.getItem('cachedData');
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setImages(parsedData);
        setLoading(false);
      }
      const response = await axios.get(API_URL);
      const data = response.data.photos.photo;
      setImages(data);
      await AsyncStorage.setItem('cachedData', JSON.stringify(data));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data: ', error);
      Alert.alert('Error', 'Failed to fetch data');
    }
  };

  const renderItem = ({ item }) => (
    <Image
      style={{ width: 120, height: 200, margin: 5 }}
      source={{ uri: item.url_s }}
    />
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 5, backgroundColor: 'lightblue' }}>
        <TouchableOpacity onPress={() => navigation.navigate('home')}>
          <Text style={{ fontWeight: 'bold', fontSize: 16, padding: 6 }}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('gallery')}>
          <Text style={{ fontWeight: 'bold', fontSize: 16, padding: 6 }}>Gallery</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 5 }}>
        <Text style={{ fontSize: 18 ,fontWeight:"800" }}>Image Gallery</Text>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <FlatList
            data={images}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            numColumns={3}
            contentContainerStyle={{ paddingVertical: 10 }}
          />
        )}
        <Button style={{ padding: 10  }} title="Refresh" onPress={fetchData} />
      </View>
    </View>
  );
};

export default Gallery;
