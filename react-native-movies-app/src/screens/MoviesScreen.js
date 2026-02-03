import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import Dropdown from '../components/Dropdown';
import { getMovies } from '../services/api';
import MediaCard from '../components/MediaCard';
import Loading from '../components/Loading';
import { Colors } from '../constants/Colors';

const MoviesScreen = ({ navigation }) => {
  const [category, setCategory] = useState('popular');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const categories = [
    { label: "Popular", value: "popular" },
    { label: "Now Playing", value: "now_playing" },
    { label: "Top Rated", value: "top_rated" },
    { label: "Upcoming", value: "upcoming" }
  ];

  useEffect(() => {
    fetchMovies();
  }, [category]);

  const fetchMovies = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getMovies(category);
      setMovies(data);
    } catch (err) {
      setError('Failed to fetch movies. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (movie) => {
    // Pass only ID and Type, fetch full details on the next screen as per requirements
    navigation.navigate('Details', { id: movie.id, type: 'movie', title: movie.title });
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
          data={movies}
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

export default MoviesScreen;
