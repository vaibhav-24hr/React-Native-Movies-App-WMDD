// Reusable MediaCard component for displaying movie/TV show items
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const MediaCard = ({ item, onPress, mediaType }) => {
  // Handle different property names for movies vs TV shows
  const title = item.title || item.name || 'Unknown Title';
  const releaseDate = item.release_date || item.first_air_date || '';
  const posterPath = item.poster_path;
  const popularity = item.popularity ? item.popularity.toFixed(3) : 'N/A';

  return (
    <View style={styles.card}>
      <Image
        source={
          posterPath
            ? { uri: `${IMAGE_BASE_URL}${posterPath}` }
            : require('../../assets/icon.png')
        }
        style={styles.poster}
        resizeMode="cover"
      />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <Text style={styles.detail}>Popularity: {popularity}</Text>
        <Text style={styles.detail}>Release Date: {releaseDate}</Text>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>More Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginVertical: 8,
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  poster: {
    width: 100,
    height: 150,
    borderRadius: 6,
    backgroundColor: '#e0e0e0',
  },
  info: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  detail: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
  },
  button: {
    backgroundColor: '#2cbdcf',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    marginTop: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default MediaCard;
