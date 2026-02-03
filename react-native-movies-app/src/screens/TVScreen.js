import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import Dropdown from '../components/Dropdown';
import { getTVShows } from '../services/api';
import MediaCard from '../components/MediaCard';
import Loading from '../components/Loading';
import { Colors } from '../constants/Colors';

const TVScreen = ({ navigation }) => {
  const [category, setCategory] = useState('popular');
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const categories = [
    { label: "Popular", value: "popular" },
    { label: "Airing Today", value: "airing_today" },
    { label: "On The Air", value: "on_the_air" },
    { label: "Top Rated", value: "top_rated" }
  ];

  useEffect(() => {
    fetchTV();
  }, [category]);

  const fetchTV = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTVShows(category);
      setShows(data);
    } catch (err) {
      setError('Failed to fetch TV shows.');
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (show) => {
    navigation.navigate('Details', { id: show.id, type: 'tv', title: show.name });
  };

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <Dropdown 
          items={categories}
          selectedValue={category}
          onValueChange={setCategory}
        />
      </View>

      {loading ? (
        <Loading />
      ) : error ? (
        <View style={styles.center}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <FlatList
          data={shows}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <MediaCard item={item} onViewDetails={() => handleViewDetails(item)} />
          )}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  pickerContainer: {
    margin: 16,
    zIndex: 10,
    width: '50%',
    alignSelf:'center'
  },
  listContent: {
    paddingBottom: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: Colors.error,
    fontSize: 16,
  },
});

export default TVScreen;
