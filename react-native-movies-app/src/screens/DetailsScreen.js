import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { getDetails } from '../services/api';
import Loading from '../components/Loading';
import { Colors } from '../constants/Colors';

const DetailsScreen = ({ route }) => {
  const { id, type } = route.params;
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDetailsData();
  }, [id, type]);

  const fetchDetailsData = async () => {
    try {
      const data = await getDetails(type, id);
      setDetails(data);
    } catch (err) {
      setError('Failed to load details.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;
  if (error) return <View style={styles.center}><Text>{error}</Text></View>;
  if (!details) return null;

  const title = details.title || details.name;
  const imageUrl = details.poster_path 
    ? `https://image.tmdb.org/t/p/w500${details.poster_path}` 
    : 'https://via.placeholder.com/300x450?text=No+Image';
    
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover"/>
      </View>
      <Text style={styles.overview}>{details.overview}</Text>
      <View style={styles.metaContainer}>
        <Text style={styles.metaText}>Popularity: {details.popularity} | Release Date: {details.release_date || details.first_air_date}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  contentContainer: {
      padding: 20,
      alignItems: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    marginBottom: 20,
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.textPrimary,
  },
  imageContainer: {
      marginBottom: 30,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
  },
  image: {
    width: 250, // Roughly like mockup
    height: 250, 
  },
  overview: {
    fontSize: 16,
    color: '#666', // Lighter gray like mockup (it says "Daniel Craig candidly...")
    textAlign: 'left', // Or justify? Mockup text looks aligned left but maybe justified.
    marginBottom: 20,
    lineHeight: 24,
    paddingLeft : 20,
    paddingRight : 20,
  },  
  metaContainer: {
      alignSelf: 'flex-start',
  },
  metaText: {
      fontSize: 14,
      color: '#666',
      fontWeight: 'bold',
      paddingLeft : 20,
      paddingRight : 20,
  }
});

export default DetailsScreen;
