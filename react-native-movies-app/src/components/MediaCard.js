import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/Colors';

const MediaCard = ({ item, onViewDetails }) => {
  const { title, name, poster_path, popularity, release_date, first_air_date } = item;
  
  const displayTitle = title || name;
  const displayDate = release_date || first_air_date;
  const imageUrl = poster_path 
    ? `https://image.tmdb.org/t/p/w500${poster_path}` 
    : 'https://via.placeholder.com/100x150?text=No+Image';

  return (
    <View style={styles.card}>
      <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
      <View style={styles.info}>
        <View style={styles.textContainer}>
            <Text style={styles.title}>{displayTitle}</Text>
            <Text style={styles.subtitle}>Popularity: {popularity}</Text>
            <Text style={styles.subtitle}>Release Date: {displayDate}</Text>
        </View>
        
        <TouchableOpacity style={styles.button} onPress={onViewDetails}>
          <Text style={styles.buttonText}>More Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    marginBottom: 20, // More spacing
    backgroundColor: '#fff',
    // Mockup has no visible card shadow/border, just a list? Or maybe faint.
    // Let's keep it clean.
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 20,
    marginHorizontal: 16,
    marginTop: 10,
    alignItems: 'flex-start', // Top align
  },
  image: {
    width: 100, // Fixed width
    height: 100, // Square as per some list views? Or portrait? 
              // Mockup 'Search - James Bond.png' shows square-ish images.
              // Let's go with square 100x100 for 'Search Results' look, 
              // BUT 'TV - Shows Popular.png' might show portrait.
              // Let's look at the image 'Search - James Bond.png' again. 
              // 'Being James Bond' image looks square.
              // 'James Bond: For Real' looks square.
              // 'James Bond Jr.' looks square.
              // I will set it to 100x100.
    height: 100,
    width: 100,
    marginRight: 10,
  },
  info: {
    flex: 1,
    justifyContent: 'space-between',
    height: 100, // Match image height to distribute space or let it grow?
                 // Text top, button bottom.
    flexDirection: 'column', 
  },
  textContainer: {
    marginBottom: 5,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 2,
    color: '#000',
  },
  subtitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 1,
  },
  button: {
    backgroundColor: Colors.accent, // Cyan
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    width: '100%', // Full width of info column
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default MediaCard;
